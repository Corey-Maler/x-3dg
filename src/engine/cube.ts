import * as THREE from 'three';

export const X3dgCubeProto = Object.create(HTMLElement.prototype);


function parseColor(str: string):number {
    const reg = /rgb\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)/;
    const [_, r, g, b] = str.match(reg);
    return (parseInt(r, 0) << 8 << 8) + (parseInt(g, 0) << 8) + parseInt(b, 0);
}

X3dgCubeProto.attachedCallback = function() {
    console.log('cube attached', this, this.parentElement);
    const parent = this.parentElement;
    const style = window.getComputedStyle(this);
    const color = parseColor(style.color) || 0x000000;
    console.log(color);
    const rotationX = parseInt(this.getAttribute('rotationX')) || 0;
    const material = new THREE.MeshBasicMaterial({
        color, shading: THREE.FlatShading, wireframe: true, transparent: true
    });
    this.material = material;
    const geometry = new THREE.CubeGeometry(1, 1, 1);
    this.mesh = new THREE.Mesh(geometry, material);

    parent.add(this.mesh);
    // window.getComputedStyle(cube).getPropertyValue('--custom')

    const self = this;

    const redraw = () => {
        const style = window.getComputedStyle(self);
        self.material.color.setHex(parseColor(style.color));
        //console.log(style.color);
        window.requestAnimationFrame(redraw);
    }

    redraw();
}

X3dgCubeProto.attributeChangedCallback = function(attrName: string, oldValue: string, newValue: string) {
    if (attrName === 'rotationy') {
        this.mesh.rotation.y = parseFloat(newValue);
    }
}

export const X3dgCube = document.registerElement('x-3dg-cube', {prototype: X3dgCubeProto});