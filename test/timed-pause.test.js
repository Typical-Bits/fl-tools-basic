import assert from 'node:assert/strict';
import test from 'node:test';
import { InfiniteScrollController } from '../src/infinite-scroll.js';

test('timed pause blocks loading, expires and cancels cleanly on reset or early resume', async () => {
  let now = 1000,
    tick,
    cancelled = 0,
    requests = 0;
  const controller = new InfiniteScrollController({
    clock: () => now,
    setInterval: (fn) => {
      tick = fn;
      return 1;
    },
    clearInterval: () => {
      cancelled++;
      tick = undefined;
    },
    fetchPage: async () => {
      requests++;
      return { items: [], nextUrl: null };
    },
    append: async () => {},
  });
  controller.configure({ enabled: true, pageLimit: 5 });
  controller.setNext('/next');
  controller.pause(5);
  assert.equal(controller.state.pauseRemainingSeconds, 300);
  assert.equal((await controller.requestNext()).status, 'PAUSED');
  assert.equal(requests, 0);
  now += 299000;
  tick();
  assert.equal(controller.state.pauseRemainingSeconds, 1);
  now += 1000;
  tick();
  assert.equal(controller.state.paused, false);
  assert.equal(tick, undefined);
  await controller.requestNext();
  assert.equal(requests, 1);
  controller.pause(15);
  controller.resume();
  assert.equal(tick, undefined);
  controller.pause(30);
  controller.reset();
  assert.equal(tick, undefined);
  controller.pause();
  assert.equal(controller.state.pauseRemainingSeconds, null);
  controller.resume();
  assert.equal(cancelled, 3);
});
