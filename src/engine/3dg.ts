import * as THREE from 'three';


export const X3dgProto = Object.create(HTMLElement.prototype);

// register component
X3dgProto.createdCallback = function () {
    console.log('created', this);
}

X3dgProto.add = function(obj: THREE.Mesh) {
    this.scene.add(obj);
}

X3dgProto.attachedCallback = function () {
    console.log('attached', this);
    const width: number = parseInt(this.getAttribute('width'));
    const height: number = parseInt(this.getAttribute('height'));
    const container = this;
    let camera, scene, renderer;

    let mesh, group1, group2, group3, light;

    let mouseX = 0, mouseY = 0;

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    }



    const init = () => {
        camera = new THREE.PerspectiveCamera(20, width / height, 0.1, 100);
        camera.position.z = 5;

        scene = new THREE.Scene();
        this.scene = scene;

        
				scene.add( new THREE.AmbientLight( 0xcccccc ) );
				const pointLight = new THREE.PointLight( 0xff4400, 5, 30 );
				pointLight.position.set( 5, 0, 0 );
				scene.add( pointLight );


        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(0xffffff);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        //
        window.addEventListener('resize', onWindowResize, false);
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }
    function render() {
        renderer.render(scene, camera);
    }

    init();
    animate();
}

X3dgProto.detachedCallback = function () {
    console.log('detached');
}

X3dgProto.attributeChangedCallback = function (attrName: any, oldValue: any, newValue: any) {
    console.log('attribute changes', attrName, oldValue, newValue);
}

export const X3dg = document.registerElement('x-3dg', {prototype: X3dgProto});