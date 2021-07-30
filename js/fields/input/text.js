class InputText extends Input {

    constructor() {
        super();
        this.type = 'text';
    }

    json() {
        const json = super.json();
        json.attributes['placeholder'] = this.getAttribute('placeholder');
        return json;
    }

}

customElements.define('js-text', InputText);
