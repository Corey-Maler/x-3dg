import * as THREE from 'three';
import { X3dgBase } from './base';

import * as Parser from './parsers';

export class X3dgCubeClass extends X3dgBase {
    static watchedStyles = {
        color: Parser.Color,
        transform: Parser.Matrix,
    };
    construct() {
        const parent = this.parentElement;
        const material = new THREE.MeshBasicMaterial({
            color: 0x000000, shading: THREE.FlatShading, wireframe: true, transparent: true
        });
        this.material = material;
        const geometry = new THREE.CubeGeometry(1, 1, 1);
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.matrixAutoUpdate = false;
        this.geometry = geometry;
    }

    redraw(changed: {}) {
        if (changed.color !== undefined) {
            this.material.color.setHex(changed.color);
        }

        if (changed.transform !== undefined) {
            this.mesh.matrix.fromArray(changed.transform);
        }
    }


    attributeChangedCallback(attrName, oldValue, newValue) {
        console.log('atr changed >', attrName, oldValue, newValue);
    }
}

export const X3dgCube = document.registerElement('x-3dg-cube', X3dgCubeClass);