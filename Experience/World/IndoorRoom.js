import * as THREE from "three";
import Experience from "../Experience";

export default class IndoorRoom{
    constructor() {
        this.experience = new Experience();
        this.scene2 = this.experience.scene2;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.saloon;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1
        };

        this.setModel();
    }

    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
            if(child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }
           
            child.scale.set(0, 0, 0);

            this.roomChildren[child.name.toLowerCase()] = child;
        });

        const pointLight = new THREE.PointLight( 0xf0b27a, .4, 2.2 );
        pointLight.position.set(-2.6, 3, 2.6);
        pointLight.intensity = 0;
        this.actualRoom.add( pointLight );
        this.roomChildren["pointLight"] = pointLight;

        this.scene2.add(this.actualRoom);
        this.actualRoom.scale.set(0.30, 0.30, 0.30);   
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX - innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;     
        });
    }

    resize() {

    }

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.actualRoom.rotation.y = this.lerp.current;
    }

    resize() {

    }

    update(){

    }
}