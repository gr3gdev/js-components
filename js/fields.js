class Field extends Element {

    static get observedAttributes() {
        return ['value', 'icon', 'label', 'label-width'];
    }

    constructor() {
        super();
        // Configuration
        this.authorized = {
            label: true
        };
        this.classes = ['field'];
    }

    set icon(val) {
        this.setAttribute('icon', val);
    }

    get icon() {
        return this.getAttribute('icon');
    }
    
    set value(val) {
        this.setAttribute('value', val);
    }

    get value() {
        return this.getAttribute('value');
    }
    
    set label(val) {
        if (this.authorized.label) {
            this.setAttribute('label', val);
        }
    }

    get label() {
        if (this.authorized.label) {
            return this.getAttribute('label');
        }
    }
    
    set labelWidth(val) {
        if (this.authorized.label) {
            this.setAttribute('label-width', val);
        }
    }

    get labelWidth() {
        if (this.authorized.label) {
            return this.getAttribute('label-width');
        }
    }
    
    render() {
        // Method for create icon
        const createIcon = () => {
            let iconElt;
            if (this.icon) {
                iconElt = document.createElement('i');
                iconElt.classList.add(this.icon);
            }
            return iconElt;
        }
        // Method for create label
        const createLabel = () => {
            let labelElt;
            if (this.label) {
                labelElt = document.createElement('label');
                const spanElt = document.createElement('span');
                spanElt.classList.add('label');
                if (this.labelWidth) {
                    spanElt.classList.add(`w${this.labelWidth}`);
                }
                spanElt.innerHTML = this.label;
                const iconElt = createIcon();
                if (iconElt) {
                    spanElt.classList.add('icon');
                    labelElt.appendChild(iconElt);
                }
                labelElt.appendChild(spanElt);
            }
            return labelElt;
        };
        const labelElt = createLabel();

        super.render();
        
        const mainDiv = this._root.querySelector('.field');
        if (mainDiv.childNodes.length === 1) {
            const element = mainDiv.childNodes[0];
            mainDiv.innerHTML = '';
            if (element) {
                if (labelElt) {
                    // With label
                    labelElt.appendChild(element);
                    labelElt.querySelectorAll('input').forEach(input => {
                        input.addEventListener('focus', (e) => labelElt.classList.add('focus'));
                        input.addEventListener('blur', (e) => labelElt.classList.remove('focus'));
                    });
                    mainDiv.appendChild(labelElt);
                } else {
                    // Without label
                    const iconElt = createIcon();
                    if (iconElt) {
                        element.insertBefore(iconElt, element.firstChild);
                    }
                    mainDiv.appendChild(element);
                }
            }
        }
    }

}
