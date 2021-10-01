import * as dat from 'dat.gui';
import { getRoot } from './index';
import { runSingle } from './runner';
import { Describe } from './types';

export function createUI (gui?: dat.GUI) {
    makeUi(getRoot(), gui);
}

function makeUi(root: Describe, gui?: dat.GUI) {
    if (!gui) {
        gui = new dat.GUI({
            name: root.name
        });
    }
    for (const child of root.children) {
        if (child.type === 'it') {
            const obj = {
                [child.name]: () => runSingle(child)
            }
            gui.add(obj, child.name);
        }
        if (child.type === 'describe') {
            const folder = gui.addFolder(child.name);
            makeUi(child, folder);
        }
    }        
}