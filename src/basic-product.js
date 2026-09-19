import { BasicUI } from './basic-ui.js';
import { cardRequests, evaluateCandidate } from './filter-engine.js';
import { InfiniteScrollController, InfiniteScrollTrigger } from './infinite-scroll.js';
import { applyMediaPolicy } from './media.js';
import { BasicNavigation } from './navigation.js';
import { PageEnhancements } from './page-enhancements.js';
import { BrowserPageLoader, nativeNextPage } from './page-loader.js';
import { BasicProfileState } from './profile-state.js';
import { applyPreset, normalizeBasicSettings, saveCustomPreset } from './settings.js';

export const BASIC_MANIFEST = Object.freeze({
  channel: 'stable',
  coreCompatibility: '^3.0.0',
  features: Object.freeze([
    'basic.filters',
    'basic.presets',
    'basic.media',
    'basic.seen',
    'basic.soft-block',
    'basic.page-enhancements',
    'basic.navigation',
    'basic.infinite-scroll',
    'basic.settings',
  ]),
  id: 'basic',
  name: 'FL Tools Basic',
  permissions: Object.freeze([
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
  version: '3.0.0',
});

const COMPONENTS = BASIC_MANIFEST.features.map((id) => ({
  id,
  owner: 'basic',
  permissions: BASIC_MANIFEST.permissions,
}));

const MAX_REMEMBERED_VISITS = 512;
const PRUNE_CANDIDATE_INTERVAL = 100;

function facts(element) {
  const split = (value) =>
    value
      ? value
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      : null;
  const age = Number(element.dataset.fltAge);
  return {
    age: Number.isFinite(age) && age >= 18 ? age : null,
    card: split(element.dataset.fltCard),
    gender: element.dataset.fltGender || null,
    limit: split(element.dataset.fltLimit),
    nickname: split(element.dataset.fltNickname),
    relationship: element.dataset.fltRelationship || null,
    roles: split(element.dataset.fltRoles),
    tags: split(element.dataset.fltTags),
  };
}

export class BasicProduct {
  #abort;
  #active = false;
  #capabilities;
  #candidates = new Map();
  #document;
  #enhancements;
  #enhancementRevision = 0;
  #editionId;
  #editionExtension;
  #editionName;
  #infiniteScroll;
  #infiniteTrigger;
  #launcher;
  #navigation;
  #nativeBlock;
  #profileState;
  #privateSession = false;
  #pictureNavigate;
  #processedCandidates = 0;
  #ownership;
  #presentedCards = new Set();
  #presentedMedia = new Set();
  #results = new Map();
  #settings;
  #seenVisits = new Set();
  #style;
  #ui;
  #window;

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
    nativeBlock,
    pictureNavigate,
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
    this.#window = window;
    this.iconUrl = iconUrl;
    this.#nativeBlock = nativeBlock;
    this.#pictureNavigate = pictureNavigate;
    this.#profileState = new BasicProfileState({
      storage: capabilities.storage,
    });
    this.#enhancements = new PageEnhancements({ document });
    let loader;
    if (!fetchPage && !appendPage && typeof window.fetch === 'function') {
      loader = new BrowserPageLoader({ document, window });
    }
    this.#infiniteScroll = new InfiniteScrollController({
      append: appendPage ?? loader?.append.bind(loader) ?? (() => {}),
      fetchPage:
        fetchPage ?? loader?.fetchPage.bind(loader) ?? (() => ({ items: [], nextUrl: null })),
    });
    this.#infiniteTrigger = new InfiniteScrollTrigger({
      controller: this.#infiniteScroll,
      document,
      observerFactory:
        typeof window.IntersectionObserver === 'function'
          ? (callback) => new window.IntersectionObserver(callback, { rootMargin: '600px' })
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
    this.#active = true;
    try {
      const extension = (await this.#editionExtension?.activate?.()) ?? [];
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
        editionBrowseSections,
        editionSettingsSections,
        editionViews,
        onResetSeen: () => this.#resetSeen(),
        onResetSettings: () => this.#resetSettings(),
        onSavePreset: (name) => this.#savePreset(name),
        onSettings: (next) => this.#acceptSettings(next),
        productName: this.#editionName,
        settings: this.#settings,
        version: BASIC_MANIFEST.version,
      });
      this.#launcher = this.#capabilities.ui.launcher.register({
        iconUrl: this.iconUrl,
        name: this.#editionName,
        onActivate: ({ productId }) => {
          this.#capabilities.ui.launcher.setActive(productId);
          this.#ui.shell.open({ trigger: this.#launcher.button });
        },
        productId: this.#editionId,
      });
      this.#navigation = new BasicNavigation({
        document: this.#document,
        getShortcuts: extension.navigation?.getShortcuts,
        handlers: {
          filters: () => {
            this.#ui.shell.open({ trigger: this.#launcher.button });
            this.#ui.shell.setView('browse', { focus: true });
          },
          hide: () => extension.navigation?.hide?.(),
          next: () => void this.#infiniteScroll.requestNext({ signal: this.#abort.signal }),
          nsfw: () =>
            void this.#acceptSettings({
              ...this.#settings,
              media: {
                ...this.#settings.media,
                preset: this.#settings.media.preset === 'sfw' ? 'nsfw' : 'sfw',
              },
            }),
          settings: () => {
            this.#ui.shell.open({ trigger: this.#launcher.button });
            this.#ui.shell.setView('settings', { focus: true });
          },
        },
        window: this.#window,
      });
      this.#navigation.start();
      this.#capabilities.scanner?.subscribe(
        ['content', 'feed', 'profile'],
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
          if (storeName === 'people') {
            void this.#refreshCandidates().catch((error) =>
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
          this.#clearCandidateState();
          this.#requestPrivateSessionState();
          if (accountId) {
            void this.#reloadSettings()
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
            this.#applyGlobalSettings();
          }
        },
        { signal: this.#abort.signal },
      );
      this.#requestPrivateSessionState();
      this.#mountStyle();
      this.#applyGlobalSettings();
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
    this.#abort.abort('basic-stop');
    this.#navigation?.stop();
    this.#enhancements.clear();
    this.#infiniteTrigger.stop();
    this.#infiniteScroll.reset();
    this.#clearCandidateState();
    this.#processedCandidates = 0;
    this.#launcher?.unregister();
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
    );
  }

  setNextPage(url) {
    this.#infiniteScroll.setNext(url);
  }

  async #acceptSettings(value) {
    let next = normalizeBasicSettings(value);
    if (next.preset !== this.#settings.preset) {
      next = applyPreset(next, next.preset, next.presets.custom);
    }
    await this.#capabilities.storage.setBrowseSettings(next);
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
    const interests = new Set(
      [...this.#document.querySelectorAll('[data-flt-own-interest]')]
        .map((node) => node.dataset.fltOwnInterest)
        .filter(Boolean),
    );
    this.#enhancements.apply(this.#settings.pageEnhancements, {
      interests,
      onPictureNavigate: this.#pictureNavigate,
      seenIds,
    });
  }

  async #onCandidate(candidate) {
    this.#processedCandidates += 1;
    if (this.#processedCandidates % PRUNE_CANDIDATE_INTERVAL === 0) this.#pruneDetached();
    this.#candidates.set(candidate.element, candidate);
    if (candidate.confidence === 'low') {
      this.#capabilities.ui.presentation.clearCard(candidate.element);
      return;
    }
    if (candidate.kind === 'profile') {
      const identity = candidate.parsed.identity;
      const personId = identity?.durable ? identity.value : null;
      const record = personId ? await this.#getPersonRecord(personId) : null;
      const filterResult = evaluateCandidate(facts(candidate.element), this.#settings);
      const requests = cardRequests(
        {
          filterResult,
          seen: Boolean(record?.value.basic?.seenAt),
          softBlocked: Boolean(record?.value.basic?.softBlock),
        },
        this.#settings,
      );
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
      this.#results.set(candidate.element, decision.state);
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
          routeKind: 'PROFILE',
        });
        const refreshed = await this.#capabilities.storage.get('people', personId);
        this.#renderProfileActions(candidate, refreshed?.value.basic ?? {});
      }
    } else if (this.#editionExtension?.cardRequests) {
      const requests = await this.#editionExtension.cardRequests({
        candidate,
        settings: this.#settings,
      });
      const decision = this.#capabilities.ui.presentation.applyCard(candidate.element, requests);
      this.#presentedCards.add(candidate.element);
      this.#results.set(candidate.element, decision.state);
      this.#updateResultStatus();
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

  async #resetSeen() {
    const result = await this.#profileState.resetSeen({
      confirm: () =>
        this.#capabilities.ui.dialogs.confirm({
          confirmLabel: 'Clear Seen',
          description: 'Only Seen timestamps for the current FL Tools account will be cleared.',
          destructive: true,
          title: 'Reset Seen profiles?',
        }),
    });
    if (result.status === 'COMPLETE') {
      this.#capabilities.ui.announcer.announce(`${result.cleared} Seen profiles were reset.`);
      this.#capabilities.scanner?.scan(this.#document);
    }
  }

  async #resetSettings() {
    const confirmed = await this.#capabilities.ui.dialogs.confirm({
      confirmLabel: 'Reset Browse settings',
      description:
        'Filters, presets, media, Seen presentation, Infinite Scroll, page enhancements, navigation, and Basic display options return to current defaults. Saved people state is not deleted.',
      destructive: true,
      title: 'Reset Browse settings?',
    });
    if (!confirmed) return;
    await this.#capabilities.storage.resetBrowseSettings();
    await this.#reloadSettings();
    this.#capabilities.ui.announcer.announce('Browse settings were reset.');
  }

  #renderProfileActions(candidate, basicState) {
    const personId = candidate.parsed.identity.value;
    candidate.element.querySelector(':scope > [data-flt-basic-profile-actions="true"]')?.remove();
    candidate.element.querySelector(':scope > [data-flt-basic-seen-chip="true"]')?.remove();
    if (basicState.seenAt && this.#settings.seen.showChip) {
      const chip = this.#document.createElement('span');
      chip.className = 'flt-presentation-indicator flt-basic-seen-chip';
      chip.dataset.fltBasicSeenChip = 'true';
      chip.textContent = 'Seen';
      candidate.element.prepend(chip);
    }
    const actions = this.#document.createElement('div');
    actions.className = 'flt-basic-context-actions';
    actions.dataset.fltBasicProfileActions = 'true';
    actions.addEventListener('click', (event) => event.stopPropagation());
    if (basicState.softBlock) {
      const summary = this.#document.createElement('span');
      summary.className = 'flt-basic-soft-block-summary';
      const date = new Date(basicState.softBlock.createdAt).toLocaleDateString();
      summary.textContent = `Soft Block: ${basicState.softBlock.reason || 'No reason'} · ${date}`;
      actions.append(
        summary,
        this.#capabilities.ui.controls.button({
          label: 'Remove Soft Block',
          onClick: async () => {
            await this.#profileState.removeSoftBlock(personId);
            this.#capabilities.ui.presentation.clearCard(candidate.element);
            await this.#onCandidate(candidate);
          },
        }),
      );
    } else {
      actions.append(
        this.#capabilities.ui.controls.button({
          label: 'Soft Block',
          onClick: () => void this.#openSoftBlock(candidate),
        }),
      );
    }
    if (typeof this.#nativeBlock === 'function') {
      actions.append(
        this.#capabilities.ui.controls.button({
          label: 'Native FetLife Block',
          onClick: () =>
            void this.#profileState.nativeBlock({
              confirm: () =>
                this.#capabilities.ui.dialogs.confirm({
                  confirmLabel: 'Continue to native Block',
                  description:
                    'This is FetLife’s native Block, not a local Soft Block. FL Tools will never run it automatically.',
                  destructive: true,
                  title: `Block ${candidate.parsed.displayName ?? 'this person'} on FetLife?`,
                }),
              perform: this.#nativeBlock,
              personId,
            }),
        }),
      );
    }
    candidate.element.append(actions);
  }

  async #openSoftBlock(candidate) {
    const content = this.#document.createElement('label');
    content.className = 'flt-field';
    const label = this.#document.createElement('span');
    label.className = 'flt-label';
    label.textContent = 'Local reason (optional)';
    const reason = this.#document.createElement('textarea');
    reason.className = 'flt-input';
    reason.maxLength = 240;
    content.append(label, reason);
    const dialog = this.#capabilities.ui.dialogs.open({
      actions: [
        { autofocus: true, label: 'Cancel', value: false },
        { label: 'Soft Block', value: true, variant: 'danger' },
      ],
      content,
      description:
        'This only changes local FL Tools presentation. It does not block anyone on FetLife.',
      title: `Soft Block ${candidate.parsed.displayName ?? 'this person'}?`,
    });
    if (!(await dialog.result)) return;
    await this.#profileState.setSoftBlock({
      displayName: candidate.parsed.displayName,
      personId: candidate.parsed.identity.value,
      presentation: this.#settings.softBlock.presentation,
      reason: reason.value,
    });
    await this.#onCandidate(candidate);
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
    const states = [...this.#results.entries()]
      .filter(([element]) => element.isConnected)
      .map(([, state]) => state);
    const shown = states.filter((state) => state !== 'HIDDEN').length;
    this.#ui?.setStatus(`${shown} of ${states.length} shown`);
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
    const style = this.#document.createElement('style');
    style.dataset.fltBasicOwned = 'true';
    style.textContent = `
.flt-basic-section { border: 1px solid var(--flt-border); border-radius: var(--flt-radius-medium); padding: 12px; margin-bottom: 12px; }
.flt-basic-section-title { margin: 0 0 8px; font-size: 15px; }
.flt-basic-actions { display: flex; flex-wrap: wrap; gap: 7px; }
.flt-basic-subsection { margin-top: 10px; }
.flt-basic-saved-term { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; gap: 6px; align-items: center; margin-top: 6px; }
.flt-basic-context-actions { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin-top: 7px; }
.flt-basic-soft-block-summary { color: var(--flt-muted); font-size: 12px; }
.flt-basic-seen-chip { border-radius: 5px; }
.flt-basic-scroll-sentinel { border: 1px dashed var(--flt-border); border-radius: var(--flt-radius-medium); padding: 10px; color: var(--flt-muted); }
.flt-basic-exact-time { margin-inline-start: 5px; color: var(--flt-muted); font-size: 12px; }
.flt-basic-visited { text-decoration: underline double; }
.flt-basic-shared-interest { font-weight: 700; }
.flt-basic-picture-next { margin: 6px; }
.flt-basic-compact .flt-basic-section { padding: 8px; margin-bottom: 8px; }
.flt-basic-high-contrast .flt-panel, .flt-basic-high-contrast .flt-basic-section { border-width: 2px; }
.flt-basic-launcher-left .flt-launcher { left: 14px; right: auto; }
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
