export type Hook = () => any | Promise<any>

export interface It {
    type: 'it',
    name: string,
    parent: Describe,
    hook: Hook,
}

export interface Describe {
    type: 'descibe',
    name: string,
    parent?: Describe,
    beforeAll?: Hook,
    beforeEach?: Hook,
    afterAll?: Hook,
    afterEach?: Hook,
    children: Array<It | Describe>
}

export interface InvokeContext {
    results: InvokeResult[]
}

type InvokeStatus = 'pass' | 'fail' | 'exception';

interface InvokeResult {
    name: string[],
    status: InvokeStatus,
    meta?: any
}