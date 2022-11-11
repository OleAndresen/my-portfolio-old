import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";

export default class Environment{
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.scene2 = this.experience.scene2;
        this.resources = this.experience.resources;

        this.setSunlight();
    }

    setSunlight() {
        this.sunlight = new THREE.DirectionalLight("#EAE7E4", 3);
        this.sunlight.castShadow = true;
        this.sunlight.shadow.camera.far = 20;
        this.sunlight.shadow.mapSize.set(2048, 2048);
        this.sunlight.shadow.normalBias = 0.05;
        this.sunlight.position.set(2, 7, 4);
        this.scene.add(this.sunlight);

        this.sunlight2 = new THREE.DirectionalLight("#EAE7E4", 3);
        this.sunlight2.castShadow = true;
        this.sunlight2.shadow.camera.far = 20;
        this.sunlight2.shadow.mapSize.set(2048, 2048);
        this.sunlight2.shadow.normalBias = 0.05;
        this.sunlight2.position.set(2, 7, 4);
        this.scene2.add(this.sunlight2);

        this.ambientLight = new THREE.AmbientLight("#EAE7E4", 1);
        this.scene.add(this.ambientLight);

        this.ambientLight2 = new THREE.AmbientLight("#EAE7E4", 1);
        this.scene2.add(this.ambientLight2);
    }

    switchTheme(theme) {
        if(theme.theme === "dark") {
            GSAP.to(this.sunlight.color, {
                r: 0.047058823529411764,
                g: 0.06274509803921569,
                b: 0.21176470588235294
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.047058823529411764,
                g: 0.06274509803921569,
                b: 0.21176470588235294
            });
            GSAP.to(this.sunlight2.color, {
                r: 0.047058823529411764,
                g: 0.06274509803921569,
                b: 0.21176470588235294
            });
            GSAP.to(this.ambientLight2.color, {
                r: 0.047058823529411764,
                g: 0.06274509803921569,
                b: 0.21176470588235294
            });
        }else {
            GSAP.to(this.sunlight.color, {
                r: 0.984313725490196,
                g: 0.8666666666666667,
                b: 0.7490196078431373
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.984313725490196,
                g: 0.8666666666666667,
                b: 0.7490196078431373
            });
            GSAP.to(this.sunlight2.color, {
                r: 0.984313725490196,
                g: 0.8666666666666667,
                b: 0.7490196078431373
            });
            GSAP.to(this.ambientLight2.color, {
                r: 0.984313725490196,
                g: 0.8666666666666667,
                b: 0.7490196078431373
            });
        }
    }

    resize() {

    }

    update(){
        
    }
}