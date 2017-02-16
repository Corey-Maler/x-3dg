import * as THREE from 'three';

export const X3dgCubeProto = Object.create(HTMLElement.prototype);

X3dgCubeProto.attachedCallback = function() {
    console.log('cube attached', this, this.parentElement);
    const parent = this.parentElement;
    const rotationX = parseInt(this.getAttribute('rotationX')) || 0;
    const material = new THREE.MeshBasicMaterial({
        color: 0x000000, shading: THREE.FlatShading, wireframe: true, transparent: true
    });
    const geometry = new THREE.CubeGeometry(1, 1, 1);
    this.mesh = new THREE.Mesh(geometry, material);

    parent.add(this.mesh);
}

X3dgCubeProto.attributeChangedCallback = function(attrName: string, oldValue: string, newValue: string) {
    if (attrName === 'rotationy') {
        this.mesh.rotation.y = parseFloat(newValue);
    }
}

export const X3dgCube = document.registerElement('x-3dg-cube', {prototype: X3dgCubeProto});