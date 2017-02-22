import * as THREE from 'three';

function parseColor(str: string): number {
    const reg = /rgb\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)/;
    const [_, r, g, b] = str.match(reg);
    return (parseInt(r, 0) << 8 << 8) + (parseInt(g, 0) << 8) + parseInt(b, 0);
}

const reg2d = /matrix\((.*)\)/;

// "matrix3d(1, 0, 0, 0, 0, 0.866025, 0.5, 0, 0, -0.5, 0.866025, 0, 0, 0, 0, 1)"
function parseMatrinx(matrix: string) {
    const reg = /matrix3d\((.*)\)/;
    let _, args;
    if (reg.test(matrix)) {
        // 2d matix
        [_, args] = matrix.match(reg);
        console.log('3d matrix >>', args);
        return args.split(',').map(num => parseFloat(num));
    } else {
        [_, args] = matrix.match(reg2d);
        const [a, b, c, d, e, f] = args.split(',').map(num => parseFloat(num));
        const s = a === d ? a : 1;
        console.log('2d matrix', args);
        return [
            a, c, e, 0,
            b, d, f, 0,
            0, 0, s, 0,
            0, 0, 0, 1
        ]

    }
}

export class X3dgCubeClass extends HTMLElement {
    attachedCallback() {
        const parent = this.parentElement;
        const material = new THREE.MeshBasicMaterial({
            color: 0x000000, shading: THREE.FlatShading, wireframe: true, transparent: true
        });
        this.material = material;
        const geometry = new THREE.CubeGeometry(1, 1, 1);
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.matrixAutoUpdate = false;
        this.geometry = geometry;

        this.computeStyle();

        parent.add(this.mesh);
        // window.getComputedStyle(cube).getPropertyValue('--custom')

        const self = this;

        const redraw = () => {
            this.computeStyle();
            //window.requestAnimationFrame(redraw);
        }

        redraw();

    }

    computeStyle() {
        const style = window.getComputedStyle(this);
        const color = parseColor(style.color);
        const transform = style.transform;
        //console.log('transform', transform);
        if (color) this.material.color.setHex(color);
        if (transform) {
            const a = parseMatrinx(transform);
            console.log('transform', transform, a);
            this.mesh.matrix.fromArray(a);
        }
    }


    attributeChangedCallback(attrName, oldValue, newValue) {
        console.log('atr changed >', attrName, oldValue, newValue);
    }
}

export const X3dgCube = document.registerElement('x-3dg-cube', X3dgCubeClass);