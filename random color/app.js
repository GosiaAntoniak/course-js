class RandomColor {
constructor() {
    this.button = document.querySelector("#color-button");
    this.input = document.querySelector("#color-input");
this.init();
}

init() {
    this.button.addEventListener("click", (e) => {
        this.getRandomColor();
    });
    this.input.addEventListener("click", (e) => {
        this.copyColorToClipboard();
    })
}
getRandomColor = () => { //256 * 256 * 256 -1 = 16777215
const newColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
this.input.value = newColor;
document.body.style.backgroundColor = newColor;
}

    copyColorToClipboard = () => {
const v = this.input.value;
const cb = navigator.clipboard;
cb.writeText(v).then(() => console.log("Kolor skopiowany: " + v));
    }
}

const randomColor = new RandomColor();
