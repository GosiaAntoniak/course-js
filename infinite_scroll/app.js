class InfiniteScroll {
    constructor(container, loader) {
        this.container = container;
        this.loader = loader;
        this.loading = false;
        this.page = 1;
        this.init();
    }

    init() {
        window.onload = this.getData;

        //dodawanie treści przy scrollowaniu
        document.addEventListener("scroll", () => {
            if (this.loading) return;

            if(window.scrollY + window.innerHeight >= document.body.offsetHeight)  {
                this.getData();
            }
        });
    }

    setLoading(flag) {
        if (flag) {
            this.loader.classList.remove("hidden");
        } else {
            this.loader.classList.add("hidden");
        }

        this.loading = flag;
    }

    getData = async () => {
        this.setLoading(true);
        const apiUrl = `https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=4`;
        try {
            const res = await fetch(apiUrl);
            const photosArray = await res.json();
            this.displayPosts(photosArray);
            this.setLoading(false);
            this.page++;
        } catch (err) {
            console.log(err);
            this.setLoading(false);
        }


    }

    displayPosts(posts) {
        this.container.innerHTML += posts.map(post => {
            return `
    <div class="post">
    <h3>${this.capitalizeFirstLetter(post.title)}</h3>
    <p>${this.capitalizeFirstLetter(post.body)}</p>
</div>
    `
        }).join("");
    }

    capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

const iScroll = new InfiniteScroll(document.querySelector(".container"), document.querySelector(".loader-box"));
