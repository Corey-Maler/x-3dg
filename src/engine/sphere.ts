import * as THREE from 'three';
import { X3dgBase } from './base';
import * as Parser from './parsers';

export class X3dgSphereClass extends X3dgBase {
    static watchedStyles = {
        color: Parser.Color,
        transform: Parser.Matrix,
    }

    construct() {
        this.material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            shading: THREE.FlatShading,
            wireframe: true,
            transparent: true,
        })
        this.geometry = new THREE.IcosahedronGeometry(0.5, 2);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

    redraw(changed: {}) {
        if (changed.color !== undefined) {
            this.material.color.setHex(changed.color);
        }

        if (changed.transform !== undefined) {
            this.mesh.matrix.fromArray(changed.transform);
        }
    }
}

export const X3dgSphere = document.registerElement('x-3dg-sphere', X3dgSphereClass);