import { forgetTerm, saveTerms } from './settings.js';
import { FIXED_SHORTCUTS } from './navigation.js';
import { attachHelp, canonicalizeFetLifeUrl, CONTROL_HELP } from '@typicalbits/fl-tools-core';

const PAGE_ENHANCEMENTS = Object.freeze([
  [
    'exactTimestamps',
    'Exact timestamps',
    'Replace relative times with the full local date and time.',
  ],
  ['hideBanners', 'Hide banners', 'Hide supported promotional and install banners.'],
  [
    'pictureNavigation',
    'Picture navigation',
    'Keep supported next-picture navigation beside media.',
  ],
  ['sharedInterests', 'Shared interests', 'Highlight interests that also appear on your profile.'],
  ['visitedLinks', 'Visited links', 'Mark links to profiles recorded in Recently Visited.'],
]);

function heading(document, text) {
  const node = document.createElement('h3');
  node.className = 'flt-basic-section-title';
  node.textContent = text;
  return node;
}

function section(document, title, id, helper = '') {
  const node = document.createElement('section');
  node.className = 'flt-basic-section';
  node.dataset.fltBasicSection = id;
  const titleNode = heading(document, title);
  helper ||= CONTROL_HELP[title] ?? '';
  node.dataset.fltSectionTitle = title;
  node.dataset.fltSectionHelp = helper;
  if (helper) {
    titleNode.classList.add('flt-help-anchor');
    titleNode.dataset.fltTip = helper;
    titleNode.setAttribute('aria-description', helper);
    titleNode.tabIndex = 0;
  }
  node.append(titleNode);
  return node;
}

function nestedAccordion(document, root, expanded = new Set()) {
  const accordion = document.createElement('div');
  accordion.className = 'flt-nested-accordion';
  for (const content of [...root.children]) {
    const title = content.querySelector(':scope > .flt-basic-section-title');
    const label = title?.textContent?.trim() || content.dataset.fltSectionTitle || 'Feature';
    const description =
      title?.dataset.fltTip ||
      title?.getAttribute('aria-description') ||
      content.dataset.fltSectionHelp ||
      CONTROL_HELP[label] ||
      '';
    content.dataset.fltSectionTitle = label;
    content.dataset.fltSectionHelp = description;
    title?.remove();
    const panel = document.createElement('section');
    panel.className = 'flt-nested-panel';
    const button = document.createElement('button');
    button.className = 'flt-nested-header';
    button.type = 'button';
    button.setAttribute('aria-expanded', String(expanded.has(label)));
    if (description) {
      button.classList.add('flt-has-tooltip');
      button.dataset.fltTip = description;
      button.setAttribute('aria-description', description);
    }
    const buttonLabel = document.createElement('span');
    buttonLabel.textContent = label;
    const chevron = document.createElement('span');
    chevron.setAttribute('aria-hidden', 'true');
    chevron.textContent = expanded.has(label) ? '▾' : '▸';
    button.append(buttonLabel, chevron);
    content.classList.add('flt-nested-body');
    content.hidden = !expanded.has(label);
    button.addEventListener('click', () => {
      const open = content.hidden;
      for (const sibling of accordion.querySelectorAll('.flt-nested-panel')) {
        const siblingButton = sibling.querySelector(':scope > .flt-nested-header');
        const siblingBody = sibling.querySelector(':scope > .flt-nested-body');
        const active = sibling === panel && open;
        siblingBody.hidden = !active;
        siblingButton.setAttribute('aria-expanded', String(active));
        siblingButton.lastElementChild.textContent = active ? '▾' : '▸';
      }
    });
    panel.append(button, content);
    accordion.append(panel);
  }
  return accordion;
}

function fieldRow(document, ...fields) {
  const row = document.createElement('div');
  row.className = 'flt-field-row';
  row.append(...fields);
  return row;
}

function commitOnChange(input, handler) {
  input.addEventListener('change', () => handler(input.value));
  return input;
}

