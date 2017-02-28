import * as THREE from 'three';
import { X3dgBase } from './base';
import * as Parser from './parsers';

export class X3dgMeshProto extends X3dgBase {
    static wathedStyles = {
        transform: Parser.Matrix,
    }

    construct() {
        this.mesh = new THREE.Mesh();
    }

    redraw(changed: {}) {
        if (changed.transform !== undefined) {
            this.mesh.matrix.fromArray(changed.transform);
        }
    }
}

export const X3dgMesh = document.registerElement('x-3dg-mesh', X3dgMeshProto);