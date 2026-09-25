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
      for (const time of this.#document.querySelectorAll('time[datetime], [datetime]')) {
        const raw = time.getAttribute('datetime');
        const parsed = Date.parse(raw ?? '');
        if (!Number.isFinite(parsed)) continue;
        time.dataset.fltBasicPreviousText = time.textContent ?? '';
        time.textContent = new Date(parsed).toLocaleString();
        time.dataset.fltBasicExactTime = 'true';
        time.classList.add('flt-basic-exact-time');
        this.#owned.add(time);
      }
    }
    if (hideBanners) {
      for (const banner of this.#document.querySelectorAll(
        '[data-flt-banner], [data-controller~="ad-recovery"], [data-controller~="push-notifications-banner"], [data-controller~="pwa-install--prompt"], [data-pwa-install-cta]',
      )) {
        banner.dataset.fltBasicPreviousHidden = String(banner.hidden);
        banner.hidden = true;
        this.#owned.add(banner);
      }
    }
    if (visitedLinks) {
      for (const link of this.#document.querySelectorAll(
        'a[data-flt-person-id], a[href^="/"], a[href^="https://fetlife.com/"]',
      )) {
        if (link.closest('.flt-root')) continue;
        const personId =
          link.dataset.fltPersonId ?? link.getAttribute('href')?.match(/\/users\/(\d+)/)?.[1];
        const path = link.getAttribute('href')?.replace(/^https:\/\/fetlife\.com/i, '') ?? '';
        const nickname = path.match(/^\/([^/?#]+)(?:[/?#]|$)/)?.[1]?.toLocaleLowerCase();
        if (
          (personId && context.seenIds?.has(personId)) ||
          (nickname && context.seenNames?.has(nickname))
        ) {
          link.classList.add('flt-basic-visited');
          this.#owned.add(link);
        }
      }
    }
    if (sharedInterests) {
      for (const link of this.#document.querySelectorAll(
        '[data-flt-interest], a[href*="/fetishes/"]',
      )) {
        if (link.closest('.flt-root')) continue;
        const interest = String(link.dataset.fltInterest ?? link.textContent ?? '')
          .replace(/\s+/g, ' ')
          .trim()
          .toLocaleLowerCase();
        if (interest && context.interests?.has(interest)) {
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
      } else if (node.dataset.fltBasicExactTime === 'true') {
        node.textContent = node.dataset.fltBasicPreviousText ?? '';
        delete node.dataset.fltBasicPreviousText;
        delete node.dataset.fltBasicExactTime;
        node.classList.remove('flt-basic-exact-time');
      } else if (node.dataset.fltBasicOwned === 'true') node.remove();
      else node.classList.remove('flt-basic-visited', 'flt-basic-shared-interest');
    }
    this.#owned.clear();
  }
}
