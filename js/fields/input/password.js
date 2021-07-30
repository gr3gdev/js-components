class InputPassword extends InputText {

    constructor() {
        super();
        this.type = 'password';
    }

}

customElements.define('js-password', InputPassword);
