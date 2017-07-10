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
    this.style.position = 'relative';
    this.style.width = '500px';
    this.style.height = '500px';
    this.style.display = 'block';
    const container = this;
    let camera, renderer;
    let scene: THREE.Scene;

    let mesh, group1, group2, group3, light;

    let mouseX = 0, mouseY = 0;
    let originalMouse = new THREE.Vector2();

    const mouse = new THREE.Vector2();

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

    function onCanvasMouseMove(event) {
        const x = event.layerX;
        const y = event.layerY;
        mouse.x = (x / width) * 2 - 1;
        mouse.y = - ( y / height ) * 2 + 1;
        console.log('mouse > ', mouse.x, mouse.y);
        originalMouse.x = x;
        originalMouse.y = y;
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
        const canva = renderer.domElement;
        canva.style.position = 'absolute';
        container.appendChild(canva);
        container.addEventListener('mousemove', onCanvasMouseMove, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        //
        window.addEventListener('resize', onWindowResize, false);
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }
    function render() {
        // search intersections
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        
        const intersects = raycaster.intersectObjects(scene.children.filter(c => c.geometry));
        if (intersects.length > 0) {
            intersects.forEach(i => i.object.hover && i.object.hover(originalMouse));
        }
        
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