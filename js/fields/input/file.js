class InputFile extends Input {

    constructor() {
        super();
        this.type = 'file';
    }

}

customElements.define('js-file', InputFile);
