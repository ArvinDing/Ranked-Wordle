const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },
    eventHandle: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: ""
    },

    init() {
        //create elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        //setup elements
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this.createkey());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
        //add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
    },

    createkey() {
        const fragment = document.createDocumentFragment();
        const Layout = [
            "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
            "A", "S", "D", "F", "G", "H", "J", "K", "L",
            "enter", "Z", "X", "C", "V", "B", "N", "M", "backspace"
        ];

        //html icon
        const createIcon = (icon_name) => {
            return '<i class = "material-icons"></i>';
        };

        Layout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["P", "L"].indexOf(key) !== -1;

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key_wide");
                    keyElement.innerHTML = createIcon("backspace");
                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this.trigger("oninput");
                    });
                    break;
                case "enter":
                    keyElement.classList.add("keyboard__key_wide");
                    keyElement.innerHTML = createIcon("keyboard_return");
                    keyElement.addEventListener("click", () => {
                        this.properties.value +="\n";
                        this.trigger("oninput");
                    });
                    break;
                default:
                    keyElement.textContent = key.toUpperCase();
                    keyElement.addEventListener("click",()=>{
                        this.properties.value += key.toUpperCase();
                        this.trigger("oninput");
                    });
                    break;
            }
            fragment.appendChild(keyElement);
            if(insertLineBreak){
                fragment.appendChild(document.createElement("br"));
            }
        });
        return fragment;
    },

    trigger(handlername) {
        if(typeof this.eventHandle[handlername] == "function"){
            this.eventHandle[handlername](this.properties.value);
        }
    },

    open(initialV,oninput,onclose) {
        this.properties.value = initialV || "";
        this.eventHandle.oninput = oninput;
        this.eventHandle.onclose = onclose;
    },

    close() {

    },
}
window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});