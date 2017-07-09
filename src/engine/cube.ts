import * as THREE from 'three';
import { X3dgBase } from './base';

import * as Parser from './parsers';

const genDevTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;

    const ctx = canvas.getContext('2d');
    const image = ctx.getImageData(0, 0, 256, 256);

    let x = 0;
    let y = 0;

    for (let i = 0, j = 0, l = image.data.length; i < l; i += 4, j++) {
        x = j % 256;
        y = x == 0 ? y + 1 : y;

        image.data[ i ] = 255;
        image.data[ i + 1 ] = 255;
        image.data[ i + 2 ] = 255;
        image.data[ i + 3 ] = Math.floor( x ^ y);
    }

    ctx.putImageData(image, 0, 0);

    return canvas;
}

export class X3dgCubeClass extends X3dgBase {
    static watchedStyles = {
        color: Parser.Color,
        transform: Parser.Matrix,
    };
    construct() {
        const parent = this.parentElement;
        const texture = new THREE.Texture (genDevTexture());
        texture.needsUpdate = true;

        const material = new THREE.MeshLambertMaterial({
            map: texture, transparent: true
        });
        this.material = material;
        const geometry = new THREE.CubeGeometry(1, 1, 1);

        const attrs = this.attributes;
        const materialQuery = attrs.material.value;
 
        console.log('>> materail query', materialQuery);
        setTimeout(() => {
            const mat = document.querySelector(materialQuery);
            console.log('>> material element', mat, mat.material);
            this.mesh.material = mat.material;
        }, 0);

        const radius = 3;


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