function shortcutFooter(document) {
  const labels = {
    browse: 'Browse',
    clean: 'Clean',
    nextCard: 'Next card',
    next: 'Next page',
    openCard: 'Open card',
    previousCard: 'Previous card',
    sfw: 'SFW',
    standard: 'Standard',
    top: 'Top',
  };
  const list = document.createElement('dl');
  list.className = 'flt-shortcut-list';
  for (const action of [
    'browse',
    'standard',
    'clean',
    'sfw',
    'previousCard',
    'nextCard',
    'openCard',
    'next',
    'top',
  ]) {
    const row = document.createElement('div');
    row.className = 'flt-shortcut-row';
    const label = document.createElement('dt');
    label.textContent = labels[action];
    const shortcut = document.createElement('dd');
    const key = document.createElement('kbd');
    key.textContent = FIXED_SHORTCUTS[action];
    shortcut.append(key);
    row.append(label, shortcut);
    list.append(row);
  }
  return list;
}

function select(document, { label, options, value, onChange }) {
  const field = document.createElement('label');
  field.className = 'flt-field';
  const text = document.createElement('span');
  text.className = 'flt-label';
  text.textContent = label;
  attachHelp(text, CONTROL_HELP[label]);
  const input = document.createElement('select');
  input.className = 'flt-input';
  attachHelp(input, CONTROL_HELP[label]);
  for (const [optionValue, optionLabel] of options) {
    const option = document.createElement('option');
    option.value = optionValue;
    option.textContent = optionLabel;
    input.append(option);
  }
  input.value = value;
  input.addEventListener('change', () => onChange(input.value));
  field.append(text, input);
  return field;
}

