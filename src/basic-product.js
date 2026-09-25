import { BasicUI } from './basic-ui.js';
import { CardNavigator } from './card-navigation.js';
import { feedFocusRequest } from './feed-focus.js';
import { cardRequests, evaluateCandidate } from './filter-engine.js';
import {
  InfiniteScrollController,
  InfiniteScrollTrigger,
  INFINITE_SCROLL_OBSERVER_OPTIONS,
} from './infinite-scroll.js';
import { applyMediaPolicy } from './media.js';
import { BasicNavigation } from './navigation.js';
import { BasicPageTools } from './page-tools.js';
import { PageEnhancements } from './page-enhancements.js';
import { BrowserPageLoader, nativeNextPage } from './page-loader.js';
import { BasicProfileState } from './profile-state.js';
import { BasicSeenItems, SEEN_ITEMS_SETTINGS_KEY } from './seen-items.js';
import {
  applyPreset,
  deleteCustomPreset,
  normalizeBasicSettings,
  renameCustomPreset,
  saveCustomPreset,
} from './settings.js';

export const BASIC_MANIFEST = Object.freeze({
  channel: 'stable',
  coreCompatibility: '>=0.0.1 <0.1.0',
  features: Object.freeze([
    'basic.filters',
    'basic.presets',
    'basic.media',
    'basic.seen',
    'basic.soft-block',
    'basic.page-enhancements',
    'basic.navigation',
    'basic.card-navigation',
    'basic.feed-focus',
    'basic.page-tools',
    'basic.seen-items',
    'basic.infinite-scroll',
    'basic.infinite-scroll-session-controls',
    'basic.filter-impact',
    'basic.settings',
  ]),
  id: 'basic',
  name: 'FL Tools Basic',
  permissions: Object.freeze([
    'actions',
    'diagnostics',
    'crossTab',
    'editionOwnership',
    'events',
    'routes',
    'scanner',
    'storage',
    'ui',
  ]),
  type: 'edition',
  version: '0.0.6',
});

const COMPONENTS = BASIC_MANIFEST.features.map((id) => ({
  id,
  owner: 'basic',
  permissions: BASIC_MANIFEST.permissions,
}));

const MAX_REMEMBERED_VISITS = 512;
const PRUNE_CANDIDATE_INTERVAL = 100;

function visibleFilterText(element) {
  if (typeof element.cloneNode !== 'function') {
    const text = String(element.textContent ?? '')
      .replace(/\s+/g, ' ')
      .trim();
    return text ? [text] : null;
  }
  const clone = element.cloneNode(true);
  for (const heading of clone.querySelectorAll('h1, h2, h3, h4, [role="heading"]')) {
    if (!/^hard limits?$/i.test(String(heading.textContent ?? '').trim())) continue;
    (heading.closest('section, article, [data-section]') ?? heading.parentElement)?.remove();
  }
  const text = String(clone.textContent ?? '')
    .replace(/\s+/g, ' ')
    .trim();
  return text ? [text] : null;
}

export function profileFilterFacts(element, parsedFacts = {}, displayName = null) {
  const split = (value) =>
    value
      ? value
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      : null;
  const fixtureAge = Number(element.dataset.fltAge);
  const age = Number.isFinite(fixtureAge) && fixtureAge >= 18 ? fixtureAge : parsedFacts.age;
  const relationships =
    split(element.dataset.fltRelationships) ??
    (element.dataset.fltRelationship
      ? [element.dataset.fltRelationship]
      : (parsedFacts.relationships ??
        (parsedFacts.relationship ? [parsedFacts.relationship] : null)));
  return {
    age: Number.isFinite(age) && age >= 18 ? age : null,
    card: split(element.dataset.fltCard) ?? visibleFilterText(element),
    gender: element.dataset.fltGender || parsedFacts.gender || null,
    limit: split(element.dataset.fltLimit),
    location: element.dataset.fltLocation || parsedFacts.location || null,
    nickname: split(element.dataset.fltNickname) ?? (displayName ? [displayName] : null),
    pictures: Number.isFinite(Number(element.dataset.fltPictures))
      ? Number(element.dataset.fltPictures)
      : (parsedFacts.pictures ?? null),
    relationship: relationships?.[0] ?? null,
    relationships,
    roles: split(element.dataset.fltRoles) ?? parsedFacts.roles ?? null,
    tags:
      split(element.dataset.fltTags) ??
      [parsedFacts.gender, ...(parsedFacts.roles ?? []), parsedFacts.location].filter(Boolean),
    videos: Number.isFinite(Number(element.dataset.fltVideos))
      ? Number(element.dataset.fltVideos)
      : (parsedFacts.videos ?? null),
    writings: Number.isFinite(Number(element.dataset.fltWritings))
      ? Number(element.dataset.fltWritings)
      : (parsedFacts.writings ?? null),
  };
}

export function isCurrentItemRoute(candidate) {
  const route = candidate?.context?.route;
  if (route?.kind === 'content') return candidate.kind === 'content';
  if (route?.kind === 'event') {
    return (
      candidate.kind === 'event' &&
      route.params?.view !== 'list' &&
      Boolean(route.params?.eventId || route.params?.pathIds || route.params?.view === 'detail')
    );
  }
  if (route?.kind === 'group') {
    return (
      candidate.kind === 'group' && route.params?.view !== 'list' && Boolean(route.params?.groupId)
    );
  }
  return false;
}

