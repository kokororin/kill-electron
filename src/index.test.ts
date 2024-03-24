import { assert, test } from 'vitest';
import { killElectron } from '.';

test('killElectron with no args', () => {
  assert.throws(() => killElectron());
});

test('killElectron with userModelId', () => {
  assert.doesNotThrow(() =>
    killElectron({
      userModelId: 'my-user-model-id'
    })
  );
  assert.doesNotThrow(() =>
    killElectron({
      userModelId: 'my-user-model-id',
      zombieOnly: true
    })
  );
});
