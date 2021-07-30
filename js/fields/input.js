class Input extends Field {
    
    constructor() {
        super();
    }

    json() {
        return {
            tagName: 'input',
            classes: ['common'],
            attributes: {
                name: this.name,
                value: this.value,
                type: this.type,
                autocomplete: 'off'
            }
        };
    }

}