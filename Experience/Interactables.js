import EventEmitter from "events";
import Experience from "./Experience";
import * as THREE from "three";
import GSAP from "gsap";


export default class Interactables extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.scene2 = this.experience.scene2;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.time = this.experience.time;
        this.world = this.experience.world;
        this.device = this.sizes.device;
        this.renderer = this.experience.renderer;
        this.theme = this.experience.theme;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.world.on("worldready", () => {
            this.setAssets();
            this.setAnimations();
        });

        window.addEventListener('click', event => {
            this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera.perspectiveCamera);
            const intersects = this.raycaster.intersectObjects(this.scene.children[6].children);

            if(intersects.length > 0 && intersects[0].object.parent.userData.name == "Lamp") {
                this.theme.switchTheme();
            }

            if(intersects.length > 0 && intersects[0].object.parent.userData.name == "Mail") {
                this.textbubble.createContactMe(this.roomChildren);
            }

            if(intersects.length > 0 && intersects[0].object.parent.userData.name == "Door") {
                this.switchScene.playIntro();
            }

            if(intersects.length > 0 && intersects[0].object.parent.userData.name == "Cat") {
                this.textbubble.createAboutMe(this.roomChildren); 
            }
            
            if(intersects.length > 0 && intersects[0].object.parent.userData.name == "TrainClock") {
                this.secondTimeline = new GSAP.timeline();
                this.secondTimeline.to(this.roomChildren.train.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "power3.out(2.5)",
                    duration: 1
                });
                this.trainclock.play();
            } 

        });

    }

    onMove(event) {
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      
        this.raycaster.setFromCamera(this.mouse, this.camera.perspectiveCamera);
        const intersects = this.raycaster.intersectObjects(this.scene.children[6].children);
        
        if((intersects.length > 0 && intersects[0].object.parent.userData.interactable) || (intersects.length > 0 && intersects[0].object.parent.parent.userData.interactable)) {
            document.body.style.cursor = 'pointer';
            
        }else {
            document.body.style.cursor = 'default';
        }
    }

    onMoveSaloon(event) {
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      
        this.raycaster.setFromCamera(this.mouse, this.camera.orthographicCamera);
        const intersects = this.raycaster.intersectObjects(this.scene2.children[2].children);
        
        if((intersects.length > 0 && intersects[0].object.parent.userData.interactable) || (intersects.length > 0 && intersects[0].object.parent.parent.userData.interactable)) {
            document.body.style.cursor = 'pointer';
            
        }else {
            document.body.style.cursor = 'default';
        }
    }

    removeMouseListeners() {
        window.removeEventListener("mousemove", this.mouseMoveEvent);
        window.removeEventListener("mousemove", this.mouseMoveEventSaloon);
        document.body.style.cursor = 'default';
    }

    setAssets() {
        this.aniFlag = false;
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        this.textbubble = this.experience.textbubbles;
        this.switchScene = this.experience.switchScene;
        this.mouseMoveEvent = this.onMove.bind(this);
        this.mouseMoveEventSaloon = this.onMoveSaloon.bind(this);
        window.addEventListener('mousemove', this.mouseMoveEvent);
    }

    setAnimations() {
        this.aniFlag = true;
        this.mixer = new THREE.AnimationMixer(this.room);
        this.trainclock = this.mixer.clipAction(this.experience.resources.items.room.animations[8]);
        this.trainclock.clampWhenFinished = true;
        this.trainclock.setLoop(THREE.LoopOnce);
        this.trainclock.timeScale = 1 / 750;

        this.cube =  this.mixer.clipAction(this.experience.resources.items.room.animations[12]);
        this.cube.clampWhenFinished = true;
        this.cube.setLoop(THREE.LoopOnce);
        this.cube.timeScale = 1 / 950;
    }

    playCube() {
        setTimeout(() => {  this.cube.play(); }, 170); 
    }

    update(){
        if(this.aniFlag){
            this.mixer.update(this.time.delta);
        }
    }
}