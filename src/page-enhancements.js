export class PageEnhancements {
  #document;
  #owned = new Set();

  constructor({ document }) {
    if (!document?.createElement) throw new TypeError('Page enhancements require a document');
    this.#document = document;
  }

  apply(
    { exactTimestamps, hideBanners, pictureNavigation, sharedInterests, visitedLinks },
    context = {},
  ) {
    this.clear();
    if (exactTimestamps) {
      for (const time of this.#document.querySelectorAll('time[datetime]')) {
        if (!time.dateTime) continue;
        const label = this.#document.createElement('span');
        label.className = 'flt-basic-exact-time';
        label.dataset.fltBasicOwned = 'true';
        label.textContent = new Date(time.dateTime).toLocaleString();
        time.after(label);
        this.#owned.add(label);
      }
    }
    if (hideBanners) {
      for (const banner of this.#document.querySelectorAll(
        '[data-flt-banner], [data-controller="push-notifications-banner"], [data-controller="pwa-install--prompt"], [data-pwa-install-cta]',
      )) {
        banner.dataset.fltBasicPreviousHidden = String(banner.hidden);
        banner.hidden = true;
        this.#owned.add(banner);
      }
    }
    if (visitedLinks) {
      for (const link of this.#document.querySelectorAll(
        'a[data-flt-person-id], a[href*="/users/"]',
      )) {
        const personId =
          link.dataset.fltPersonId ?? link.getAttribute('href')?.match(/\/users\/(\d+)/)?.[1];
        if (personId && context.seenIds?.has(personId)) {
          link.classList.add('flt-basic-visited');
          this.#owned.add(link);
        }
      }
    }
    if (sharedInterests) {
      for (const link of this.#document.querySelectorAll('[data-flt-interest]')) {
        if (context.interests?.has(link.dataset.fltInterest)) {
          link.classList.add('flt-basic-shared-interest');
          this.#owned.add(link);
        }
      }
    }
    if (pictureNavigation && context.onPictureNavigate) {
      for (const image of this.#document.querySelectorAll('img[data-flt-picture-id]')) {
        const button = this.#document.createElement('button');
        button.className = 'flt-button flt-basic-picture-next';
        button.dataset.fltBasicOwned = 'true';
        button.type = 'button';
        button.textContent = 'Next picture';
        button.addEventListener('click', () =>
          context.onPictureNavigate(image.dataset.fltPictureId),
        );
        image.after(button);
        this.#owned.add(button);
      }
    }
  }

  clear() {
    for (const node of this.#owned) {
      if (node.dataset.fltBasicPreviousHidden !== undefined) {
        node.hidden = node.dataset.fltBasicPreviousHidden === 'true';
        delete node.dataset.fltBasicPreviousHidden;
      } else if (node.dataset.fltBasicOwned === 'true') node.remove();
      else node.classList.remove('flt-basic-visited', 'flt-basic-shared-interest');
    }
    this.#owned.clear();
  }
}
