import EventEmitter from "events";
import Experience from "./Experience";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js"

export default class TextBubbles extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.time = this.experience.time;
        this.world = this.experience.world;
        this.device = this.sizes.device;
        this.renderer = this.experience.renderer;
        this.theme = this.experience.theme;
        this.preloader = this.experience.preloader;

        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize(this.sizes.width, this.sizes.height);
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0px';
        this.labelRenderer.domElement.style.pointerEvents = 'none';
        document.body.appendChild(this.labelRenderer.domElement);

        this.world.on("worldready", () => {
            this.setAssets();           
        });

        this.preloader.on("interactReady", () => {
            this.createLabel();
            //this.deleteLabel(this.roomChildren);
        });
   
    }

    setAssets() {
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
    }

    createLabel() {
        this.labelDiv = document.createElement('div');
        this.labelDiv.className = 'label';
        this.labelText = document.createElement('p');
        this.labelText.innerHTML = 'Hi, Im Ole Andresen. </br> I like to programm & </br> design things.';
        this.labelText.style.left = '82px';
        this.labelDiv.insertBefore(this.labelText, this.labelDiv.firstChild);
        this.interactLabel = new CSS2DObject(this.labelDiv);
        this.interactLabel.position.set(0.3, 0, 0.1);
        
        this.roomChildren.catmain.add(this.interactLabel);
        setTimeout(this.deleteLabel, 8000, this.roomChildren, this.interactLabel);
        setTimeout(this.createLabel2, 10000, this.roomChildren);

    }

    createLabel2(roomChildren) {
        this.labelDiv = document.createElement('div');
        this.labelDiv.className = 'label';
        this.labelText = document.createElement('p');
        this.labelText.innerHTML = 'Some objects in the scene </br> are interactable. </br> So feel free to play around!';
        this.labelText.style.left = '110px';
        this.labelDiv.insertBefore(this.labelText, this.labelDiv.firstChild);
        this.interactLabel2 = new CSS2DObject(this.labelDiv);
        this.interactLabel2.position.set(0.3, 0, 0.1);
        
        roomChildren.catmain.add(this.interactLabel2); 
        setTimeout(() => { roomChildren.catmain.remove(interactLabel2); }, 8000);   
    }

    createAboutMe(roomChildren) {
        this.labelDiv = document.createElement('div');
        this.labelDiv.className = 'about-label';
        this.labelDiv.style.pointerEvents = "auto";
        this.labelHeadline = document.createElement('h2');
        this.labelHeadline.innerHTML = 'Hey there!';
        this.labelHeadline2 = document.createElement('h2');
        this.labelHeadline2.innerHTML = 'I am Ole. </br> I am a Frontend Developer </br> based in Germany.';
        this.labelText = document.createElement('p');
        this.labelText.innerHTML = 'I have a serious passion for building things for the web. I discovered web development and design in college and realized it would be the perfect fit for me. Combining code and design to match my logical and creative side.';
        this.labelText2 = document.createElement('p');
        this.labelText2.innerHTML = 'Quietly confident person, curious with a knack for solving problems and high attention to detail. Besides Frontend, im a fan of photography, outdoor activities and building small games. I occasionally dive into Backend stuff.';
        this.labelText3 = document.createElement('p');
        this.labelText3.innerHTML = 'My main focus these days is to craft accessible, performant and usability friendly products without sacrificing creativity.';
        this.labelText.style.left = '110px';
        this.labelImg = document.createElement('img');
        this.labelImg.src = '/textures/Me.png';
        this.labelButton = document.createElement('button');
        this.labelButton.className = 'close-button-about';
        this.labelButton.innerHTML = '&times;';
        
        this.labelDiv.insertBefore(this.labelButton, this.labelDiv.firstChild);
        this.labelDiv.insertBefore(this.labelImg, this.labelDiv.firstChild);
        this.labelDiv.insertBefore(this.labelText3, this.labelDiv.firstChild);
        this.labelDiv.insertBefore(this.labelText2, this.labelDiv.firstChild);
        this.labelDiv.insertBefore(this.labelText, this.labelDiv.firstChild);
        this.labelDiv.insertBefore(this.labelHeadline2, this.labelDiv.firstChild);
        this.labelDiv.insertBefore(this.labelHeadline, this.labelDiv.firstChild);  
        
        this.interactLabel3 = new CSS2DObject(this.labelDiv);
        this.interactLabel3.position.set(0.3, 0, 0.1);
        roomChildren.catmain.add(this.interactLabel3);
       
        this.labelButton.addEventListener('click', () => {
            this.deleteLabel(roomChildren, this.interactLabel3);
        });
    }

    createContactMe(roomChildren) {
        this.labelDiv = document.createElement('div');
        this.labelDiv.className = 'contact-label';
        this.labelDiv.style.pointerEvents = "auto";
        this.labelHeadline = document.createElement('h2');
        this.labelHeadline.innerHTML = 'Want to say hi?';
        this.labelText = document.createElement('p');
        this.labelText.innerHTML = 'Send me a message and i will try to get back to you!';
        this.labelForm = document.createElement('form');
        this.labelLabel = document.createElement('label');
        this.labelLabel.innerHTML = 'Name';
        this.labelInput = document.createElement('input');
        this.labelInput.type = 'text';
        this.labelLabel2 = document.createElement('label');
        this.labelLabel2.innerHTML = 'Email';
        this.labelInput2 = document.createElement('input');
        this.labelInput2.type = 'text';
        this.labelLabel3 = document.createElement('label');
        this.labelLabel3.innerHTML = 'Message';
        this.labelTextArea = document.createElement('textarea');
        this.labelTextArea.rows = '6';
        this.labelTextArea.placeholder = 'Write text here...';
        this.labelInput3 = document.createElement('input');
        this.labelInput3.type = 'submit';
        this.labelInput3.value = 'Send Message';
        this.labelDivSocialMedia = document.createElement('div');
        this.labelDivSocialMedia.className = 'social-media';
        this.labelLink = document.createElement('a');
        this.labelLink.className = 'linkedin';
        this.labelLink.href = 'https://www.linkedin.com/in/ole-andresen-in';
        this.labelLink.target = '_blank';
        this.labelLink.innerHTML = '<ion-icon name="logo-linkedin"></ion-icon>';
        this.labelLink2 = document.createElement('a');
        this.labelLink2.className = 'git';
        this.labelLink2.href = 'https://www.instagram.com/ole_.a/';
        this.labelLink2.target = '_blank';
        this.labelLink2.innerHTML = '<ion-icon name="logo-github"></ion-icon>';
        this.labelLink3 = document.createElement('a');
        this.labelLink3.className = 'twitter';
        this.labelLink3.href = 'https://twitter.com/OleAndresen_';
        this.labelLink3.target = '_blank';
        this.labelLink3.innerHTML = '<ion-icon name="logo-twitter"></ion-icon>';
        this.labelButton = document.createElement('button');
        this.labelButton.className = 'close-button-contact';
        this.labelButton.innerHTML = '&times;';

        this.labelDiv.insertBefore(this.labelButton, this.labelDiv.firstChild);
        this.labelDiv.insertBefore(this.labelDivSocialMedia, this.labelDiv.firstChild);
        this.labelDivSocialMedia.insertBefore(this.labelLink3, this.labelDivSocialMedia.firstChild);
        this.labelDivSocialMedia.insertBefore(this.labelLink2, this.labelDivSocialMedia.firstChild);
        this.labelDivSocialMedia.insertBefore(this.labelLink, this.labelDivSocialMedia.firstChild); 
        this.labelDiv.insertBefore(this.labelForm, this.labelDiv.firstChild);
        this.labelForm.insertBefore(this.labelInput3, this.labelForm.firstChild);
        this.labelForm.insertBefore(this.labelTextArea, this.labelForm.firstChild);
        this.labelForm.insertBefore(this.labelLabel3, this.labelForm.firstChild);
        this.labelForm.insertBefore(this.labelInput2, this.labelForm.firstChild);
        this.labelForm.insertBefore(this.labelLabel2, this.labelForm.firstChild);
        this.labelForm.insertBefore(this.labelInput, this.labelForm.firstChild);
        this.labelForm.insertBefore(this.labelLabel, this.labelForm.firstChild);
        this.labelDiv.insertBefore(this.labelText, this.labelDiv.firstChild);
        this.labelDiv.insertBefore(this.labelHeadline, this.labelDiv.firstChild); 

        this.interactLabel4 = new CSS2DObject(this.labelDiv);
        this.interactLabel4.position.set(0, 0, 0);
        roomChildren.mail.add(this.interactLabel4);

        this.labelButton.addEventListener('click', () => {
            this.deleteLabel(roomChildren, this.interactLabel4);
        });
    }

    resize() {
        this.labelRenderer.setSize(this.sizes.width, this.sizes.height);
    }

    update() {
        this.labelRenderer.render(this.scene, this.camera.perspectiveCamera);
    }

    deleteLabel(roomChildren, interactLabel) {
        roomChildren.catmain.remove(interactLabel);
        roomChildren.mail.remove(interactLabel);
    }
}