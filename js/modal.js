class Modal extends Element {
    
    static get observedAttributes() {
        return ['title', 'width', 'height'];
    }

    constructor() {
        super();
        this.classes = ['modal', 'hide'];
        this.closeEvent = (e) => {
            if (e.code === 'Escape') {
                this.hide();
            }
        };
    }

    get title() {
        return this.getAttribute('title');
    }
    
    set title(val) {
        this.setAttribute('title', val);
    }

    get width() {
        return this.getAttribute('width');
    }
    
    set width(val) {
        this.setAttribute('width', val);
    }

    get height() {
        return this.getAttribute('height');
    }
    
    set height(val) {
        this.setAttribute('height', val);
    }
    
    show() {
        this._root.querySelector('.modal').classList.remove('hide');
        document.addEventListener('keyup', this.closeEvent);
    }

    hide() {
        document.removeEventListener('keyup', this.closeEvent);
        this._root.querySelector('.modal').classList.add('hide');
    }

    json() {
        this._root.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hide();
            }
        });
        const modalClasses = ['window'];
        if (this.width) {
            modalClasses.push(`w${this.width}`);
        }
        if (this.height) {
            modalClasses.push(`h${this.height}`);
        }
        return {
            tagName: 'div',
            classes : modalClasses,
            children: [
                {
                    tagName: 'label',
                    children: [
                        {
                            tagName: 'span',
                            innerHTML: this.title,
                        },
                        {
                            tagName: 'div',
                            innerHTML: this.innerHTML
                        }
                    ]
                },
                {
                    tagName: 'button',
                    classes: ['close'],
                    children: [
                        {
                            tagName: 'i',
                            classes: ['times-circle']
                        }
                    ],
                    events: {
                        click: () => this.hide()
                    }
                }
            ]
        };
    }

}

customElements.define('js-modal', Modal);
