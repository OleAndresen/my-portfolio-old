import * as THREE from "three";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera{
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.scene2 = this.experience.scene2;
        this.canvas = this.experience.canvas;

        this.createPerspektiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }

    createPerspektiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 1000);
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.z = 7;
        this.perspectiveCamera.position.y = 3.055;
    }

    createOrthographicCamera() {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -50,
            50
        );

        this.orthographicCamera.position.y = 3.055; //3.6
        this.orthographicCamera.position.z = 5;
        this.orthographicCamera.rotation.x = -Math.PI / 6;

        this.scene.add(this.orthographicCamera);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
        this.controls.enablePan = false;
        this.controls.maxPolarAngle = Math.PI / 2.6;
        //this.controls.minPolarAngle = Math.PI / 7;
        this.controls.minDistance = 4;
        this.controls.maxDistance = 10;
    }

    resize() {
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthographicCamera.lright = (this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthographicCamera.top = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update(){
        this.controls.update();
    }
}