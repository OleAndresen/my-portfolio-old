import * as THREE from "three";
import Experience from "../Experience";

export default class Room{
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

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
            if(child.name === "Cube") {
                //child.scale.set(.5, .5, .5);
                child.position.set(0, .5, 0);
                child.rotation.y = Math.PI / 4;
            }
            if(child.name === "IntroTrain") {
                //child.scale.set(.5, .5, .5);
                child.position.set(0, 0.9, 0);
                //child.rotation.y = Math.PI / 4;
            }
            if(child.name === "Lamp") {
                child.userData.interactable = true;
            }
            if(child.name === "CatMain") {
                child.userData.interactable = true;
            }
            if(child.name === "Mail") {
                child.userData.interactable = true;
            }
            if(child.name === "TrainClock") {
                child.userData.interactable = true;
            } 
            if(child.name === "Signpost") {
                child.userData.interactable = true;
            }
            if(child.name === "Door") {
                child.userData.interactable = true;
            }   
            this.roomChildren[child.name.toLowerCase()] = child;
        });

        const pointLight = new THREE.PointLight( 0xf0b27a, .9, 2.5 );
        pointLight.position.set(-1.5, 3.2, 4.5);
        pointLight.intensity = 0;
        this.actualRoom.add( pointLight );
        this.roomChildren["pointLight"] = pointLight;

        const pointLight2 = new THREE.PointLight( 0xf0b27a, .1, 1 );
        pointLight2.position.set(-5.67, 4.22341, -6.56);
        pointLight2.intensity = 0;
        this.actualRoom.add( pointLight2 );
        this.roomChildren["pointLight2"] = pointLight2;

        const spotLight = new THREE.SpotLight( 0xf0b27a, .5, 1.3 );
        spotLight.position.set(-4.67, 3.22341, -4.76);
        spotLight.angle = Math.PI / 2;
        spotLight.intensity = 0;
        this.actualRoom.add( spotLight );
        this.roomChildren["spotLight"] = spotLight;

        const targetObject = new THREE.Object3D();
        targetObject.position.set(-2, -5, -1);
        this.scene.add(targetObject);
        spotLight.target = targetObject;

        const spotLight2 = new THREE.SpotLight( 0xf0b27a, .5, 1.3 );
        spotLight2.position.set(2.1, 3, -7.4);
        spotLight2.angle = Math.PI / 2;
        spotLight2.intensity = 0;
        this.actualRoom.add( spotLight2 );
        this.roomChildren["spotLight2"] = spotLight2;

        const targetObject2 = new THREE.Object3D();
        targetObject2.position.set(2, -5, 0);
        this.scene.add(targetObject2);
        spotLight2.target = targetObject2;

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.25, 0.25, 0.25);
    }

    resize() {

    }

    update(){

    }
}