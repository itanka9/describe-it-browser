import assert from "assert";
import { afterAll, afterEach, beforeAll, beforeEach, describe, it, resetRoot } from "../src";
import { runAll } from "../src/runner";

const sequence = []

const expectedSequence = [
    'global beforeAll',   'global beforeEach',
    'root beforeAll',     'root beforeEach',
    'subroot beforeAll',  'subroot beforeEach',
    'case 1',             'subroot afterEach',
    'subroot beforeEach', 'case 2',
    'subroot afterEach',  'subroot afterAll',
    'root afterEach',     'root afterAll',
    'global afterEach',   'global afterAll'
];

export async function reversedLifecycleTest () {
    console.log('Lifecycle hook reversed sequence test');

    resetRoot();

    describe('root', () => {
        describe('subroot', () => {
            it('case 1', () => {
                sequence.push('case 1')
            })
    
            it('case 2', () => {
                sequence.push('case 2')
            })
    
            beforeAll(() => {
                sequence.push('subroot beforeAll')
            })
            
            beforeEach(() => {
                sequence.push('subroot beforeEach')
            })
        
            afterEach(() => {
                sequence.push('subroot afterEach')
            })
            
            afterAll(() => {
                sequence.push('subroot afterAll')
            })
        })
    
        beforeAll(() => {
            sequence.push('root beforeAll')
        })
        
        beforeEach(() => {
            sequence.push('root beforeEach')
        })
    
        afterEach(() => {
            sequence.push('root afterEach')
        })
        
        afterAll(() => {
            sequence.push('root afterAll')
        })
    
    });
    
    beforeAll(() => {
        sequence.push('global beforeAll')
    })
    
    beforeEach(() => {
        sequence.push('global beforeEach')
    })
    
    afterEach(() => {
        sequence.push('global afterEach')
    })
    
    afterAll(() => {
        sequence.push('global afterAll')
    })    

    await runAll();
    assert.deepStrictEqual(sequence, expectedSequence);
}
