class InputRadio extends Field {

    constructor() {
        super();
    }

    json() {
        const values = JSON.parse(this.getAttribute('values'));
        const children = [];
        if (values) {
            values.forEach(value => {
                let checked = false;
                if (this.value && value.key === this.value) {
                    checked = true;
                }
                children.push({
                    tagName: 'label',
                    children: [
                        {
                            tagName: 'div',
                            classes: ['radio'],
                            children: [
                                {
                                    tagName: 'input',
                                    classes: ['common'],
                                    attributes: {
                                        name: this.name,
                                        value: this.value,
                                        type: 'radio',
                                        checked: checked,
                                        value: value.key
                                    }
                                },
                                {
                                    tagName: 'span',
                                    classes: ['checkmark']
                                }
                            ]
                        },
                        {
                            tagName: 'span',
                            classes: [],
                            innerHTML: value.label
                        }
                    ]
                });
            });
        }
        return {
            tagName: 'div',
            classes: ['radios'],
            children: children
        };
    }

}

customElements.define('js-radio', InputRadio);
