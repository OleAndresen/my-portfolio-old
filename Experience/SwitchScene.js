import EventEmitter from "events";
import Experience from "./Experience";
import GSAP from "gsap";

export default class SwitchScene extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;
        this.renderer = this.experience.renderer; 
        
        this.world.on("worldready", () => {   
            this.setAssets();
        });
    }

    setAssets() {
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        this.roomChildren2 = this.experience.world.room2.roomChildren;
        this.interacbles = this.experience.interactables;
    }

    firstIntro() {
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline();
            this.timeline.to(this.roomChildren.pointLight, {
                intensity: 0,
                ease: "back-out(2.2)",
                duration: 0.2,
            }).to(this.roomChildren.spotLight2, {
                intensity: 0,
                ease: "back-out(2.2)",
                duration: 0.2
            }, "light").to(this.roomChildren.spotLight, {
                intensity: 0,
                ease: "back-out(2.2)",
                duration: 0.2
            }, "light").to(this.roomChildren.pointLight2, {
                intensity: 0,
                ease: "back-out(2.2)",
                duration: 0.2
            }, "light").to(this.roomChildren.signpost.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "back-out(2.2)",
                duration: 0.5
            },"lamp").to(this.roomChildren.lamp.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "back-out(2.2)",
                duration: 0.5
            },"lamp").to(this.roomChildren.trainclock.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "back-out(2.2)",
                duration: 0.5,
            },"lamp").to(this.roomChildren.mail.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "back-out(2.2)",
                duration: 0.5
            },"lamp").to(this.roomChildren.cart.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "back-out(2.2)",
                duration: 0.5
            },"lamp").to(this.roomChildren.catmain.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "back-out(2.2)",
                duration: 0.5
            },"lamp").to(this.roomChildren.boxes.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "back-out(2.2)",
                duration: 0.5
            },"lamp").to(this.roomChildren.door.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "back-out(2.2)",
                duration: 0.5
            },"lamp").to(this.roomChildren.ropes.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "back-out(2.2)",
                duration: 0.5
            },"saloon").to(this.roomChildren.railing.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "back-out(2.2)",
                duration: 0.5
            },"saloon").to(this.roomChildren.posts.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "back-out(2.2)",
                duration: 0.5
            },"saloon").to(this.roomChildren.saloon.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "back-out(2.2)",
                duration: 0.5
            },"saloon").to(this.roomChildren.floor.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "back-out(2.2)",
                duration: 0.5,
                onComplete: resolve
            },"saloon");
        });
    }

    secondIntro() {
        return new Promise((resolve) => {
            this.secondTimeline = new GSAP.timeline();
            this.secondTimeline.to(this.roomChildren2.plane.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"floor").to(this.roomChildren2.floor.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"floor").to(this.roomChildren2.stairs.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            }).to(this.roomChildren2.bar.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"bar").to(this.roomChildren2.chairs.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"bar").to(this.roomChildren2.desk.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"bar").to(this.roomChildren2.bardrinks.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            }).to(this.roomChildren2.drinks.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"drinks").to(this.roomChildren2.deskdrinks.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"drinks").to(this.roomChildren2.catmain.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"cat").to(this.roomChildren2.plant.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"cat").to(this.roomChildren2.elephant.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"cat").to(this.roomChildren2.board.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            }).to(this.roomChildren2.projecttest.scale, {
                x: 1,
                y: 1,
                z: 1,ease: "back-out(2.2)",
                duration: 0.5
            }).to(this.roomChildren2.pointLight, {
                intensity: 0.4,
                ease: "back-out(2.2)",
                duration: 0.5,
                onComplete: resolve
            })
        });
    }

    async playIntro() {
        await this.firstIntro();
        this.interacbles.removeMouseListeners();
        this.renderer.isOrtographic = true;
        this.renderer.scene = this.experience.scene2;
        this.playSecondIntro();
    }

    async playSecondIntro() {
        await this.secondIntro();
        this.emit("interactReady");
    }

    update() {

    }

}