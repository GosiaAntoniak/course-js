
class Lightbox {
    constructor() {
        this.init();
    }

    init() {
        this.container = document.createElement("div");
        this.container.id = "lightbox";
        document.body.appendChild(this.container);

        this.lightboxImg = document.createElement("img");
        this.container.appendChild(this.lightboxImg);

        this.addListeners();
    }

    addListeners() {
        const images = document.querySelectorAll(".gallery img");
        images.forEach(img => {
            img.addEventListener("click",
                () => this.galleryImgClicked(img) );
        });

        this.container.addEventListener("click", () => {
            this.hideLightbox();
        });

        document.addEventListener("keydown", (event) => {
            if(event.key === "Escape") this.hideLightbox();
        });
    }

    hideLightbox = () => {
        this.container.classList.remove("active");
    }

    galleryImgClicked = (img) => {
        //console.log(img);
        this.lightboxImg.src = img.src;
        this.container.classList.add("active");
    }
}

const lightbox = new Lightbox();
