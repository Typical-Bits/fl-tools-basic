function heading(document, text) {
  const node = document.createElement('h3');
  node.className = 'flt-basic-section-title';
  node.textContent = text;
  return node;
}

function section(document, title, id) {
  const node = document.createElement('section');
  node.className = 'flt-basic-section';
  node.dataset.fltBasicSection = id;
  node.append(heading(document, title));
  return node;
}

function select(document, { label, options, value, onChange }) {
  const field = document.createElement('label');
  field.className = 'flt-field';
  const text = document.createElement('span');
  text.className = 'flt-label';
  text.textContent = label;
  const input = document.createElement('select');
  input.className = 'flt-input';
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
  #editionLabel;
  #editionBrowseSections;
  #editionSettingsSections;
  #onResetSeen;
  #onResetSettings;
  #onSavePreset;
  #onSettings;
  #settings;
  #settingsRoot;
  #shell;
  #status = 'Ready';

  constructor({
    coreUI,
    document,
    onResetSeen,
    onResetSettings,
    onSavePreset,
    onSettings,
    settings,
    editionId = 'basic',
    editionBrowseSections = [],
    editionSettingsSections = [],
    editionViews = [],
    productName = 'FL Tools Basic',
    version = '3.0.0',
  }) {
    if (!coreUI?.createShell || !document?.createElement || typeof onSettings !== 'function') {
      throw new TypeError('Basic UI dependencies are required');
    }
    this.#controls = coreUI.controls;
    this.#document = document;
    this.#onResetSeen = onResetSeen;
    this.#onResetSettings = onResetSettings;
    this.#onSavePreset = onSavePreset;
    this.#onSettings = onSettings;
    this.#settings = settings;
    const browse = document.createElement('div');
    const system = document.createElement('div');
    const editionLabel = editionId === 'pro' ? 'Pro' : 'Basic';
    this.#editionLabel = editionLabel;
    this.#editionBrowseSections = editionBrowseSections;
    this.#editionSettingsSections = editionSettingsSections;
    this.#browseRoot = browse;
    this.#settingsRoot = system;
    const navigation = [{ content: browse, id: 'browse', label: 'Browse' }];
    if (editionId === 'pro') {
      const suppliedViews = new Map(editionViews.map((view) => [view.id, view]));
      for (const [id, label] of [
        ['people', 'People'],
        ['personalize', 'Personalize'],
      ]) {
        const supplied = suppliedViews.get(id);
        if (supplied?.content) navigation.push({ content: supplied.content, id, label });
        else {
          const placeholder = document.createElement('div');
          placeholder.className = 'flt-empty-state';
          placeholder.textContent = `${label} features begin in a later V3 phase.`;
          navigation.push({ content: placeholder, id, label });
        }
      }
    }
    navigation.push({ content: system, id: 'settings', label: 'Settings' });
    this.#shell = coreUI.createShell({
      headerItems: [editionLabel, settings.preset, 'Ready'],
      navigation,
      productId: editionId,
      productName,
      version,
    });
    this.#renderBrowse(browse);
    this.#renderSettings(system);
  }

  get shell() {
    return this.#shell;
  }

  setSettings(settings) {
    this.#settings = settings;
    this.#shell.setHeaderItems([this.#editionLabel, settings.preset, this.#status]);
    this.#browseRoot.replaceChildren();
    this.#settingsRoot.replaceChildren();
    this.#renderBrowse(this.#browseRoot);
    this.#renderSettings(this.#settingsRoot);
  }

  setStatus(status) {
    this.#status = String(status);
    this.#shell.setHeaderItems([this.#editionLabel, this.#settings.preset, this.#status]);
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

  #renderBrowse(root) {
    const presets = section(this.#document, 'Presets', 'presets');
    const presetActions = this.#document.createElement('div');
    presetActions.className = 'flt-basic-actions';
    for (const name of ['default', 'minimal', 'sfw']) {
      presetActions.append(
        this.#controls.button({
          label: name === 'sfw' ? 'SFW' : `${name[0].toUpperCase()}${name.slice(1)}`,
          onClick: () => this.#commit((next) => (next.preset = name)),
        }),
      );
    }
    presets.append(presetActions);
    const customPreset = this.#controls.textField({
      label: 'Custom preset name',
      placeholder: 'My Browse setup',
    });
    presets.append(
      customPreset.element,
      this.#controls.button({
        label: 'Save custom preset',
        onClick: () => this.#onSavePreset?.(customPreset.input.value),
      }),
    );
    for (const name of Object.keys(this.#settings.presets.custom)) {
      presets.append(
        this.#controls.button({
          label: `Apply ${name}`,
          onClick: () => this.#commit((next) => (next.preset = name)),
        }),
      );
    }

    const filters = section(this.#document, 'Filters', 'filters');
    const minimum = this.#controls.textField({
      label: 'Minimum age',
      type: 'number',
      value: this.#settings.filters.age.minimum ?? '',
    });
    const maximum = this.#controls.textField({
      label: 'Maximum age',
      type: 'number',
      value: this.#settings.filters.age.maximum ?? '',
    });
    const applyAges = this.#controls.button({
      label: 'Apply age range',
      onClick: () =>
        this.#commit((next) => {
          next.filters.age.minimum =
            minimum.input.value === '' ? null : Number(minimum.input.value);
          next.filters.age.maximum =
            maximum.input.value === '' ? null : Number(maximum.input.value);
        }),
      variant: 'primary',
    });
    filters.append(
      minimum.element,
      maximum.element,
      applyAges,
      select(this.#document, {
        label: 'Match criteria',
        onChange: (value) => this.#commit((next) => (next.filters.combine = value)),
        options: [
          ['and', 'Match all (AND)'],
          ['or', 'Match any (OR)'],
        ],
        value: this.#settings.filters.combine,
      }),
      select(this.#document, {
        label: 'Nonmatching profiles',
        onChange: (value) => this.#commit((next) => (next.filters.resultMode = value)),
        options: [
          ['hide', 'Hide'],
          ['dim', 'Dim'],
        ],
        value: this.#settings.filters.resultMode,
      }),
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
    ]) {
      const field = this.#controls.textField({
        label,
        placeholder: 'Comma-separated values',
        value: this.#settings.filters[key].join(', '),
      });
      filters.append(
        field.element,
        this.#controls.button({
          label: `Apply ${label.toLowerCase()}`,
          onClick: () =>
            this.#commit((next) => {
              next.filters[key] = [
                ...new Set(
                  field.input.value
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean),
                ),
              ];
            }),
        }),
      );
    }
    const scopes = this.#document.createElement('div');
    scopes.className = 'flt-basic-subsection';
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
      filters.append(toggle.element);
    }
    for (const [key, label] of [
      ['include', 'Include terms'],
      ['exclude', 'Exclude terms'],
      ['limit', 'Limit terms'],
    ]) {
      const field = this.#controls.textField({
        label,
        placeholder: 'Comma-separated terms',
        value: this.#settings.filters.terms[key].join(', '),
      });
      const save = this.#controls.button({
        label: `Save ${label.toLowerCase()}`,
        onClick: () =>
          this.#commit((next) => {
            const terms = field.input.value
              .split(',')
              .map((term) => term.trim())
              .filter(Boolean);
            next.filters.terms[key] = [...new Set(terms)];
            next.filters.terms.saved = [...new Set([...next.filters.terms.saved, ...terms])];
          }),
      });
      filters.append(field.element, save);
    }
    if (this.#settings.filters.terms.saved.length) {
      const saved = this.#document.createElement('div');
      saved.className = 'flt-basic-saved-terms';
      saved.append(heading(this.#document, 'Saved terms'));
      for (const term of this.#settings.filters.terms.saved) {
        const row = this.#document.createElement('div');
        row.className = 'flt-basic-saved-term';
        const label = this.#document.createElement('span');
        label.textContent = term;
        row.append(
          label,
          this.#controls.button({
            label: `Reuse ${term}`,
            onClick: () =>
              this.#commit((next) => {
                next.filters.terms.include = [...new Set([...next.filters.terms.include, term])];
              }),
          }),
          this.#controls.button({
            label: `Forget ${term}`,
            onClick: () =>
              this.#commit((next) => {
                next.filters.terms.saved = next.filters.terms.saved.filter((item) => item !== term);
              }),
          }),
        );
        saved.append(row);
      }
      filters.append(saved);
    }

    const media = section(this.#document, 'Media', 'media');
    const mediaPresets = this.#document.createElement('div');
    mediaPresets.className = 'flt-basic-actions';
    mediaPresets.append(
      this.#controls.button({
        label: 'SFW',
        onClick: () => this.#commit((next) => (next.media.preset = 'sfw')),
      }),
      this.#controls.button({
        label: 'NSFW',
        onClick: () => this.#commit((next) => (next.media.preset = 'nsfw')),
      }),
    );
    const blur = this.#controls.textField({
      label: 'Blur strength (1–10)',
      type: 'number',
      value: this.#settings.media.blurPixels,
    });
    media.append(
      mediaPresets,
      select(this.#document, {
        label: 'Media presentation',
        onChange: (value) => this.#commit((next) => (next.media.mode = value)),
        options: [
          ['show', 'Show'],
          ['blur', 'Blur'],
          ['hide', 'Hide'],
        ],
        value: this.#settings.media.mode,
      }),
      blur.element,
      this.#controls.button({
        label: 'Apply blur strength',
        onClick: () => this.#commit((next) => (next.media.blurPixels = Number(blur.input.value))),
      }),
    );
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

    const seen = section(this.#document, 'Seen', 'seen');
    seen.append(
      select(this.#document, {
        label: 'Seen profile presentation',
        onChange: (value) => this.#commit((next) => (next.seen.presentation = value)),
        options: [
          ['normal', 'Normal'],
          ['dim', 'Dim'],
          ['hide', 'Hide'],
        ],
        value: this.#settings.seen.presentation,
      }),
      this.#controls.toggle({
        checked: this.#settings.seen.showChip,
        label: 'Show Seen indicators',
        onChange: (value) => this.#commit((next) => (next.seen.showChip = value)),
      }).element,
      this.#controls.button({
        label: 'Reset Seen',
        onClick: () => this.#onResetSeen?.(),
        variant: 'danger',
      }),
    );

    const softBlock = section(this.#document, 'Soft Block', 'soft-block');
    softBlock.append(
      select(this.#document, {
        label: 'Soft-blocked profiles',
        onChange: (value) => this.#commit((next) => (next.softBlock.presentation = value)),
        options: [
          ['hide', 'Hide'],
          ['dim', 'Dim'],
        ],
        value: this.#settings.softBlock.presentation,
      }),
      this.#document.createTextNode(
        'Use contextual profile actions to add or remove a Soft Block.',
      ),
    );

    const infinite = section(this.#document, 'Infinite Scroll', 'infinite-scroll');
    const pageLimit = this.#controls.textField({
      label: 'Maximum additional pages (1–20)',
      type: 'number',
      value: this.#settings.infiniteScroll.pageLimit,
    });
    infinite.append(
      this.#controls.toggle({
        checked: this.#settings.infiniteScroll.enabled,
        label: 'Load the next page automatically',
        onChange: (value) => this.#commit((next) => (next.infiniteScroll.enabled = value)),
      }).element,
      pageLimit.element,
      this.#controls.button({
        label: 'Apply page limit',
        onClick: () =>
          this.#commit((next) => (next.infiniteScroll.pageLimit = Number(pageLimit.input.value))),
      }),
    );

    const enhancements = section(this.#document, 'Page Enhancements', 'page-enhancements');
    for (const [key, label] of [
      ['visitedLinks', 'Visited profile styling'],
      ['exactTimestamps', 'Exact timestamps'],
      ['sharedInterests', 'Shared interests'],
      ['hideBanners', 'Hide banners'],
      ['pictureNavigation', 'Picture navigation'],
    ]) {
      enhancements.append(
        this.#controls.toggle({
          checked: this.#settings.pageEnhancements[key],
          label,
          onChange: (value) => this.#commit((next) => (next.pageEnhancements[key] = value)),
        }).element,
      );
    }
    root.append(
      presets,
      filters,
      media,
      seen,
      softBlock,
      infinite,
      enhancements,
      ...this.#editionBrowseSections,
    );
  }

  #renderSettings(root) {
    const appearance = section(this.#document, 'Appearance and accessibility', 'appearance');
    for (const [key, label] of [
      ['compact', 'Compact layout'],
      ['highContrast', 'High contrast'],
      ['notifications', 'Update and system notifications'],
    ]) {
      appearance.append(
        this.#controls.toggle({
          checked: this.#settings.ui[key],
          label,
          onChange: (value) => this.#commit((next) => (next.ui[key] = value)),
        }).element,
      );
    }
    appearance.append(
      select(this.#document, {
        label: 'Launcher side',
        onChange: (value) => this.#commit((next) => (next.ui.dock = value)),
        options: [
          ['right', 'Right'],
          ['left', 'Left'],
        ],
        value: this.#settings.ui.dock,
      }),
    );
    const shortcuts = section(this.#document, 'Fixed shortcuts', 'shortcuts');
    const list = this.#document.createElement('dl');
    for (const [action, key] of Object.entries(this.#settings.navigation.shortcuts)) {
      const term = this.#document.createElement('dt');
      term.textContent = action;
      const value = this.#document.createElement('dd');
      value.textContent = key;
      list.append(term, value);
    }
    shortcuts.append(list);
    const reset = section(this.#document, 'Reset', 'reset');
    reset.append(
      this.#controls.button({
        label: 'Reset Browse settings',
        onClick: () => this.#onResetSettings?.(),
        variant: 'danger',
      }),
    );
    root.append(appearance, shortcuts, ...this.#editionSettingsSections, reset);
  }
}
