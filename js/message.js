class Message extends Element {
    
    static get observedAttributes() {
        return ['type', 'icon', 'value'];
    }

    constructor() {
        super();
        this.classes = ['message'];
    }
    
    get type() {
        return this.getAttribute('type');
    }
    
    set type(val) {
        this.setAttribute('type', val);
    }

    
    get icon() {
        return this.getAttribute('icon');
    }
    
    set icon(val) {
        this.setAttribute('icon', val);
    }

    
    get value() {
        return this.getAttribute('value');
    }
    
    set value(val) {
        this.setAttribute('value', val);
    }

    json() {
        const children = [];
        if (this.icon) {
            children.push({
                tagName: 'i',
                classes: [this.icon]
            });
        } else {
            let defaultIcon = 'info-circle';
            if (this.type === 'warn') {
                defaultIcon = 'exclamation-circle';
            } else if (this.type === 'error') {
                defaultIcon = 'times-circle';
            } else if (this.type === 'success') {
                defaultIcon = 'check-circle';
            }
            children.push({
                tagName: 'i',
                classes: [defaultIcon]
            });
        }
        children.push({
            tagName: 'span',
            innerHTML: this.value
        });
        return {
            tagName: 'div',
            classes: [this.type],
            children: children
        };
    }
}

customElements.define('js-message', Message);
