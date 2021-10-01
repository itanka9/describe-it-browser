import { getRoot } from "./index";
import { Describe, It, Hook, InvokeContext } from "./types";

export async function runAll () {
    const ctx = {
        results: []
    }
    await runDescribe(getRoot(), ctx);
    return ctx.results;
}

export async function runSingle(it: It) {
    const ctx = {
        results: []
    }
    const parents: Describe[] = [];
    let currParent = it.parent;
    while (currParent) {
        parents.unshift(currParent);
        currParent = currParent.parent;
    }
    for (const parent of parents) {
        await invoke('beforeAll', parent.beforeAll, ctx);
        await invoke('beforeEach', parent.beforeAll, ctx);
    }
    await invoke(it.name, it.hook, ctx);
    for (const parent of parents) {
        await invoke('afterEach', parent.afterEach, ctx);
        await invoke('afterAll', parent.afterAll, ctx);
    }

}

async function runDescribe(desc: Describe, ctx: InvokeContext) {
    await invoke('beforeAll', desc?.beforeAll, ctx);
    for (const item of desc.children) {
        await invoke('beforeEach', desc?.beforeEach, ctx);
        if (item.type === 'describe') {
            await runDescribe(item, ctx)
        } else if (item.type === 'it') {
            await invoke(item.name, item.hook, ctx);
        }
        await invoke('afterEach', desc?.afterEach, ctx);
    }
    await invoke('afterAll', desc?.afterAll, ctx);
}

async function invoke(name: string, fn: Hook, ctx: InvokeContext) {
    if (!fn) {
        return;
    }
    try {
        const result = await fn();
        ctx.results.push({
            name: [name],
            status: 'pass',
            meta: result
        })
    } catch (error) {
        ctx.results.push({
            name: [name],
            status: 'exception',
            meta: error
        })
    }
}