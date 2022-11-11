import * as THREE from "three";
import Experience from "../Experience";
import Environment from "./Environment";

import Room from "./Room";
import Floor from "./Floor";
import EventEmitter from "events";
import IndoorRoom from "./IndoorRoom";

export default class World extends EventEmitter{
    constructor() {
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;

        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.room = new Room();
            this.room2 = new IndoorRoom();
            this.floor = new Floor();
            this.emit("worldready");
        });

        this.theme.on("switch", (theme) => {
            this.switchTheme(theme);
        });
    }

    switchTheme() {
        if(this.environment) {
            this.environment.switchTheme(this.theme);
        }
    }

    resize() {

    }

    update(){
        if(this.room) {
            this.room.update();
        }
    }
}