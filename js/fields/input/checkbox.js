class InputCheckbox extends Field {

    static get observedAttributes() {
        return ['value', 'icon', 'label', 'checked'];
    }

    constructor() {
        super();
        this.classes.push('checkbox');
    }

    set checked(val) {
        this.setAttribute('checked', val);
    }

    get checked() {
        return this.getAttribute('checked');
    }
    
    json() {
        return {
            tagName: 'div',
            classes: ['checkbox'],
            children: [
                {
                    tagName: 'input',
                    classes: ['common'],
                    attributes: {
                        name: this.name,
                        value: this.value,
                        checked: this.checked === "true" ? "checked" : "",
                        type: 'checkbox'
                    }
                },
                {
                    tagName: 'span',
                    classes: ['checkmark']
                }
            ]
        };
    }

}

customElements.define('js-checkbox', InputCheckbox);
