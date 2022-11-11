import * as THREE from "three";
import Experience from "../Experience";


export default class Floor{
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.scene2 = this.experience.scene2;
        this.setFloor();
    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(150, 150);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xC29367,
            side: THREE.BackSide
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -0.045;
        this.plane.receiveShadow = true;

        this.geometry2 = new THREE.PlaneGeometry(150, 150);
        this.material2 = new THREE.MeshStandardMaterial({
            color: 0xC29367,
            side: THREE.BackSide
        });
        this.plane2 = new THREE.Mesh(this.geometry2, this.material2);
        this.scene2.add(this.plane2);
        
        this.plane2.rotation.x = Math.PI / 2;
        this.plane2.position.y = -0.16;
        this.plane2.receiveShadow = true;
    }
}