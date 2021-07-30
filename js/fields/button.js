class Button extends Field {

    static get observedAttributes() {
        return ['value', 'icon', 'label'];
    }

    constructor() {
        super();
        this.authorized.label = false;
    }

    json() {
        return {
            tagName: 'div',
            classes: ['button'],
            children: [
                {
                    tagName: 'button',
                    classes: ['common'],
                    innerHTML: this.value,
                    attributes: {
                        name: this.name
                    }
                }
            ]
        };
    }

}

customElements.define('js-button', Button);
