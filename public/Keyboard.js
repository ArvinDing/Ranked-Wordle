const Keyboard={
    elements:{
        main:null,
        keysContainer:null,
        keys:[]
    },
    eventHandle:{
        oninput:null,
        onclose:null
    },
    
    properties:{
        value:""
    },

    init(){
        //create elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        //setup elements
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys")
        //add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
    },

    createkey(){

    },

    trigger(handlername){
        console.log("Event triggered: " + handlername);
    },

    open(){

    },

    close(){

    },
}
window.addEventListener("DOMContentLoaded",function(){
    Keyboard_init();
});