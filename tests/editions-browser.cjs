const fs=require('node:fs'),assert=require('node:assert/strict');
const {chromium}=require(process.env.FL_PLAYWRIGHT || 'playwright');
const path=require('node:path');
const siblings=path.resolve(__dirname,'../..');
const source=name=>fs.readFileSync(path.join(name==='Vault' && process.env.FL_VAULT_REPO ? process.env.FL_VAULT_REPO : path.join(siblings,'fl-tools-'+name.toLowerCase()),'FL_Tools_'+name+'.user.js'),'utf8');
(async()=>{const browser=await chromium.launch({headless:true});try{
 for(const timing of ['absent','before','after']) for(const order of [['Basic','Pro','Studio','Vault'],['Vault','Studio','Pro','Basic'],['Studio','Vault','Basic','Pro']]){
  const page=await browser.newPage({viewport:{width:1100,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',route=>route.request().isNavigationRequest()?route.fulfill({contentType:'text/html',body:'<body style="background:#242329"><main><h1>Example Profile</h1></main></body>'}):route.abort());
  await page.goto('https://fetlife.com/vault-preview');
  const coreSource=()=>fs.readFileSync(path.join(process.env.FL_CORE_REPO || path.join(siblings,'fl-tools-core'),'dist/fl-core.js'),'utf8');
  if(timing==='before')await page.addScriptTag({content:coreSource()});
  for(const edition of order)await page.addScriptTag({content:source(edition)});
  if(timing==='after')await page.addScriptTag({content:coreSource()});
  assert(await page.evaluate(()=>FLVault.coreRecordProvider===null),'Core must not change the localhost record format');
  await page.waitForFunction(()=>document.documentElement.getAttribute('data-fl-tools-grid-owner')==='basic' && [...document.querySelectorAll('#fl-settings-launcher,#fl-studio-launcher,#fl-vault-launcher')].filter(n=>n.getClientRects().length).length===3);
  for(const width of [1100,390]){
   await page.setViewportSize({width,height:844});
   const pairs=[['#fl-settings-launcher','#fl-tools-dock'],['#fl-studio-launcher','#fl-studio-panel'],['#fl-vault-launcher','#fl-vault-panel']];
   for(const [button,menu] of pairs){
    await page.locator(button).click();assert(await page.locator(menu).isVisible());
    for(const [,other] of pairs)if(other!==menu)assert(!(await page.locator(other).isVisible()),other+' must yield to '+menu);
    const clear=await page.evaluate(menu=>{
     const a=document.querySelector(menu).getBoundingClientRect();
     return [...document.querySelectorAll('#fl-settings-launcher,#fl-studio-launcher,#fl-vault-launcher')].filter(n=>n.getClientRects().length).every(n=>{const b=n.getBoundingClientRect();return a.right+11.9<=b.left||a.left>=b.right+11.9||a.bottom+11.9<=b.top||a.top>=b.bottom+11.9;});
    },menu);assert(clear,menu+' must avoid badges');
    await page.locator(button).click();assert(!(await page.locator(menu).isVisible()),'second launcher click closes '+menu);
    await page.locator(button).click();await page.keyboard.press('Escape');assert(!(await page.locator(menu).isVisible()));
   }
   await page.locator('#fl-vault-launcher').click();
   await page.locator('#fl-vault-panel').waitFor({state:'visible'});
   await page.getByRole('button',{name:'Archived Profiles ›',exact:true}).click();
   const safe=await page.evaluate(()=>{
    const badges=[...document.querySelectorAll('#fl-settings-launcher,#fl-studio-launcher,#fl-vault-launcher')].filter(n=>n.getClientRects().length).map(n=>n.getBoundingClientRect());
    return ['#fl-vault-panel','#flv-secondary'].every(id=>{const a=document.querySelector(id).getBoundingClientRect();return badges.every(b=>a.right+11.9<=b.left||a.left>=b.right+11.9||a.bottom+11.9<=b.top||a.top>=b.bottom+11.9);});
   });
   if(!safe){
    const debug=await page.evaluate(()=>['#fl-settings-launcher','#fl-studio-launcher','#fl-vault-launcher','#fl-vault-panel','#flv-secondary'].map(id=>({id,boxes:[...document.querySelectorAll(id)].map(n=>({box:n.getBoundingClientRect().toJSON(),style:n.getAttribute('style')}))})));
    console.log(JSON.stringify(debug));
   }
   assert(safe,'Badge overlap: '+order+' at '+width);
   await page.keyboard.press('Escape');await page.keyboard.press('Escape');
  }
  for(const [palette,accent] of [['forest','blue'],['mist','violet'],['original','red']]){
   await page.evaluate(({palette,accent})=>{
    document.querySelector('[data-theme-choice="'+palette+'"]').click();
    document.querySelector('[data-accent-choice="'+accent+'"]').click();
   },{palette,accent});
   const colors=await page.evaluate(()=>{
    const main=getComputedStyle(document.querySelector('#fl-vault-panel'));
    const studio=getComputedStyle(document.querySelector('#fl-studio-panel'));
    const archive=getComputedStyle(document.querySelector('.flv-update'));
    const secondary=getComputedStyle(document.querySelector('#flv-secondary'));
    return {main:main.backgroundColor,studio:studio.backgroundColor,secondary:secondary.backgroundColor,archive:archive.backgroundColor,accent:getComputedStyle(document.documentElement).getPropertyValue('--fl-tools-theme-accent').trim()};
   });
   if(palette!=='original'){assert.equal(colors.main,colors.studio);assert.equal(colors.secondary,colors.main);assert.equal(colors.archive,colors.accent.replaceAll(',',', '));}
   else assert.equal(colors.main,'rgb(25, 32, 28)','Vault restores its own green');
  }
  assert.deepEqual(errors,[]);await page.close();
 }
 console.log('PASS: Complete edition scripts in three load orders; desktop/mobile clearance, launcher toggles, exclusive menus, Escape, two live Pro themes/accents, default-green restoration, and no uncaught errors.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
