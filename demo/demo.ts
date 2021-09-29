import { describe, it } from "../src";
import { runAll } from "../src/runner";
import { createUI } from "../src/ui";

describe('Foo', () => {
    describe('Bar', () => {
        it('case1', () => {
            console.log('Case 1')
        })
        it('case2', () => {
            console.log('Case 2')
        })
    })
})

describe('Zoo', () => {
    it('case 3', () => {
        console.log('case 3')
    })

    it('case with exception', () => {
        // @ts-ignore
        foo = bar;
    })
});

(window as any).runAll = runAll;

createUI();