/** Account-local people management; never invokes FetLife's native Block. */
export class SoftBlockManager {
  #capabilities;
  #document;
  #state;
  #refreshPage;
  #presentation;
  #active = false;

  constructor({ capabilities, document, state, refreshPage, presentation }) {
    this.#capabilities = capabilities;
    this.#document = document;
    this.#state = state;
    this.#refreshPage = refreshPage;
    this.#presentation = presentation;
  }

  async open() {
    if (this.#active) return;
    this.#active = true;
    const { ui, storage, events } = this.#capabilities;
    const abort = new globalThis.AbortController();
    let cancelled = false;
    let dialog;
    events?.on(
      'account:changed',
      () => {
        cancelled = true;
        dialog?.close(null);
      },
      { signal: abort.signal },
    );
    try {
      const content = this.#document.createElement('div');
      content.className = 'flt-soft-block-manager';
      const results = this.#document.createElement('div');
      const status = this.#document.createElement('p');
      status.setAttribute('role', 'status');
      let query = '';
      let blockedOnly = false;
      let revision = 0;
      const refresh = async () => {
        const current = ++revision;
        const records = await storage.list('people');
        if (cancelled || current !== revision) return;
        const people = records.map(({ value }) => value);
        const blocked = people.filter((person) => person.basic?.softBlock);
        const needle = query.trim().toLocaleLowerCase();
        let matches = (blockedOnly ? blocked : people).filter(
          (person) =>
            (!needle && blockedOnly) ||
            (needle &&
              `${person.displayName ?? ''} ${person.personId}`
                .toLocaleLowerCase()
                .includes(needle)),
        );
        if (
          !blockedOnly &&
          /^\d+$/.test(needle) &&
          !matches.some((person) => person.personId === needle)
        ) {
          matches = [{ personId: needle }, ...matches];
        }
        status.textContent = `${blocked.length} soft-blocked · ${matches.length} matches`;
        results.replaceChildren(
          ui.controls.list({
            items: matches.slice(0, 25),
            emptyMessage: blockedOnly
              ? 'No matching Soft Blocks.'
              : 'Search a local name or enter a numeric profile ID.',
            renderItem: (person) => {
              const row = this.#document.createElement('div');
              row.className = 'flt-soft-block-person';
              const label = this.#document.createElement('span');
              label.textContent = person.displayName || `Profile ${person.personId}`;
              const blocked = Boolean(person.basic?.softBlock);
              row.append(
                label,
                ui.controls.button({
                  label: blocked ? 'Remove Soft Block' : 'Soft Block',
                  onClick: () => dialog.close({ person, remove: blocked }),
                }),
              );
              return row;
            },
          }),
        );
      };
      const search = ui.controls.search({
        label: 'Find people to Soft Block',
        placeholder: 'Local name or numeric profile ID',
        description:
          'Choose a matching local person or enter their numeric FetLife profile ID. This never blocks anyone on FetLife itself.',
        onInput: (value) => {
          query = value;
          void refresh().catch(fail);
        },
      });
      const fail = () => {
        status.textContent = 'Could not load people for this account.';
      };
      content.append(
        search.element,
        ui.controls.toggle({
          label: 'Show existing Soft Blocks',
          description:
            'List only people already soft-blocked for this account. Search narrows the list.',
          onChange: (value) => {
            blockedOnly = value;
            void refresh().catch(fail);
          },
        }).element,
        status,
        results,
      );
      dialog = ui.dialogs.open({
        title: 'Manage Soft Blocks',
        content,
        actions: [{ label: 'Close', value: null }],
      });
      search.input.focus();
      void refresh().catch(fail);
      const action = await dialog.result;
      if (!action || cancelled) return;
      const { person, remove } = action;
      if (remove) {
        await this.#state.removeSoftBlock(person.personId);
      } else {
        const reason = ui.controls.textField({
          label: 'Local reason (optional)',
          description: 'Stored only in this account’s local FL Tools data.',
        });
        reason.input.maxLength = 240;
        dialog = ui.dialogs.open({
          title: `Soft Block ${person.displayName || `profile ${person.personId}`}?`,
          description: 'This changes local presentation only. It does not block anyone on FetLife.',
          content: reason.element,
          actions: [
            { label: 'Cancel', value: false, autofocus: true },
            { label: 'Soft Block', value: true, variant: 'danger' },
          ],
        });
        if (!(await dialog.result) || cancelled) return;
        await this.#state.setSoftBlock({
          personId: person.personId,
          displayName: person.displayName,
          reason: reason.input.value,
          presentation: this.#presentation(),
        });
      }
      if (!cancelled) {
        await this.#refreshPage();
        ui.announcer.announce(remove ? 'Soft Block removed.' : 'Local Soft Block added.');
      }
    } catch (error) {
      this.#capabilities.diagnostics?.record({
        category: 'FEATURE',
        code: 'SOFT_BLOCK_MANAGER_FAILED',
        error,
        message: 'Soft Block management failed.',
        severity: 'WARN',
      });
      ui.announcer.announce('The Soft Block change could not be completed.', {
        priority: 'assertive',
      });
    } finally {
      cancelled = true;
      dialog?.close(null);
      abort.abort();
      this.#active = false;
    }
  }
}
