import { getRoot } from ".";
import { Describe, Hook, InvokeContext } from "./types";

export async function runAll () {
    const ctx = {
        results: []
    }
    await runDescribe(getRoot(), ctx);
    return ctx.results;
}

async function runDescribe(desc: Describe, ctx: InvokeContext) {
    invoke('beforeAll', desc?.beforeAll, ctx);
    for (const item of desc.children) {
        invoke('beforeEach', desc?.beforeEach, ctx);
        if (item.type === 'descibe') {
            runDescribe(item, ctx)
        } else if (item.type === 'it') {
            invoke(item.name, item.hook, ctx);
        }
        invoke('afterEach', desc?.afterEach, ctx);
    }
    invoke('afterAll', desc?.afterAll, ctx);
}

function invoke(name: string, fn: Hook, ctx: InvokeContext) {
    if (!fn) {
        return;
    }
    try {
        const result = fn();
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