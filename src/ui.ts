import { getRoot } from '.';
import { Describe } from './types';

export function createUI () {
    makeUi(getRoot(), null);
}

async function makeUi(root: Describe, gui?: dat.GUI) {
    const dat = await import('dat.gui');

    if (!gui) {
        gui = new dat.GUI({
            name: root.name
        });
    }
    for (const child of root.children) {
        if (child.type === 'it') {
            const obj = {
                [child.name]: child.hook
            }
            gui.add(obj, child.name);
        }
        if (child.type === 'descibe') {
            const folder = gui.addFolder(child.name);
            makeUi(child, folder);
        }
    }
}