export class BasicProduct {
  #abort;
  #actionUnregisters = [];
  #active = false;
  #capabilities;
  #cardNavigator;
  #candidates = new Map();
  #document;
  #enhancements;
  #enhancementRevision = 0;
  #editionId;
  #editionExtension;
  #editionName;
  #infiniteScroll;
  #infiniteTrigger;
  #filterReveal = false;
  #launcher;
  #navigation;
  #nativeBlock;
  #profileState;
  #privateSession = false;
  #pictureNavigate;
  #pageTools;
  #processedCandidates = 0;
  #ownership;
  #presentedCards = new Set();
  #presentedMedia = new Set();
  #results = new Map();
  #settings;
  #seenVisits = new Set();
  #seenItems;
  #sessionMutedPeople = new Set();
  #style;
  #ui;
  #window;
  #onPreviewEscape = (event) => {
    if (event.key === 'Escape') this.#setNativePreview(false);
  };
  #onWindowBlur = () => this.#setNativePreview(false);

  constructor({
    registration,
    document,
    window,
    iconUrl,
    fetchPage,
    appendPage,
    editionId = registration?.productId ?? 'basic',
    editionExtension,
    editionName = editionId === 'pro' ? 'FL Tools Pro' : BASIC_MANIFEST.name,
    changelog,
    nativeBlock,
    pictureNavigate,
    releaseUrl,
    installUrl,
    updateUrl,
    version = BASIC_MANIFEST.version,
  }) {
    const capabilities = registration?.capabilities;
    if (!capabilities?.storage || !capabilities?.ui || !document || !window || !iconUrl) {
      throw new TypeError('Basic requires its registered Core capabilities and approved badge');
    }
    this.#capabilities = capabilities;
    this.#document = document;
    this.#editionId = editionId;
    this.#editionExtension = editionExtension;
    this.#editionName = editionName;
    this.changelog = changelog;
    this.releaseUrl = releaseUrl;
    this.installUrl = installUrl;
    this.updateUrl = updateUrl ?? installUrl;
    this.version = version;
    this.#window = window;
    this.iconUrl = iconUrl;
    this.#nativeBlock =
      nativeBlock ??
      (async () => {
        const form = [...this.#document.querySelectorAll('form[action*="blockeds"]')].find(
          (candidate) =>
            String(candidate.querySelector('input[name="_method"]')?.value ?? '').toLowerCase() !==
            'delete',
        );
        if (form) {
          if (typeof form.requestSubmit === 'function') form.requestSubmit();
          else form.submit();
          return;
        }
        const modal = this.#document.querySelector(
          '[data-id="block"] [data-id="modal-main-action-button"], [data-id="block"] button[type="submit"]',
        );
        if (modal) {
          modal.click();
          return;
        }
        const candidates = [...this.#document.querySelectorAll('a[href*="block"], button')];
        const control = candidates.find((element) => {
          const label = String(element.textContent ?? '')
            .replace(/\s+/g, ' ')
            .trim();
          const href = element.getAttribute?.('href') ?? '';
          return (
            /^(block|block user|block on fetlife)$/i.test(label) || /\/block(?:[/?#]|$)/i.test(href)
          );
        });
        if (!control)
          throw new TypeError('FetLife native Block control is unavailable on this page');
        control.click();
      });
    this.#pictureNavigate = pictureNavigate;
    this.#profileState = new BasicProfileState({
      storage: capabilities.storage,
    });
    this.#seenItems = new BasicSeenItems({ storage: capabilities.storage });
    this.#cardNavigator = new CardNavigator({
      announcer: capabilities.ui.announcer,
      document,
      getCandidates: () => this.#candidates.values(),
      onOpen: (candidate) => this.#markItemSeen(candidate),
    });
    this.#pageTools = new BasicPageTools({
      document,
      onNextRequest: () => this.#cardNavigator.move(1, { kinds: ['event', 'group', 'profile'] }),
    });
    this.#enhancements = new PageEnhancements({ document });
    let loader;
    if (!fetchPage && !appendPage && typeof window.fetch === 'function') {
      loader = new BrowserPageLoader({ document, window });
    }
    this.#infiniteScroll = new InfiniteScrollController({
      append:
        appendPage ??
        (loader
          ? (items) => {
              loader.append(items);
              this.#capabilities.scanner?.refresh(this.#document);
            }
          : () => {}),
      fetchPage:
        fetchPage ?? loader?.fetchPage.bind(loader) ?? (() => ({ items: [], nextUrl: null })),
    });
    this.#infiniteScroll.subscribe((state) => this.#ui?.setInfiniteState(state));
    this.#infiniteTrigger = new InfiniteScrollTrigger({
      controller: this.#infiniteScroll,
      document,
      observerFactory:
        typeof window.IntersectionObserver === 'function'
          ? (callback) =>
              new window.IntersectionObserver(callback, INFINITE_SCROLL_OBSERVER_OPTIONS)
          : null,
    });
  }

  async start() {
    if (this.#capabilities.editionOwnership) {
      this.#ownership = this.#capabilities.editionOwnership.claim({
        activate: () => this.#activate(),
        deactivate: () => this.#deactivate(),
      });
      await this.#ownership.ready;
      return this;
    }
    await this.#activate();
    return this;
  }

  async #activate() {
    if (this.#active) return this;
    this.#abort = new globalThis.AbortController();
    this.#settings = normalizeBasicSettings(await this.#capabilities.storage.getBrowseSettings());
    await this.#seenItems.load();
    const visitHistory = await this.#profileState.listRecentlyVisited();
    this.#active = true;
    try {
      const extension =
        (await this.#editionExtension?.activate?.({
          refreshCandidates: () => this.#refreshCandidates(),
        })) ?? [];
      const editionViews = Array.isArray(extension) ? extension : (extension.views ?? []);
      const editionBrowseSections = Array.isArray(extension)
        ? []
        : (extension.browseSections ?? []);
      const editionSettingsSections = Array.isArray(extension)
        ? []
        : (extension.settingsSections ?? []);
      this.#ui = new BasicUI({
        coreUI: this.#capabilities.ui,
        document: this.#document,
        editionId: this.#editionId,
        iconUrl: this.iconUrl,
        editionBrowseSections,
        editionSettingsSections,
        editionViews,
        onDeletePreset: (name) => this.#deletePreset(name),
        onFilterReveal: (active) => this.#setFilterReveal(active),
        onInfiniteControl: {
          pause: (minutes) => this.#infiniteScroll.pause(minutes),
          resume: () => this.#infiniteScroll.resume(),
          retry: () => this.#infiniteScroll.retry({ signal: this.#abort.signal }),
        },
        onMarkUnseen: (personId) => this.#markUnseen(personId),
        onPreviewNative: (active) => this.#setNativePreview(active),
        onResetSeen: () => this.#resetSeen(),
        onResetSettings: () => this.#resetSettings(),
        onRenamePreset: (currentName, nextName) => this.#renamePreset(currentName, nextName),
        onSavePreset: (name) => this.#savePreset(name),
        onSettings: (next) => this.#acceptSettings(next),
        productName: this.#editionName,
        changelog: this.changelog,
        releaseUrl: this.releaseUrl,
        installUrl: this.installUrl,
        updateUrl: this.updateUrl,
        relationshipContext: this.#relationshipContext(),
        settings: this.#settings,
        visitHistory,
        version: this.version,
      });
      this.#ui.setInfiniteState(this.#infiniteScroll.state);
      this.#updateResultStatus();
      this.#launcher = this.#capabilities.ui.launcher.register({
        iconUrl: this.iconUrl,
        name: this.#editionName,
        onActivate: () => this.#ui.shell.toggle({ trigger: this.#launcher.button }),
        productId: this.#editionId,
      });
      this.#registerActions();
      this.#navigation = new BasicNavigation({
        document: this.#document,
        handlers: {
          browse: () => {
            this.#ui.shell.open({ trigger: this.#launcher.button });
            this.#ui.shell.setView('browse', { focus: true });
          },
          clean: () => void this.#selectPreset('minimal'),
          nextCard: () => this.#cardNavigator.move(1),
          next: () =>
            void this.#infiniteScroll.requestNext({ manual: true, signal: this.#abort.signal }),
          openCard: () => void this.#cardNavigator.open(),
          previousCard: () => this.#cardNavigator.move(-1),
          sfw: () => void this.#selectPreset('sfw'),
          standard: () => void this.#selectPreset('default'),
        },
        window: this.#window,
      });
      this.#navigation.start();
      this.#document.addEventListener('keydown', this.#onPreviewEscape);
      this.#window.addEventListener('blur', this.#onWindowBlur);
      this.#capabilities.scanner?.subscribe(
        ['content', 'event', 'feed', 'group', 'profile'],
        (candidate) =>
          void this.#onCandidate(candidate).catch((error) =>
            this.#recordError(
              error,
              'BASIC_CANDIDATE_FAILED',
              'A scanned page item could not be processed.',
            ),
          ),
        { signal: this.#abort.signal },
      );
      this.#capabilities.events?.on(
        'page:settled',
        () => {
          this.#mountStyle();
          this.#pruneDetached();
          this.#applyGlobalSettings();
          this.#syncPageTools();
        },
        { signal: this.#abort.signal },
      );
      this.#capabilities.events?.on(
        'route:changed',
        ({ current }) => {
          this.#infiniteScroll.reset();
          this.#filterReveal = false;
          this.#cardNavigator.clear();
          this.#applyGlobalSettings();
          this.#ui?.setRelationshipContext(Boolean(current?.route?.params?.relationshipList));
          this.#syncPageTools(current?.route);
        },
        { signal: this.#abort.signal },
      );
      this.#capabilities.events?.on(
        'cross-tab:storage-invalidated',
        ({ payload: { storeName, recordKey } }) => {
          if (storeName === 'settings' && recordKey === 'browse') {
            void this.#reloadSettings().catch((error) =>
              this.#recordError(
                error,
                'BASIC_SETTINGS_RELOAD_FAILED',
                'Browse settings could not be reloaded from another tab.',
              ),
            );
          }
          if (storeName === 'settings' && recordKey === SEEN_ITEMS_SETTINGS_KEY) {
            void this.#seenItems
              .load()
              .then(() => this.#refreshCandidates())
              .catch((error) =>
                this.#recordError(
                  error,
                  'BASIC_SEEN_ITEMS_RELOAD_FAILED',
                  'Seen items could not be reloaded from another tab.',
                ),
              );
          }
          if (storeName === 'people') {
            void Promise.all([this.#refreshCandidates(), this.#refreshVisitHistory()]).catch(
              (error) =>
                this.#recordError(
                  error,
                  'BASIC_PEOPLE_REFRESH_FAILED',
                  'Updated people state could not be applied.',
                ),
            );
          }
        },
        { signal: this.#abort.signal },
      );
      this.#capabilities.events?.on(
        'cross-tab:privacy-state',
        ({ payload }) => {
          this.#privateSession = payload?.enabled === true;
        },
        { signal: this.#abort.signal },
      );
      this.#capabilities.events?.on(
        'account:changed',
        ({ accountId }) => {
          this.#privateSession = false;
          this.#seenVisits.clear();
          this.#cardNavigator.clear();
          this.#clearCandidateState();
          this.#requestPrivateSessionState();
          if (accountId) {
            void Promise.all([
              this.#reloadSettings(),
              this.#seenItems.load(),
              this.#refreshVisitHistory(),
            ])
              .catch((error) =>
                this.#recordError(
                  error,
                  'BASIC_ACCOUNT_REFRESH_FAILED',
                  'Browse state could not be refreshed after the account changed.',
                ),
              )
              .finally(() => this.#capabilities.scanner?.refresh(this.#document));
          } else {
            this.#settings = normalizeBasicSettings();
            this.#ui?.setSettings(this.#settings);
            this.#ui?.setVisitHistory([]);
            this.#applyGlobalSettings();
          }
        },
        { signal: this.#abort.signal },
      );
      this.#requestPrivateSessionState();
      this.#mountStyle();
      this.#applyGlobalSettings();
      this.#syncPageTools();
      this.#capabilities.scanner?.refresh(this.#document);
      return this;
    } catch (error) {
      await this.#deactivate();
      throw error;
    }
  }

  async stop() {
    if (this.#ownership) {
      const ownership = this.#ownership;
      this.#ownership = undefined;
      await ownership.release();
    } else {
      await this.#deactivate();
    }
    this.#seenVisits.clear();
  }

  async #deactivate() {
    if (!this.#active) return;
    this.#active = false;
    this.#privateSession = false;
    this.#sessionMutedPeople.clear();
    this.#abort.abort('basic-stop');
    this.#document.removeEventListener('keydown', this.#onPreviewEscape);
    this.#window.removeEventListener('blur', this.#onWindowBlur);
    this.#navigation?.stop();
    this.#cardNavigator.clear();
    this.#pageTools.destroy();
    this.#enhancements.clear();
    this.#infiniteTrigger.stop();
    this.#infiniteScroll.reset();
    this.#filterReveal = false;
    this.#clearCandidateState();
    this.#processedCandidates = 0;
    this.#launcher?.unregister();
    for (const unregister of this.#actionUnregisters.splice(0)) unregister();
    this.#ui?.destroy();
    await this.#editionExtension?.deactivate?.();
    this.#style?.remove();
    this.#launcher = undefined;
    this.#navigation = undefined;
    this.#style = undefined;
    this.#ui = undefined;
    this.#document.documentElement.classList.remove(
      'flt-basic-compact',
      'flt-basic-high-contrast',
      'flt-basic-launcher-left',
      'flt-basic-native-preview',
      'flt-menu-width-compact',
      'flt-menu-width-narrow',
    );
    this.#capabilities.ui.preferences.apply();
  }

  setNextPage(url) {
    this.#infiniteScroll.setNext(url);
  }

  #registerActions() {
    if (!this.#capabilities.actions) return;
    const destinations =
      this.#editionId === 'pro'
        ? [
            ['browse', 'Open Browse'],
            ['rules', 'Open Rules'],
            ['settings', 'Open System'],
          ]
        : [
            ['browse', 'Open Browse'],
            ['settings', 'Open Settings'],
          ];
    for (const [view, label] of destinations) {
      this.#actionUnregisters.push(
        this.#capabilities.actions.register({
          handler: () => {
            this.#ui.shell.open({ trigger: this.#launcher.button });
            this.#ui.shell.setView(view, { focus: true });
          },
          id: `${this.#editionId}.${view}`,
          label,
        }),
      );
    }
  }

  #setNativePreview(active) {
    this.#document.documentElement.classList.toggle('flt-basic-native-preview', active === true);
  }

  async #selectPreset(preset) {
    const accepted = await this.#acceptSettings({ ...this.#settings, preset });
    this.#capabilities.ui.announcer.announce(
      `Browse mode ${preset === 'default' ? 'Standard' : preset === 'minimal' ? 'Clean' : 'SFW'}.`,
    );
    return accepted;
  }

  async #acceptSettings(value) {
    let next = normalizeBasicSettings(value);
    if (next.preset !== this.#settings.preset) {
      next = applyPreset(next, next.preset, next.presets.custom);
    }
    await this.#capabilities.storage.setBrowseSettings(next);
    if (next.ui.dock !== this.#settings.ui.dock) this.#capabilities.ui.launcher.resetPosition();
    this.#settings = next;
    this.#ui.setSettings(next);
    this.#applyGlobalSettings();
    void this.#refreshCandidates().catch((error) =>
      this.#recordError(
        error,
        'BASIC_SETTINGS_APPLY_FAILED',
        'Browse settings were saved but could not be applied to every current item.',
      ),
    );
    return next;
  }

  async #reloadSettings() {
    const next = normalizeBasicSettings(await this.#capabilities.storage.getBrowseSettings());
    this.#settings = next;
    this.#ui?.setSettings(next);
    this.#applyGlobalSettings();
    void this.#refreshCandidates().catch((error) =>
      this.#recordError(
        error,
        'BASIC_SETTINGS_APPLY_FAILED',
        'Reloaded Browse settings could not be applied to every current item.',
      ),
    );
  }

  #applyGlobalSettings() {
    this.#infiniteScroll.configure(this.#settings.infiniteScroll);
    this.#infiniteScroll.setNext(nativeNextPage(this.#document));
    this.#infiniteTrigger.start({
      enabled: this.#settings.infiniteScroll.enabled,
      signal: this.#abort.signal,
    });
    this.#document.documentElement.classList.toggle('flt-basic-compact', this.#settings.ui.compact);
    this.#document.documentElement.classList.toggle(
      'flt-basic-high-contrast',
      this.#settings.ui.highContrast,
    );
    this.#document.documentElement.classList.toggle(
      'flt-basic-launcher-left',
      this.#settings.ui.dock === 'left',
    );
    this.#ui?.shell.setChrome({ contrast: this.#settings.ui.highContrast });
    this.#capabilities.ui.preferences.adopt({
      menuWidth: this.#settings.ui.menuWidth,
      notifications: this.#settings.ui.notifications,
    });
    this.#capabilities.ui.preferences.apply();
    this.#syncPageTools();
    void this.#applyPageEnhancements().catch((error) =>
      this.#recordError(
        error,
        'BASIC_PAGE_ENHANCEMENT_FAILED',
        'Page enhancements could not be applied.',
      ),
    );
  }

  async #applyPageEnhancements() {
    const revision = ++this.#enhancementRevision;
    let people;
    try {
      people = await this.#capabilities.storage.list('people');
    } catch (error) {
      if (error?.code !== 'STORAGE_ACCOUNT_AMBIGUOUS') throw error;
      people = [];
    }
    if (revision !== this.#enhancementRevision || this.#abort.signal.aborted) return;
    const seenIds = new Set(
      people.filter((record) => record.value.basic?.seenAt).map((record) => record.value.personId),
    );
    const seenNames = new Set(
      people
        .filter((record) => record.value.basic?.seenAt)
        .map((record) => record.value.displayName?.toLocaleLowerCase())
        .filter(Boolean),
    );
    const interests = new Set(
      [...this.#document.querySelectorAll('[data-flt-own-interest]')]
        .map((node) => node.dataset.fltOwnInterest?.toLocaleLowerCase())
        .filter(Boolean),
    );
    this.#enhancements.apply(this.#settings.pageEnhancements, {
      interests,
      onPictureNavigate: this.#pictureNavigate,
      seenIds,
      seenNames,
    });
  }

  async #onCandidate(candidate) {
    this.#processedCandidates += 1;
    if (this.#processedCandidates % PRUNE_CANDIDATE_INTERVAL === 0) this.#pruneDetached();
    this.#candidates.set(candidate.element, candidate);
    if (candidate.confidence === 'low') {
      this.#capabilities.ui.presentation.clearCard(candidate.element);
      this.#syncPageTools();
      return;
    }
    if (candidate.kind === 'profile') {
      const identity = candidate.parsed.identity;
      const personId = identity?.durable ? identity.value : null;
      const record = personId ? await this.#getPersonRecord(personId) : null;
      const filterResult = evaluateCandidate(
        profileFilterFacts(
          candidate.element,
          candidate.parsed.metadata?.profileFacts,
          candidate.parsed.displayName,
        ),
        this.#settings,
      );
      const requests = cardRequests(
        {
          filterResult,
          seen: Boolean(record?.value.basic?.seenAt),
        },
        this.#settings,
      );
      if (personId && this.#sessionMutedPeople.has(personId)) {
        requests.push({ reason: 'quiet', state: 'HIDDEN', treatment: 'session-mute' });
      }
      if (this.#filterReveal) {
        const filterRequest = requests.find(
          (request) => request.reason === 'filter' && request.state === 'HIDDEN',
        );
        if (filterRequest) requests.splice(requests.indexOf(filterRequest), 1);
      }
      requests.push(
        ...((await this.#editionExtension?.cardRequests?.({
          candidate,
          personId,
          record,
          settings: this.#settings,
        })) ?? []),
      );
      const decision = this.#capabilities.ui.presentation.applyCard(candidate.element, requests);
      this.#presentedCards.add(candidate.element);
      this.#results.set(candidate.element, {
        filterReasons: filterResult.reasons,
        filterStatus: filterResult.status,
        state: decision.state,
      });
      this.#updateResultStatus();
      if (personId && candidate.safeFor.durable) {
        this.#renderProfileActions(candidate, record?.value.basic ?? {});
      }
      const routeRoot = candidate.element.matches('main, [data-test-id="profile-header"]');
      const visitKey = `${candidate.context.route.url}:${personId}`;
      if (
        routeRoot &&
        candidate.context.route.kind === 'profile' &&
        candidate.safeFor.durable &&
        !this.#seenVisits.has(visitKey) &&
        !this.#privateSession &&
        this.#editionExtension?.allowPassivePersistence?.('seen') !== false
      ) {
        this.#rememberVisit(visitKey);
        await this.#profileState.markSeen({
          displayName: candidate.parsed.displayName,
          personId,
          profileUrl: candidate.parsed.canonicalUrl,
          routeKind: 'PROFILE',
        });
        await this.#refreshVisitHistory();
        const refreshed = await this.#capabilities.storage.get('people', personId);
        this.#renderProfileActions(candidate, refreshed?.value.basic ?? {});
      }
    } else {
      const itemKey = this.#itemKey(candidate);
      const requests = [];
      const feedRequest = feedFocusRequest(candidate, this.#settings);
      if (feedRequest) requests.push(feedRequest);
      if (
        itemKey &&
        this.#seenItems.has(itemKey) &&
        this.#settings.seen.presentation !== 'normal' &&
        candidate.context.route.params?.view !== 'requests'
      ) {
        requests.push({
          detail: 'Dimmed because this item was already opened.',
          reason: 'seen',
          state: this.#settings.seen.presentation.toUpperCase(),
          treatment: 'seen-item',
        });
      }
      requests.push(
        ...((await this.#editionExtension?.cardRequests?.({
          candidate,
          settings: this.#settings,
        })) ?? []),
      );
      const decision = this.#capabilities.ui.presentation.applyCard(candidate.element, requests);
      this.#presentedCards.add(candidate.element);
      this.#results.set(candidate.element, {
        filterReasons: [],
        filterStatus: 'NOT_APPLICABLE',
        state: decision.state,
      });
      this.#updateResultStatus();
      if (this.#isCurrentItem(candidate) && itemKey && !this.#seenItems.has(itemKey)) {
        await this.#markItemSeen(candidate);
      }
    }
    for (const element of candidate.element.querySelectorAll('img, video')) {
      const kind = element.matches('video')
        ? 'video'
        : element.closest('[data-flt-avatar]')
          ? 'avatar'
          : 'content';
      applyMediaPolicy(this.#capabilities.ui.presentation, element, this.#settings.media, kind);
      this.#presentedMedia.add(element);
    }
    this.#syncPageTools();
  }

  #itemKey(candidate) {
    if (!['content', 'event', 'group'].includes(candidate?.kind)) return null;
    return candidate.safeFor?.durable ? (candidate.parsed.identity?.key ?? null) : null;
  }

  #isCurrentItem(candidate) {
    return isCurrentItemRoute(candidate);
  }

  async #markItemSeen(candidate) {
    const key = this.#itemKey(candidate);
    if (!key || this.#privateSession) return false;
    return this.#seenItems.mark({
      key,
      kind: candidate.kind,
      title: candidate.parsed.title,
    });
  }

  #syncPageTools(route = this.#capabilities.routes?.context?.route) {
    this.#pageTools.update({
      candidates: this.#candidates.values(),
      preset: this.#settings?.preset ?? 'default',
      route,
    });
  }

  #requestPrivateSessionState() {
    try {
      this.#capabilities.crossTab?.publish('privacy-state-query', {}, { scope: 'account' });
    } catch (error) {
      this.#recordError(
        error,
        'BASIC_PRIVACY_SYNC_FAILED',
        'Private Session state could not be synchronized.',
      );
    }
  }

  #relationshipContext() {
    return Boolean(this.#capabilities.routes?.context?.route?.params?.relationshipList);
  }

  async #resetSeen() {
    const result = await this.#profileState.resetSeen({
      confirm: () =>
        this.#capabilities.ui.dialogs.confirm({
          confirmLabel: 'Clear Seen',
          description:
            'Seen profiles and opened content for the current FL Tools account will be cleared.',
          destructive: true,
          title: 'Reset Seen profiles?',
        }),
    });
    if (result.status === 'COMPLETE') {
      const itemCount = await this.#seenItems.reset();
      this.#capabilities.ui.announcer.announce(
        `${result.cleared + itemCount} Seen items were reset.`,
      );
      await this.#refreshVisitHistory();
      this.#capabilities.scanner?.scan(this.#document);
    }
  }

  async #markUnseen(personId) {
    try {
      const changed = await this.#profileState.markUnseen(personId);
      if (!changed) return;
      await Promise.all([this.#refreshVisitHistory(), this.#refreshCandidates()]);
      this.#capabilities.ui.announcer.announce('The profile was marked unseen.');
    } catch (error) {
      this.#recordError(
        error,
        'BASIC_MARK_UNSEEN_FAILED',
        'The profile could not be marked unseen.',
      );
    }
  }

  async #refreshVisitHistory() {
    const items = await this.#profileState.listRecentlyVisited();
    this.#ui?.setVisitHistory(items);
    return items;
  }

  async #resetSettings() {
    const confirmed = await this.#capabilities.ui.dialogs.confirm({
      confirmLabel: 'Reset Browse settings',
      description:
        'Feed Focus, filters, presets, media, Seen presentation, Infinite Scroll, page enhancements, navigation, and Basic display options return to current defaults. Saved people state is not deleted.',
      destructive: true,
      title: 'Reset Browse settings?',
    });
    if (!confirmed) return;
    await this.#capabilities.storage.resetBrowseSettings();
    await this.#reloadSettings();
    this.#capabilities.ui.announcer.announce('Browse settings were reset.');
  }

  #placeBesideSupporter(element, node) {
    const supporter = element.querySelector(
      '[aria-label*="supporter" i], [title*="supporter" i], [data-supporter], a[href*="/support"]',
    );
    const name = element.querySelector('h1, h2, [data-fltools-field="display-name"]');
    const anchor = supporter ?? name;
    if (anchor) anchor.after(node);
    else element.prepend(node);
  }

  #explainableChip(label, explanation) {
    const chip = this.#document.createElement('button');
    chip.type = 'button';
    chip.className = 'flt-root flt-card-chip flt-basic-seen-chip';
    chip.dataset.fltTip = explanation;
    chip.setAttribute('aria-expanded', 'false');
    chip.setAttribute('aria-label', explanation);
    chip.textContent = label;
    chip.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      chip.setAttribute(
        'aria-expanded',
        chip.getAttribute('aria-expanded') === 'true' ? 'false' : 'true',
      );
    });
    return chip;
  }

  #renderProfileActions(candidate, basicState) {
    const personId = candidate.parsed.identity.value;
    candidate.element.querySelector(':scope [data-flt-basic-profile-actions="true"]')?.remove();
    candidate.element.querySelector(':scope [data-flt-basic-seen-chip="true"]')?.remove();
    const actions = this.#document.createElement('span');
    actions.className = 'flt-basic-card-chips';
    actions.dataset.fltBasicProfileActions = 'true';
    actions.addEventListener('click', (event) => event.stopPropagation());
    if (!this.#sessionMutedPeople.has(personId)) {
      const mute = this.#capabilities.ui.controls.button({
        label: 'Mute for session',
        onClick: () => void this.#muteForSession(candidate),
      });
      mute.classList.add('flt-root', 'flt-card-chip');
      mute.dataset.fltTip = 'Hide this person until FL Tools is restarted. Nothing is saved.';
      mute.setAttribute('aria-label', mute.dataset.fltTip);
      actions.append(mute);
    }
    if (basicState.seenAt && this.#settings.seen.showChip) {
      const seen = this.#explainableChip(
        'Seen',
        `Seen because this profile was opened on ${new Date(basicState.seenAt).toLocaleString()}.`,
      );
      seen.dataset.fltBasicSeenChip = 'true';
      actions.append(seen);
    }
    if (typeof this.#nativeBlock === 'function') {
      const native = this.#capabilities.ui.controls.button({
        label: 'Block',
        onClick: () =>
          void this.#profileState.nativeBlock({
            confirm: () =>
              this.#capabilities.ui.dialogs.confirm({
                confirmLabel: 'Continue to native Block',
                description:
                  'This uses FetLife’s native Block. FL Tools will never run it automatically.',
                destructive: true,
                title: `Block ${candidate.parsed.displayName ?? 'this person'} on FetLife?`,
              }),
            perform: this.#nativeBlock,
            personId,
          }),
      });
      native.classList.add('flt-root', 'flt-card-chip');
      native.dataset.fltTip = 'FetLife Block. This uses FetLife’s own block after you confirm.';
      native.setAttribute('aria-label', native.dataset.fltTip);
      actions.append(native);
    }
    this.#placeBesideSupporter(candidate.element, actions);
  }

  async #muteForSession(candidate) {
    const personId = candidate.parsed.identity.value;
    const displayName = candidate.parsed.displayName ?? 'Profile';
    this.#sessionMutedPeople.add(personId);
    await this.#refreshCandidates();
    this.#capabilities.ui.notify?.({
      actions: [
        {
          handler: async () => {
            this.#sessionMutedPeople.delete(personId);
            await this.#refreshCandidates();
            this.#capabilities.ui.dismissNotification?.('basic.session-mute');
            this.#capabilities.ui.announcer.announce(`${displayName} is visible again.`);
          },
          label: 'Undo',
        },
      ],
      bullets: [],
      id: 'basic.session-mute',
      kind: 'SYSTEM',
      message: `${displayName} is hidden until FL Tools is restarted. Nothing was saved.`,
      priority: 'LOW',
      title: 'Muted for this session',
    });
    try {
      await this.#editionExtension?.onManualAction?.(
        Object.freeze({ displayName, kind: 'mute-person', personId }),
      );
    } catch (error) {
      this.#recordError(
        error,
        'BASIC_ACTION_PROMOTION_FAILED',
        'The session action worked, but the edition could not offer an automatic rule.',
      );
    }
  }

  async #refreshCandidates() {
    for (const [element, candidate] of [...this.#candidates]) {
      if (!element.isConnected) {
        this.#candidates.delete(element);
        this.#results.delete(element);
        continue;
      }
      await this.#onCandidate(candidate);
    }
  }

  #clearCandidateState() {
    for (const element of this.#presentedCards)
      this.#capabilities.ui.presentation.clearCard(element);
    for (const element of this.#presentedMedia)
      this.#capabilities.ui.presentation.clearMedia(element);
    this.#presentedCards.clear();
    this.#presentedMedia.clear();
    this.#candidates.clear();
    this.#results.clear();
    this.#updateResultStatus();
  }

  async #getPersonRecord(personId) {
    try {
      return await this.#capabilities.storage.get('people', personId);
    } catch (error) {
      if (error?.code === 'STORAGE_ACCOUNT_AMBIGUOUS') return null;
      throw error;
    }
  }

  #pruneDetached() {
    this.#capabilities.ui.presentation.pruneDisconnected?.();
    for (const element of this.#presentedCards) {
      if (!element.isConnected) this.#presentedCards.delete(element);
    }
    for (const element of this.#presentedMedia) {
      if (!element.isConnected) this.#presentedMedia.delete(element);
    }
    for (const element of this.#candidates.keys()) {
      if (!element.isConnected) {
        this.#candidates.delete(element);
        this.#results.delete(element);
      }
    }
  }

  #rememberVisit(visitKey) {
    this.#seenVisits.delete(visitKey);
    this.#seenVisits.add(visitKey);
    while (this.#seenVisits.size > MAX_REMEMBERED_VISITS) {
      this.#seenVisits.delete(this.#seenVisits.values().next().value);
    }
  }

  #updateResultStatus() {
    const results = [...this.#results.entries()]
      .filter(([element]) => element.isConnected)
      .map(([, result]) => result);
    const states = results.map((result) => result.state);
    const shown = states.filter((state) => state !== 'HIDDEN').length;
    this.#ui?.setStatus(`${shown} of ${states.length} shown`);
    const reasons = {};
    for (const result of results) {
      if (result.filterStatus !== 'NO_MATCH') continue;
      for (const reason of result.filterReasons) reasons[reason] = (reasons[reason] ?? 0) + 1;
    }
    this.#ui?.setFilterImpact({
      dimmed: states.filter((state) => state === 'DIMMED').length,
      filterHidden: results.filter(
        (result) =>
          result.filterStatus === 'NO_MATCH' && this.#settings.filters.resultMode === 'hide',
      ).length,
      hidden: states.filter((state) => state === 'HIDDEN').length,
      reasons,
      revealed: this.#filterReveal,
      total: states.length,
      visible: states.filter((state) => state === 'VISIBLE').length,
    });
  }

  #setFilterReveal(active) {
    this.#filterReveal = active === true;
    void this.#refreshCandidates().then(() =>
      this.#capabilities.ui.announcer.announce(
        this.#filterReveal
          ? 'Filter-hidden profiles are temporarily revealed on this page. Other safety and preference states remain active.'
          : 'Saved filter hiding is restored.',
      ),
    );
  }

  async #savePreset(name) {
    try {
      const next = saveCustomPreset(this.#settings, name);
      await this.#capabilities.storage.setBrowseSettings(next);
      this.#settings = next;
      this.#ui.setSettings(next);
      this.#capabilities.ui.announcer.announce(`Custom preset ${name.trim()} was saved.`);
    } catch (error) {
      this.#capabilities.diagnostics?.record({
        category: 'FEATURE',
        code: 'BASIC_PRESET_SAVE_FAILED',
        error,
        message: 'The custom Browse preset could not be saved.',
        severity: 'WARN',
      });
      this.#capabilities.ui.announcer.announce('The custom preset could not be saved.', {
        priority: 'assertive',
      });
    }
  }

  async #renamePreset(currentName, nextName) {
    try {
      const next = renameCustomPreset(this.#settings, currentName, nextName);
      await this.#capabilities.storage.setBrowseSettings(next);
      this.#settings = next;
      this.#ui.setSettings(next);
      this.#capabilities.ui.announcer.announce(
        `Custom preset ${currentName} was renamed to ${nextName.trim()}.`,
      );
    } catch (error) {
      this.#recordError(
        error,
        'BASIC_PRESET_RENAME_FAILED',
        'The custom Browse preset could not be renamed.',
      );
      this.#capabilities.ui.announcer.announce('The custom preset could not be renamed.', {
        priority: 'assertive',
      });
    }
  }

  async #deletePreset(name) {
    const confirmed = await this.#capabilities.ui.dialogs.confirm({
      confirmLabel: 'Delete custom preset',
      description:
        this.#settings.preset === name
          ? 'This preset is active. Deleting it will apply the immutable Default Browse policy.'
          : 'This removes only the saved Browse preset. People and product data are unchanged.',
      destructive: true,
      title: `Delete ${name}?`,
    });
    if (!confirmed) return;
    try {
      const next = deleteCustomPreset(this.#settings, name);
      await this.#capabilities.storage.setBrowseSettings(next);
      this.#settings = next;
      this.#ui.setSettings(next);
      this.#applyGlobalSettings();
      await this.#refreshCandidates();
      this.#capabilities.ui.announcer.announce(`Custom preset ${name} was deleted.`);
    } catch (error) {
      this.#recordError(
        error,
        'BASIC_PRESET_DELETE_FAILED',
        'The custom Browse preset could not be deleted.',
      );
      this.#capabilities.ui.announcer.announce('The custom preset could not be deleted.', {
        priority: 'assertive',
      });
    }
  }

  #recordError(error, code, message) {
    this.#capabilities.diagnostics?.record({
      category: 'FEATURE',
      code,
      error,
      message,
      severity: 'WARN',
    });
  }

  #mountStyle() {
    if (this.#style?.isConnected) return;
    const existing = this.#document.querySelector('style[data-flt-basic-owned="true"]');
    if (existing) {
      this.#style = existing;
      return;
    }
    const style = this.#document.createElement('style');
    style.dataset.fltBasicOwned = 'true';
    style.textContent = `
.flt-basic-section { border: 1px solid var(--flt-border); border-radius: 7px; padding: 6px; margin-bottom: 5px; background: color-mix(in srgb, var(--flt-surface) 82%, transparent); }
.flt-basic-section-title { margin: 0 0 5px; font-size: 12px; }
.flt-basic-actions { display: flex; flex-wrap: wrap; gap: 4px; }
.flt-basic-subsection { margin-top: 6px; }
.flt-basic-saved-term { display: flex; flex-wrap: wrap; gap: 4px; align-items: flex-start; margin-top: 3px; }
.flt-basic-saved-term > span { flex: 1 1 100%; min-width: 0; overflow-wrap: anywhere; }
.flt-basic-card-chips { display: inline-flex; flex-wrap: wrap; gap: 3px; align-items: center; margin-inline-start: 4px; vertical-align: middle; }
.flt-basic-card-chips .flt-button, .flt-basic-card-chips .flt-card-chip { height: auto; min-height: 0; margin: 0; padding: 1px 5px; border-radius: 5px; font-size: 9px; line-height: 1.2; }
.flt-basic-filter-chips { position: fixed; left: 12px; bottom: 16px; z-index: 2147482990; display: flex; flex-wrap: wrap; align-items: center; gap: 5px; max-width: min(460px, calc(100vw - 88px)); padding: 6px 8px; border: 1px solid var(--flt-border); border-radius: 10px; background: color-mix(in srgb, var(--flt-background) 92%, transparent); color: var(--flt-text); box-shadow: 0 8px 24px rgb(0 0 0 / 35%); }
.flt-basic-filter-chips-title { color: var(--flt-muted); font-size: 9px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; }
.flt-loaded-page { margin-top: 28px; padding-top: 16px; border-top: 1px solid color-mix(in srgb, var(--flt-border) 80%, transparent); }
.flt-basic-scroll-sentinel { margin: 20px 0 12px; min-height: 36px; border: 1px dashed var(--flt-border); border-radius: 7px; padding: 7px; color: var(--flt-muted); }
.flt-basic-exact-time { margin-inline-start: 5px; color: var(--flt-muted); font-size: 12px; }
.flt-basic-visited { text-decoration: underline double; }
.flt-basic-shared-interest { font-weight: 700; }
.flt-basic-picture-next { margin: 6px; }
.flt-basic-page-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin: 8px 0; padding: 7px; border: 1px solid var(--flt-border); border-radius: 7px; background: color-mix(in srgb, var(--flt-background) 90%, transparent); color: var(--flt-text); }
.flt-basic-page-tools > .flt-input { flex: 1 1 150px; width: auto; min-width: 0; }
.flt-basic-page-status { flex: 1 1 auto; color: var(--flt-muted); font-size: 11px; }
.flt-basic-bookmark-filtered { display: none !important; }
[data-flt-card-selected="true"] { outline: 2px solid var(--flt-focus) !important; outline-offset: 3px; }
.flt-basic-native-preview .flt-state-hidden { display: revert !important; visibility: visible !important; }
.flt-basic-native-preview .flt-state-dimmed { opacity: 1 !important; }
.flt-basic-native-preview .flt-state-highlighted { outline-color: transparent !important; }
.flt-basic-native-preview .flt-media-blurred { filter: none !important; }
.flt-basic-native-preview .flt-media-hidden { visibility: visible !important; }
.flt-basic-compact .flt-basic-section { padding: 4px; margin-bottom: 3px; }
.flt-basic-high-contrast .flt-panel, .flt-basic-high-contrast .flt-basic-section { border-width: 2px; }
`;
    this.#document.head.append(style);
    this.#style = style;
  }
}

export async function installBasic(coreSurface, options) {
  if (!coreSurface?.registerProduct) throw new TypeError('Compatible FL Tools Core is required');
  await coreSurface.whenReady;
  const registration = await coreSurface.registerProduct({
    features: COMPONENTS,
    manifest: BASIC_MANIFEST,
    updateProvider: options.updateProvider,
  });
  const product = new BasicProduct({ ...options, registration });
  await product.start();
  return Object.freeze({ product, registration });
}
