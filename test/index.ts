import { lifecycleTest } from './lifecycle';
import { reversedLifecycleTest } from './lifecycleReversed';

(async function () {
    await lifecycleTest();
    await reversedLifecycleTest();
    console.log('PASSED')
})();