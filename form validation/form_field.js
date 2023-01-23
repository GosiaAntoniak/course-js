class FormField {
    constructor(formFieldSelector,
                { minlength = 3, maxlength = 100,
                    errorMsgSelector, matchWithPasswordId}) {

        this.formField = document.querySelector(formFieldSelector);
        this.type = this.formField.type;
        this.minlength = +minlength;
        this.maxlength = +maxlength;
        if(!errorMsgSelector) errorMsgSelector = `${formFieldSelector} + span`;
        this.errorMsgEl = document.querySelector(errorMsgSelector);
        this.matchWithPasswordId = matchWithPasswordId;
    }

    validate = () => {

        switch(this.type) {
            case "password":
                if(!this.checkTextLength()) return false;
                if(!this.checkValidPassword()) return false;
                return true;
                break;
            case "text":
                if(!this.checkTextLength()) return false;
                return true;
                break;
            case "email":
                if(!this.checkEmail()) return false;
                return true;
                break;
        }

        return false;
    }

    checkTextLength = () => {
        if(this.formField.value.length < this.minlength) {
            this.showError(`Wymagane minimum znaków: ${this.minlength}`);
            return false;
        } else
        if(this.formField.value.length > this.maxlength) {
            this.showError(`Maksymalnie można uzyć ${this.maxlength} znaków.`);
            return false;
        } else {
            this.showSuccess();
            return true;
        }
    }

    checkEmail = () => {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(re.test(this.formField.value.trim())) {
            this.showSuccess();
            return true;
        } else {
            this.showError("Wpisz prawidłowy email.");
            return false;
        }
    }

    checkValidPassword = () => {
        if(!this.matchWithPasswordId) return true;
        const matchWith = document.querySelector(this.matchWithPasswordId);

        if(this.formField.value.length > 0
            && this.formField.value === matchWith.value) {
            this.showSuccess();
            return true;
        } else {
            this.showError("Hasła muszą się zgadzać");
            return false;
        }
    }

    showError = (msg) => {
        this.errorMsgEl.innerHTML = msg;
        this.errorMsgEl.classList.add("error");
        this.formField.classList.add("error");
        this.errorMsgEl.classList.remove("success");
        this.formField.classList.remove("success");
    }

    showSuccess = () => {
        this.errorMsgEl.innerHTML = "";
        this.errorMsgEl.classList.remove("error");
        this.formField.classList.remove("error");
        this.errorMsgEl.classList.add("success");
        this.formField.classList.add("success");
    }

}

