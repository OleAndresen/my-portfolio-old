import EventEmitter from "events";
import Experience from "./Experience";
import GSAP from "gsap";
import convert from "./Utils/convertDivsToSpans"

export default class Preloader extends EventEmitter {
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

        this.cubeScaleX = 4;
        this.cubeScaleY = 3.4;
        this.cubeSacleZ = 4;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets() {
        convert(document.querySelector(".intro-text"));
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren; 
        this.interactable = this.experience.interactables;
    }

    firstIntro() {
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline();
            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document.querySelector(".preloader").style.display = "none";
                }
            });
            if(this.device === "desktop") {
                this.timeline.to(this.roomChildren.introtrain.scale, {
                    x: 0.5,
                    y: 0.5,
                    z: 0.5,
                    ease: "back.out(2.5)",
                    duration: 1
                }).to(this.room.position, {
                    x: -1.8,
                    ease: "power1.out",
                    duration: 2,
                }).to(".intro-text .animatethis", {
                    yPercent: -100,
                    stagger: 0.05,
                    ease: "back.out(2.5)"  
                }, ">-1.2");
            }else {
                this.timeline.to(this.roomChildren.introtrain.scale, {
                    x: .5,
                    y: .5,
                    z: .5,
                    ease: "back.out(2.5)",
                    duration: 1
                }).to(this.room.position, {
                    z: -1,
                    ease: "power1.out",
                    duration: 0.7,
                });
            }
            this.timeline.to(".arrow-svg-wrapper", {
                opacity: 1
            }, "same").to(".toggle-bar", {
                opacity: 1,
                onComplete: resolve
            }, "same");
        });
    }

    secondIntro() {
        
        return new Promise((resolve) => {
            this.secondTimeline = new GSAP.timeline();
            this.secondTimeline.to(".intro-text .animatethis", {
                yPercent: 100,
                stagger: 0.05,
                ease: "back.in(2.5)"
            }, "fadeout").to(".arrow-svg-wrapper", {
                opacity: 0
            }, "fadeout").to(this.roomChildren.introtrain.position, {
                x: -20,
                ease: "power1.out",
                duration: 1.6
            }).to(this.roomChildren.introtrain.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out"
            },"introtrain").to(this.roomChildren.cube.scale, {
                x: .5,
                y: .5,
                z: .5,
                ease: "back.out(2.5)",
                duration: 1
            },"introtrain -=1.95").add(this.interactable.playCube()).to(this.room.position, {
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out"
            },"same").to(this.roomChildren.cube.rotation, {
                y: 2*Math.PI + Math.PI/4
            },"same").to(this.renderer, {
                isOrtographic: false
            },"same -=.95").to(this.roomChildren.cube.scale, {
                x: this.cubeScaleX,
                y: this.cubeScaleY,
                z: this.cubeSacleZ
            },"same").to(".hero", {
                opacity: 0,
                onComplete: () => {
                    document.querySelector(".hero").style.display = "none";
                }
            },"same").to(this.roomChildren.cube.position, {
                x: -1.5,
                y: 2,
                z: -10
            },"same").set(this.roomChildren.floor.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            }).to(this.roomChildren.cube.scale, {
                x: 0,
                y: 0,
                z: 0
            }).to(this.roomChildren.saloon.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"saloon").to(this.roomChildren.posts.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"saloon").to(this.roomChildren.railing.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"saloon").to(this.roomChildren.ropes.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"saloon").to(this.roomChildren.door.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"saloon").to(this.roomChildren.boxes.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            }).to(this.roomChildren.catmain.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"mail").to(this.roomChildren.cart.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"mail").to(this.roomChildren.mail.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"mail").to(this.roomChildren.trainclock.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"mail").to(this.roomChildren.lamp.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"lamp").to(this.roomChildren.signpost.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5
            },"lamp").to(this.roomChildren.pointLight2, {
                intensity: .1,
                ease: "back-out(2.2)",
                duration: 0.5
            }, "light").to(this.roomChildren.spotLight, {
                intensity: .5,
                ease: "back-out(2.2)",
                duration: 0.5
            }, "light").to(this.roomChildren.spotLight2, {
                intensity: .5,
                ease: "back-out(2.2)",
                duration: 0.5
            }, "light").to(this.roomChildren.pointLight, {
                intensity: .9,
                ease: "back-out(2.2)",
                duration: 0.5,
                onComplete: resolve
            });
        });
    }

    onScrool(e) {
        if(e.deltaY > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e) {
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if(difference > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.initialY = null;
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro() {
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScrool.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }

    async playSecondIntro() {
        this.moveFlag = false;
        this.scaleFlag = true;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("interactReady");
    }

    move() {
        if(this.device === "desktop") {
            this.room.position.set(-1.8, 0, 0);
        }else {
            this.room.position.set(0, 0, -1);
        }
    }

    scale() {
        if(this.device === "desktop") {
            this.room.scale.set(.25, .25,.25);
        }else {
            this.room.scale.set(.15, .15, .15);
        }
    }

    update() {
        if(this.moveFlag) {
            this.move();
        }
        if(this.scaleFlag) {
            this.scale();
        }
    }

}