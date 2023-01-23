class MultStepForm {
    constructor() {
    }

    init() {
        this.form = document.querySelector("form");
        this.steps = Array.from(document.querySelectorAll("form .step"));
        this.nextBtn = document.querySelectorAll("form .next-btn");
        this.prevBtn = document.querySelectorAll("form .previous-btn");

        this.addListeners();
    }

    addListeners() {
        this.nextBtn.forEach(btn => {
            btn.addEventListener("click", () => this.changeStep(1) );
        });

        this.prevBtn.forEach(btn => {
            btn.addEventListener("click", () => this.changeStep(-1) );
        });

        this.form.addEventListener("submit", this.submit);
    }

    changeStep = (v) => {
        if (!this.checkStepValidity()) return;
        const activeStep = document.querySelector(".active");
        let stepIndex = this.steps.indexOf(activeStep);
        this.steps[stepIndex].classList.remove("active");
        stepIndex += v;
        if (v === 0) stepIndex = 0;

        if (stepIndex < 0 || stepIndex >= this.steps.length) stepIndex = 0;
        this.steps[stepIndex].classList.add("active");
    }

    checkStepValidity = () => {
        const activeStep = document.querySelector(".active");
        let stepIndex = this.steps.indexOf(activeStep);
        const inputs = activeStep.querySelectorAll("input");

        let inputsCorrect = true;

        for (const el of inputs) {
            const valid = el.checkValidity();

            if (valid) {
                el.classList.remove("invalid-input");
            } else {
                el.classList.add("invalid-input");
                inputsCorrect = false;
            }
        }

        return inputsCorrect;
    }


    resetSteps = () => {
        this.changeStep(0);
    }

    submit = (e) => {
        e.preventDefault();
        this.form.reset();
        this.resetSteps();
    }



}

const multiForm = new MultStepForm();
multiForm.init();
