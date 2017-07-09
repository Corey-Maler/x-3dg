import * as THREE from 'three';
import { X3dgBase } from './base';

import * as Parser from './parsers';

export class X3dgCubeClass extends X3dgBase {
    static watchedStyles = {
        color: Parser.Color,
    };
    construct() {
        this.material = new THREE.MeshBasicMaterial({
            color: 0xdddddd
        });

        console.log('material created');
    }

    redraw(changed: {}) {
       //console.log('> changed mesh color', changed.color);
       if (changed.color) {
            this.material.color.set(changed.color);
       }
    }


    attributeChangedCallback(attrName, oldValue, newValue) {
        console.log('atr changed >', attrName, oldValue, newValue);
    }
}

export const X3dgCube = document.registerElement('x-3dg-material', X3dgCubeClass);

//changed mesh color 16711680