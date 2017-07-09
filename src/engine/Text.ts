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

        image.data[i] = 255;
        image.data[i + 1] = 255;
        image.data[i + 2] = 255;
        image.data[i + 3] = Math.floor(x ^ y);
    }

    ctx.putImageData(image, 0, 0);

    return canvas;
}

export class X3dgCubeClass extends X3dgBase {
    static watchedStyles = {
        color: Parser.Color,
        transform: Parser.Matrix,
    };

    loadFont() {
        var loader = new THREE.FontLoader();
        loader.load('/static/optimer_regular.typeface.json', (response) => {
            console.log(
                'font loaded'
            )
            //font = response;
            //refreshText();
            this.createText(response);
        });
    }

    createText(font) {
        const textGeo = new THREE.TextGeometry('asfsaf', {
            font: font,
            size: 1,
            height: 0.01,
            curveSegments: 4,
            bevelThickness: 0.5,
            bevelSize: 0.02,
            bevelEnabled: true,
            //material: 0,
            //extrudeMaterial: 1
        });
        textGeo.computeBoundingBox();
        textGeo.computeVertexNormals();
        // "fix" side normals by removing z-component of normals for side faces
        // (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)
        /*
        if (!bevelEnabled) {
            var triangleAreaHeuristics = 0.1 * (height * size);
            for (var i = 0; i < textGeo.faces.length; i++) {
                var face = textGeo.faces[i];
                if (face.materialIndex == 1) {
                    for (var j = 0; j < face.vertexNormals.length; j++) {
                        face.vertexNormals[j].z = 0;
                        face.vertexNormals[j].normalize();
                    }
                    var va = textGeo.vertices[face.a];
                    var vb = textGeo.vertices[face.b];
                    var vc = textGeo.vertices[face.c];
                    var s = THREE.GeometryUtils.triangleArea(va, vb, vc);
                    if (s > triangleAreaHeuristics) {
                        for (var j = 0; j < face.vertexNormals.length; j++) {
                            face.vertexNormals[j].copy(face.normal);
                        }
                    }
                }
            }
        }
        */
        var centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
        const textMesh1 = new THREE.Mesh(textGeo, this.material);
        textMesh1.position.x = centerOffset;
        textMesh1.position.y = 0;
        textMesh1.position.z = -10;
        textMesh1.rotation.x = 0;
        textMesh1.rotation.y = Math.PI * 2;
        this.mesh.add(textMesh1);
    }

    construct() {
        const parent = this.parentElement;
        const texture = new THREE.Texture(genDevTexture());
        texture.needsUpdate = true;

        const material = new THREE.MeshLambertMaterial({
            map: texture, transparent: true
        });
        this.material = material;

        this.loadFont();
/*
        var text = "three.js",
            height = 20,
            size = 70,
            hover = 30,
            curveSegments = 4,
            bevelThickness = 2,
            bevelSize = 1.5,
            bevelSegments = 3,
            bevelEnabled = true,
            font = undefined,
            fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
            fontWeight = "bold"; // normal bold
        const mirror = true;


        var fontMap = {
            "optimer": 1,
        };

        var weightMap = {
            "regular": 0,
            "bold": 1
        };
        */

        const geometry = new THREE.CubeGeometry(1, 1, 1);

        const attrs = this.attributes;

        if (attrs.material) {
            const materialQuery = attrs.material.value;
            console.log('>> materail query', materialQuery);
            setTimeout(() => {
                const mat = document.querySelector(materialQuery);
                console.log('>> material element', mat, mat.material);
                this.mesh.material = mat.material;
            }, 0);
        }

        const radius = 3;


        this.mesh = new THREE.Mesh();
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

export const X3dgCube = document.registerElement('x-3dg-text', X3dgCubeClass);