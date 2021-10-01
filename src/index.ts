import { Describe, Hook } from "./types";

const stack: Describe[] = [];
let root: Describe;
let curr: Describe;
resetRoot();

export function getRoot () {
    return root;
}

export function resetRoot () {
    root = {
        type: 'describe',
        name: '',
        children: []
    }
    curr = root;
    stack.push(curr);
}

export function describe(name: string, fn: Hook) {
    curr = stack[stack.length - 1];
    const parent = curr ?? root;
    const newCurr: Describe = {
        type: 'describe',
        name,
        parent,
        children: []
    }
    parent.children.push(newCurr);
    curr = newCurr;
    stack.push(curr);
    fn();
    stack.pop();
    curr = stack[stack.length - 1];
}

export function it(name: string, hook: Hook) {
    curr.children.push({
        type: 'it',
        name,
        parent: curr,
        hook
    })
}

export function beforeAll(hook: Hook) {
    curr.beforeAll = hook
}

export function beforeEach(hook: Hook) {
    curr.beforeEach = hook
}
export function afterAll(hook: Hook) {
    curr.afterAll = hook
}

export function afterEach(hook: Hook) {
    curr.afterEach = hook
}