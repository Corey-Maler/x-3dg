import * as THREE from 'three';
import { X3dgBase } from './base';
import * as Parser from './parsers';

export class X3dgModelProto extends X3dgBase {
    loader: THREE.JSONLoader;
    static watchedStyles = {
        transform: Parser.Matrix,
    }

    construct() {
        this.mesh = new THREE.Mesh();

        const attrs = this.attributes;
        const src = attrs.src.value;
        console.log('attrs in model', src);
        this.loader = new THREE.JSONLoader();
        this.loader.load(src, (geometry, materials) => {
            const faceMaterial = new THREE.MultiMaterial(materials);
            console.log('loaded');


            const mesh = new THREE.Mesh(geometry, faceMaterial);

            const scale = 0.0005;
            mesh.scale.set(scale, scale, scale);

            this.mesh.add(mesh);
        });
    }

    redraw(changed: {}) {
        if (changed.transform !== undefined) {
            this.mesh.matrix.fromArray(changed.transform);
        }
    }
}

export const X3dgModel = document.registerElement('x-3dg-model', X3dgModelProto);