export class BasicUI {
  #browseRoot;
  #controls;
  #document;
  #editionId;
  #editionBrowseSections;
  #editionSettingsSections;
  #editionViews;
  #filterImpact = {
    dimmed: 0,
    filterHidden: 0,
    hidden: 0,
    reasons: {},
    revealed: false,
    total: 0,
    visible: 0,
  };
  #infiniteState = {
    enabled: false,
    loadedItems: 0,
    loadedPages: 0,
    loading: false,
    paused: false,
    status: 'IDLE',
  };
  #onFilterReveal;
  #onInfiniteControl;
  #onManageSoftBlocks;
  #presetToolbar;
  #shortcutFooter;
  #onResetSeen;
  #onMarkUnseen;
  #onResetSettings;
  #onSettings;
  #relationshipContext;
  #loadingMode;
  #settings;
  #settingsRoot;
  #shell;
  #visitHistory = [];
  #visitHistoryRoot;
  #expanded = new Set();

  constructor({
    coreUI,
    document,
    onManageSoftBlocks,
    onFilterReveal,
    onInfiniteControl,
    onMarkUnseen,
    onResetSeen,
    onResetSettings,
    onSettings,
    settings,
    visitHistory = [],
    editionId = 'basic',
    editionBrowseSections = [],
    editionSettingsSections = [],
    editionViews = [],
    productName = 'FL Tools Basic',
    changelog,
    iconUrl,
    releaseUrl,
    installUrl,
    updateUrl,
    relationshipContext = false,
    loadingMode = 'page',
    version = '0.0.8',
  }) {
    if (!coreUI?.createShell || !document?.createElement || typeof onSettings !== 'function') {
      throw new TypeError('Basic UI dependencies are required');
    }
    this.#controls = coreUI.controls;
    this.#document = document;
    this.#editionId = editionId;
    this.#onManageSoftBlocks = onManageSoftBlocks;
    this.#onFilterReveal = onFilterReveal;
    this.#onInfiniteControl = onInfiniteControl;
    this.#onMarkUnseen = onMarkUnseen;
    this.#onResetSeen = onResetSeen;
    this.#onResetSettings = onResetSettings;
    this.#onSettings = onSettings;
    this.#relationshipContext = relationshipContext === true;
    this.#loadingMode = loadingMode === 'profile' ? 'profile' : 'page';
    this.#settings = settings;
    this.#visitHistory = Array.isArray(visitHistory) ? visitHistory : [];
    const browse = document.createElement('div');
    const system = document.createElement('div');
    this.#editionBrowseSections = editionBrowseSections;
    this.#editionSettingsSections = editionSettingsSections;
    this.#editionViews = editionViews;
    this.#browseRoot = browse;
    this.#settingsRoot = system;
    this.#renderBrowse(browse);
    this.#renderSettings(system);
    const navigation = this.#buildNavigation();
    this.#shell = coreUI.createShell({
      headerItems: [
        editionId === 'pro' ? 'Automatic browsing rules' : 'Everyday browsing controls',
      ],
      changelog,
      iconUrl,
      navigation,
      productId: editionId,
      productName,
      releaseUrl,
      installUrl,
      updateUrl,
      version,
      shortcutFooter: this.#shortcutFooter,
      topContent: this.#presetToolbar,
    });
  }

  get shell() {
    return this.#shell;
  }

  setSettings(settings) {
    this.#settings = settings;
    this.#rememberExpanded();
    this.#browseRoot.replaceChildren();
    this.#settingsRoot.replaceChildren();
    this.#renderBrowse(this.#browseRoot);
    this.#renderSettings(this.#settingsRoot);
    if (this.#shortcutFooter) this.#shell.setShortcutFooter(this.#shortcutFooter);
    this.#shell.setTopContent(this.#presetToolbar);
    for (const view of this.#buildNavigation()) {
      this.#shell.replaceViewContent(view.id, view.content);
    }
  }

  setStatus(status) {
    this.#shell.element.dataset.fltBrowseStatus = String(status);
  }

  setVisitHistory(items) {
    this.#visitHistory = Array.isArray(items) ? items : [];
    this.#renderVisitHistoryList();
  }

  setFilterImpact(impact) {
    this.#filterImpact = impact;
    const container = this.#shell?.element.querySelector('[data-flt-filter-impact]');
    if (container) this.#renderFilterImpact(container);
  }

  setInfiniteState(state) {
    const previous = this.#infiniteState;
    this.#infiniteState = state;
    const container = this.#shell?.element.querySelector('[data-flt-infinite-session]');
    if (
      container &&
      previous.paused &&
      state.paused &&
      previous.status === state.status &&
      state.pauseRemainingSeconds !== null
    ) {
      const countdown = container.querySelector('[data-flt-pause-countdown]');
      if (countdown)
        countdown.textContent =
          'Resumes in ' +
          Math.floor(state.pauseRemainingSeconds / 60) +
          ':' +
          String(state.pauseRemainingSeconds % 60).padStart(2, '0');
    } else if (container) this.#renderInfiniteState(container);
  }

  setRelationshipContext(enabled) {
    const next = enabled === true;
    if (next === this.#relationshipContext) return;
    this.#rememberExpanded();
    this.#relationshipContext = next;
    this.#browseRoot.replaceChildren();
    this.#settingsRoot.replaceChildren();
    this.#renderBrowse(this.#browseRoot);
    this.#renderSettings(this.#settingsRoot);
    this.#shell.setTopContent(this.#presetToolbar);
    for (const view of this.#buildNavigation()) {
      this.#shell.replaceViewContent(view.id, view.content);
    }
  }

  setLoadingMode(mode) {
    const next = mode === 'profile' ? 'profile' : 'page';
    if (next === this.#loadingMode) return;
    this.#rememberExpanded();
    this.#loadingMode = next;
    this.#browseRoot.replaceChildren();
    this.#settingsRoot.replaceChildren();
    this.#renderBrowse(this.#browseRoot);
    this.#renderSettings(this.#settingsRoot);
    this.#shell.setTopContent(this.#presetToolbar);
    for (const view of this.#buildNavigation()) {
      this.#shell.replaceViewContent(view.id, view.content);
    }
  }

  destroy() {
    this.#shell.destroy();
  }

  #commit(mutator) {
    const next = globalThis.structuredClone(this.#settings);
    mutator(next);
    void Promise.resolve(this.#onSettings(next)).then((accepted) =>
      this.setSettings(accepted ?? next),
    );
  }

  #rememberExpanded() {
    this.#expanded = new Set(
      [...this.#shell.element.querySelectorAll('.flt-nested-header[aria-expanded="true"]')].map(
        (button) => button.firstElementChild.textContent,
      ),
    );
  }

  #buildNavigation() {
    const browseSections = new Map(
      [...this.#browseRoot.children].map((node) => [node.dataset.fltBasicSection, node]),
    );
    const settingsSections = new Map(
      [...this.#settingsRoot.children].map((node) => [node.dataset.fltBasicSection, node]),
    );
    const take = (source, ids, { accordion = true, retainHeadings = false } = {}) => {
      const root = this.#document.createElement('div');
      for (const id of ids) {
        const node = source.get(id);
        if (node) root.append(node);
      }
      if (!accordion) {
        root.className = 'flt-control-stack';
        for (const content of root.children) {
          if (!retainHeadings) content.querySelector(':scope > .flt-basic-section-title')?.remove();
          content.hidden = false;
          content.classList.add(
            retainHeadings ? 'flt-direct-settings-section' : 'flt-feature-content',
          );
        }
        return root;
      }
      if (root.children.length === 1) {
        const content = root.firstElementChild;
        const title = content.querySelector(':scope > .flt-basic-section-title');
        content.dataset.fltSectionTitle ||= title?.textContent ?? '';
        content.dataset.fltSectionHelp ||= title?.dataset.fltTip ?? '';
        title?.remove();
        content.hidden = false;
        content.classList.add('flt-feature-content');
        return content;
      }
      return nestedAccordion(this.#document, root, this.#expanded);
    };
    const suppliedViews = new Map(this.#editionViews.map((view) => [view.id, view.content]));
    const unavailable = (label) => {
      const node = this.#document.createElement('div');
      node.className = 'flt-empty-state';
      node.textContent = `${label} features are unavailable.`;
      return node;
    };

    const navigation = [
      {
        aliases: [
          'filters',
          'presets',
          'media',
          'seen',
          'advanced',
          'infinite-scroll',
          'page-enhancements',
          'recently-visited',
        ],
        content: take(
          browseSections,
          ['page-enhancements', 'infinite-scroll', 'recently-visited'],
          {
            accordion: false,
            retainHeadings: true,
          },
        ),
        id: 'browse',
        label: 'Browse',
      },
    ];
    if (this.#editionId === 'pro') {
      navigation.push({
        content: suppliedViews.get('rules') ?? unavailable('Rules'),
        id: 'rules',
        label: 'Rules',
      });
    }
    navigation.push({
      aliases: ['shortcuts', 'highlighter', 'people', 'personalize'],
      content: take(settingsSections, ['appearance'], {
        accordion: false,
        retainHeadings: true,
      }),
      id: 'appearance',
      label: 'Appearance',
    });
    navigation.push({
      aliases: ['diagnostics', 'settings'],
      content: take(settingsSections, ['diagnostics'], {
        accordion: false,
        retainHeadings: true,
      }),
      id: 'system',
      label: 'System',
    });
    return navigation;
  }

  #renderBrowse(root) {
    const presets = this.#document.createElement('div');
    presets.className = 'flt-preset-toolbar';
    const presetLabel = this.#document.createElement('span');
    presetLabel.className = 'flt-label';
    presetLabel.textContent = 'Browse mode';
    const presetActions = this.#document.createElement('div');
    presetActions.className = 'flt-basic-actions';
    const modeLabels = { default: 'Standard', minimal: 'Clean', sfw: 'SFW' };
    const modeDescriptions = {
      default: 'Show all supported feed activity.',
      minimal: 'Hide reaction and social activity, dim opened items, and reduce page clutter.',
      sfw: 'Use Clean feed focus with stronger media protection.',
    };
    for (const name of ['default', 'minimal', 'sfw']) {
      const button = this.#controls.button({
        label: modeLabels[name],
        onClick: () => this.#commit((next) => (next.preset = name)),
        variant: this.#settings.preset === name ? 'primary' : 'default',
      });
      button.dataset.fltTip = modeDescriptions[name];
      button.setAttribute('aria-label', `${modeLabels[name]}. ${modeDescriptions[name]}`);
      button.setAttribute(
        'aria-keyshortcuts',
        FIXED_SHORTCUTS[name === 'default' ? 'standard' : name],
      );
      button.setAttribute('aria-pressed', String(this.#settings.preset === name));
      presetActions.append(button);
    }
    presets.append(presetLabel, presetActions);
    this.#presetToolbar = presets;
    if (['basic', 'pro'].includes(this.#editionId)) {
      const profileLoading = this.#loadingMode === 'profile';
      const infinite = section(
        this.#document,
        profileLoading ? 'Profile Loading' : 'Page Loading',
        'infinite-scroll',
        profileLoading
          ? 'Load additional profile cards while browsing FetLife Places under /p/.'
          : 'Load the next native page automatically on other supported FetLife pages.',
      );
      const pageLimit = this.#controls.textField({
        label: 'Maximum additional pages (1–20)',
        type: 'number',
        value: this.#settings.infiniteScroll.pageLimit,
      });
      commitOnChange(pageLimit.input, (value) =>
        this.#commit((next) => (next.infiniteScroll.pageLimit = Number(value))),
      );
      infinite.append(
        this.#controls.toggle({
          checked: this.#settings.infiniteScroll.enabled,
          label: profileLoading ? 'Auto Profile Load' : 'Auto Page Load',
          onChange: (value) => this.#commit((next) => (next.infiniteScroll.enabled = value)),
        }).element,
        pageLimit.element,
      );
      const infiniteSession = this.#document.createElement('div');
      infiniteSession.dataset.fltInfiniteSession = 'true';
      this.#renderInfiniteState(infiniteSession);
      infinite.append(infiniteSession);

      const enhancements = section(
        this.#document,
        'Page Enhancements',
        'page-enhancements',
        'Choose the small display and navigation improvements applied to supported FetLife pages.',
      );
      enhancements.classList.add('flt-control-grid');
      for (const [key, label, description] of PAGE_ENHANCEMENTS) {
        enhancements.append(
          this.#controls.toggle({
            checked: this.#settings.pageEnhancements[key],
            description,
            label,
            onChange: (value) => this.#commit((next) => (next.pageEnhancements[key] = value)),
          }).element,
        );
      }
      root.append(enhancements, infinite, this.#recentlyVisitedSection());
      return;
    }
    const filters = section(
      this.#document,
      'Filters',
      'filters',
      'All selected criteria are evaluated against supported visible profile facts. Choose Dim to keep nonmatches available for review.',
    );
    filters.classList.add('flt-control-grid');
    const impact = this.#document.createElement('div');
    impact.dataset.fltFilterImpact = 'true';
    this.#renderFilterImpact(impact);
    filters.append(impact);
    const ageOptions = [
      ['', 'Any age'],
      ...Array.from({ length: 982 }, (_, index) => {
        const age = String(index + 18);
        return [age, age];
      }),
    ];
    const minimum = select(this.#document, {
      label: 'Min age',
      onChange: (value) =>
        this.#commit((next) => (next.filters.age.minimum = value === '' ? null : Number(value))),
      options: ageOptions,
      value: String(this.#settings.filters.age.minimum ?? ''),
    });
    const maximum = select(this.#document, {
      label: 'Max age',
      onChange: (value) =>
        this.#commit((next) => (next.filters.age.maximum = value === '' ? null : Number(value))),
      options: ageOptions,
      value: String(this.#settings.filters.age.maximum ?? ''),
    });
    const matchCriteria = select(this.#document, {
      label: 'Match criteria',
      onChange: (value) => this.#commit((next) => (next.filters.combine = value)),
      options: [
        ['and', 'Match all (AND)'],
        ['or', 'Match any (OR)'],
      ],
      value: this.#settings.filters.combine,
    });
    filters.append(
      fieldRow(this.#document, minimum, maximum),
      matchCriteria,
      select(this.#document, {
        label: 'Role matching',
        onChange: (value) => this.#commit((next) => (next.filters.roleMode = value)),
        options: [
          ['required', 'Required'],
          ['preferred', 'Preferred'],
        ],
        value: this.#settings.filters.roleMode,
      }),
    );
    for (const [key, label] of [
      ['genders', 'Genders'],
      ['roles', 'Roles'],
      ['locations', 'Locations or cities'],
    ]) {
      const field = this.#controls.chipField({
        label,
        placeholder: `Add ${label.toLocaleLowerCase()}`,
        values: this.#settings.filters[key],
        onChange: (values) => this.#commit((next) => (next.filters[key] = values)),
      });
      filters.append(field.element);
    }
    const contentMinimums = {};
    for (const [key, label] of [
      ['pictures', 'Minimum pictures'],
      ['videos', 'Minimum videos'],
      ['writings', 'Minimum writings'],
    ]) {
      contentMinimums[key] = this.#controls.textField({
        label,
        placeholder: '1–9999',
        type: 'number',
        value: this.#settings.filters.minimumContent[key] ?? '',
      });
      commitOnChange(contentMinimums[key].input, (value) =>
        this.#commit(
          (next) => (next.filters.minimumContent[key] = value === '' ? null : Number(value)),
        ),
      );
    }
    const contentRow = fieldRow(
      this.#document,
      contentMinimums.pictures.element,
      contentMinimums.videos.element,
      contentMinimums.writings.element,
    );
    contentRow.classList.add('flt-three-columns');
    filters.append(contentRow);
    const scopes = this.#document.createElement('div');
    scopes.className = 'flt-basic-subsection flt-match-scopes';
    scopes.append(heading(this.#document, 'Match fields'));
    for (const [key, label] of [
      ['card', 'Profile card'],
      ['tags', 'Tags'],
      ['nickname', 'Nickname'],
    ]) {
      scopes.append(
        this.#controls.toggle({
          checked: this.#settings.filters.scopes.includes(key),
          label,
          onChange: (checked) =>
            this.#commit((next) => {
              next.filters.scopes = checked
                ? [...new Set([...next.filters.scopes, key])]
                : next.filters.scopes.filter((item) => item !== key);
            }),
        }).element,
      );
    }
    filters.append(scopes);
    if (this.#relationshipContext) {
      const relationships = this.#document.createElement('div');
      relationships.className = 'flt-basic-subsection';
      relationships.append(heading(this.#document, 'Relationships'));
      for (const [key, label] of [
        ['following', 'Following'],
        ['follows-you', 'Follows you'],
        ['friends', 'Friends'],
        ['none', 'No relationship'],
      ]) {
        const toggle = this.#controls.toggle({
          checked: this.#settings.filters.relationships.includes(key),
          label,
          onChange: (checked) =>
            this.#commit((next) => {
              next.filters.relationships = checked
                ? [...new Set([...next.filters.relationships, key])]
                : next.filters.relationships.filter((item) => item !== key);
            }),
        });
        relationships.append(toggle.element);
      }
      filters.append(relationships);
    }
    for (const [key, label] of [
      ['include', 'Include terms'],
      ['exclude', 'Exclude terms'],
      ['limit', 'Hard limits'],
    ]) {
      const field = this.#controls.chipField({
        label,
        placeholder:
          key === 'limit' ? 'e.g. ddlg, watersports, diaper' : `Add ${label.toLocaleLowerCase()}`,
        values: this.#settings.filters.terms[key],
        savedValues: this.#settings.filters.terms.history[key],
        onChange: (terms) => this.#commit((next) => saveTerms(next, key, terms)),
        onForget: (term) => this.#commit((next) => forgetTerm(next, key, term)),
      });
      filters.append(field.element);
    }

    const media = section(
      this.#document,
      'Media',
      'media',
      'Choose media presentation and blur strength. Changes apply immediately to supported loaded media.',
    );
    media.classList.add('flt-control-grid');
    const blur = this.#controls.textField({
      label: 'Blur strength (1–10)',
      type: 'number',
      value: this.#settings.media.blurPixels,
    });
    commitOnChange(blur.input, (value) =>
      this.#commit((next) => (next.media.blurPixels = Number(value))),
    );
    const blurControlsActive =
      this.#settings.media.preset === 'sfw' && this.#settings.media.mode === 'blur';
    if (blurControlsActive) {
      media.append(blur.element);
      for (const [key, label] of [
        ['blurAvatars', 'Blur avatars in SFW'],
        ['blurVideos', 'Blur videos in SFW'],
      ]) {
        media.append(
          this.#controls.toggle({
            checked: this.#settings.media[key],
            label,
            onChange: (value) => this.#commit((next) => (next.media[key] = value)),
          }).element,
        );
      }
    } else {
      const mediaStatus = this.#document.createElement('p');
      mediaStatus.setAttribute('role', 'status');
      mediaStatus.textContent =
        'Media follows the active Browse preset. Choose SFW or Minimal to configure blur.';
      media.append(mediaStatus);
    }

    const seen = section(
      this.#document,
      'Seen',
      'seen',
      'Seen state is local to this account. Indicators remain available on every supported profile-card route.',
    );
    const seenControls = this.#document.createElement('div');
    seenControls.className = 'flt-inline-setting-row';
    seenControls.append(
      this.#controls.toggle({
        checked: this.#settings.seen.showChip,
        label: 'Indicators',
        description: 'Show Seen indicators on supported profile cards.',
        onChange: (value) => this.#commit((next) => (next.seen.showChip = value)),
      }).element,
      select(this.#document, {
        label: 'Seen display',
        onChange: (value) => this.#commit((next) => (next.seen.presentation = value)),
        options: [
          ['normal', 'Normal'],
          ['dim', 'Dim'],
          ['hide', 'Hide'],
        ],
        value: this.#settings.seen.presentation,
      }),
      this.#controls.button({
        label: 'Reset',
        onClick: () => this.#onResetSeen?.(),
        variant: 'danger',
      }),
    );
    seen.append(seenControls);

    const softBlock = section(
      this.#document,
      'Soft Block',
      'soft-block',
      'Use contextual profile actions to add or remove a Soft Block.',
    );
    const softBlockControls = this.#document.createElement('div');
    softBlockControls.className = 'flt-inline-setting-row';
    softBlockControls.append(
      this.#controls.button({
        label: 'Manage Soft Blocks',
        description:
          'Search locally known people or enter a numeric profile ID to add a local Soft Block. Review and remove existing blocks here.',
        onClick: () => this.#onManageSoftBlocks?.(),
      }),
      select(this.#document, {
        label: 'Soft-blocked profiles',
        onChange: (value) => this.#commit((next) => (next.softBlock.presentation = value)),
        options: [
          ['hide', 'Hide'],
          ['dim', 'Dim'],
        ],
        value: this.#settings.softBlock.presentation,
      }),
    );
    softBlock.append(softBlockControls);

    const infinite = section(this.#document, 'Infinite Scroll', 'infinite-scroll');
    const pageLimit = this.#controls.textField({
      label: 'Maximum additional pages (1–20)',
      type: 'number',
      value: this.#settings.infiniteScroll.pageLimit,
    });
    commitOnChange(pageLimit.input, (value) =>
      this.#commit((next) => (next.infiniteScroll.pageLimit = Number(value))),
    );
    infinite.append(
      this.#controls.toggle({
        checked: this.#settings.infiniteScroll.enabled,
        label: 'Auto Page Load',
        onChange: (value) => this.#commit((next) => (next.infiniteScroll.enabled = value)),
      }).element,
      pageLimit.element,
    );
    const infiniteSession = this.#document.createElement('div');
    infiniteSession.dataset.fltInfiniteSession = 'true';
    this.#renderInfiniteState(infiniteSession);
    infinite.append(infiniteSession);

    const enhancements = section(
      this.#document,
      'Page Enhancements',
      'page-enhancements',
      'Choose the small display and navigation improvements applied to supported FetLife pages.',
    );
    enhancements.classList.add('flt-control-grid');
    for (const [key, label, description] of PAGE_ENHANCEMENTS) {
      enhancements.append(
        this.#controls.toggle({
          checked: this.#settings.pageEnhancements[key],
          description,
          label,
          onChange: (value) => this.#commit((next) => (next.pageEnhancements[key] = value)),
        }).element,
      );
    }
    root.append(
      filters,
      media,
      seen,
      softBlock,
      infinite,
      enhancements,
      this.#recentlyVisitedSection(),
      ...this.#editionBrowseSections,
    );
  }

  #recentlyVisitedSection() {
    const history = section(
      this.#document,
      'Recently Visited',
      'recently-visited',
      'Review the last three profiles opened on this account. Mark unseen removes only the local visit marker.',
    );
    const results = this.#document.createElement('div');
    results.dataset.fltVisitHistoryResults = 'true';
    history.append(results);
    this.#visitHistoryRoot = results;
    this.#renderVisitHistoryList();
    return history;
  }

  #renderVisitHistoryList() {
    if (!this.#visitHistoryRoot) return;
    const matches = this.#visitHistory.slice(0, 3);
    const status = this.#document.createElement('p');
    status.className = 'flt-visit-history-status';
    status.setAttribute('role', 'status');
    status.textContent = `${matches.length} recent profile${matches.length === 1 ? '' : 's'}`;
    if (!matches.length) {
      const empty = this.#document.createElement('div');
      empty.className = 'flt-empty';
      empty.textContent = 'The last three profiles you open will appear here.';
      this.#visitHistoryRoot.replaceChildren(status, empty);
      return;
    }
    const list = this.#document.createElement('ul');
    list.className = 'flt-list flt-visit-history-list';
    for (const item of matches) {
      const row = this.#document.createElement('li');
      row.className = 'flt-list-item flt-visit-history-item';
      const details = this.#document.createElement('div');
      const name = this.#document.createElement('span');
      const safeUrl = canonicalizeFetLifeUrl(item.profileUrl);
      if (safeUrl) {
        const link = this.#document.createElement('a');
        link.href = safeUrl;
        link.textContent = item.displayName || `Profile ${item.personId}`;
        name.append(link);
      } else {
        name.textContent = item.displayName || `Profile ${item.personId}`;
      }
      const visited = this.#document.createElement('time');
      visited.className = 'flt-label';
      visited.dateTime = new Date(item.seenAt).toISOString();
      visited.textContent = new Date(item.seenAt).toLocaleString();
      details.append(name, visited);
      const remove = this.#controls.button({
        label: 'Mark unseen',
        description: `Remove the local visit marker for ${item.displayName || `profile ${item.personId}`}.`,
        onClick: () => this.#onMarkUnseen?.(String(item.personId)),
      });
      row.append(details, remove);
      list.append(row);
    }
    this.#visitHistoryRoot.replaceChildren(status, list);
  }

  #renderFilterImpact(container) {
    const impact = this.#filterImpact;
    const reasons = Object.entries(impact.reasons ?? {})
      .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
      .map(([reason, count]) => `${reason.replace(/^FILTER_/, '').toLocaleLowerCase()}: ${count}`)
      .join(' · ');
    const summary = this.#document.createElement('p');
    summary.setAttribute('role', 'status');
    summary.textContent = `${impact.visible} visible · ${impact.dimmed} dimmed · ${impact.hidden} hidden${reasons ? ` · ${reasons}` : ''}`;
    const reveal = this.#controls.button({
      description: impact.revealed
        ? 'Restore normal filter hiding. Saved filters, Seen, Soft Block, and Pro Quiet state are unchanged.'
        : 'Reveal only filter-hidden profiles on this page without changing saved filters.',
      disabled: impact.filterHidden === 0 && !impact.revealed,
      label: impact.revealed
        ? 'Restore filter hiding'
        : 'Temporarily reveal filter-hidden profiles',
      onClick: () => this.#onFilterReveal?.(!impact.revealed),
    });
    container.replaceChildren(summary, reveal);
  }

  #renderInfiniteState(container) {
    const state = this.#infiniteState;
    const summary = this.#document.createElement('p');
    summary.setAttribute('role', 'status');
    const unit = this.#loadingMode === 'profile' ? 'profile pages' : 'pages';
    summary.textContent = `${state.loadedPages} of ${state.limit ?? this.#settings.infiniteScroll.pageLimit} additional ${unit} · ${state.loadedItems} items · ${state.loading ? 'loading' : state.paused ? 'paused' : state.status.toLocaleLowerCase()}`;
    const countdown = this.#document.createElement('span');
    countdown.dataset.fltPauseCountdown = '';
    if (state.paused && state.pauseRemainingSeconds != null)
      countdown.textContent =
        'Resumes in ' +
        Math.floor(state.pauseRemainingSeconds / 60) +
        ':' +
        String(state.pauseRemainingSeconds % 60).padStart(2, '0');
    const duration = select(this.#document, {
      label: 'Pause auto-loading for',
      value: '',
      options: [
        ['', 'Choose duration'],
        ['5', '5 minutes'],
        ['15', '15 minutes'],
        ['30', '30 minutes'],
        ['60', '1 hour'],
      ],
      onChange: (value) => {
        if (value) this.#onInfiniteControl?.pause(Number(value));
      },
    });
    duration.querySelector('select').disabled = !state.enabled;
    const pause = this.#controls.button({
      disabled: !state.enabled,
      label: state.paused ? 'Resume this scroll session' : 'Pause this scroll session',
      onClick: () =>
        state.paused ? this.#onInfiniteControl?.resume() : this.#onInfiniteControl?.pause(),
    });
    const retry = this.#controls.button({
      disabled: state.status !== 'FAILED',
      label: 'Retry failed page',
      onClick: () => this.#onInfiniteControl?.retry(),
    });
    container.replaceChildren(summary, countdown, duration, fieldRow(this.#document, pause, retry));
  }

  #renderSettings(root) {
    const appearance = section(this.#document, 'Appearance and accessibility', 'appearance');
    appearance.classList.add('flt-appearance-settings');
    for (const [key, label] of [
      ['compact', 'Compact layout'],
      ['highContrast', 'High contrast'],
    ]) {
      if (this.#editionId === 'pro' && key !== 'notifications') continue;
      appearance.append(
        this.#controls.toggle({
          checked: this.#settings.ui[key],
          label,
          onChange: (value) => this.#commit((next) => (next.ui[key] = value)),
        }).element,
      );
    }
    this.#shortcutFooter = shortcutFooter(this.#document);
    const reset = section(this.#document, 'Diagnostics', 'diagnostics');
    reset.querySelector(':scope > .flt-basic-section-title')?.remove();
    reset.classList.add('flt-diagnostics-actions');
    reset.append(
      this.#controls.button({
        label: 'Reset Browse settings',
        onClick: () => this.#onResetSettings?.(),
        variant: 'danger',
      }),
    );
    root.append(appearance, ...this.#editionSettingsSections, reset);
  }
}
