export function mediaRequest(media, kind = 'content') {
  if (!['avatar', 'content', 'video'].includes(kind)) throw new TypeError('Unknown media kind');
  let mode = media.mode;
  if (media.preset === 'nsfw') mode = 'show';
  if (media.preset === 'sfw' && kind === 'avatar' && !media.blurAvatars && mode === 'blur') {
    mode = 'show';
  }
  if (media.preset === 'sfw' && kind === 'video' && !media.blurVideos && mode === 'blur') {
    mode = 'show';
  }
  const state = mode === 'hide' ? 'HIDDEN' : mode === 'blur' ? 'BLURRED' : 'VISIBLE';
  return Object.freeze({
    blurPixels: media.blurPixels,
    requests: Object.freeze([{ reason: `basic-${kind}`, state }]),
  });
}

export function applyMediaPolicy(presentation, element, media, kind) {
  const decision = mediaRequest(media, kind);
  return presentation.applyMedia(element, decision.requests, {
    blurPixels: decision.blurPixels,
  });
}
