class Select extends Field {

    constructor() {
        super();
        this.indexSelected = 0;
    }

    select() {
        const line = this._root.querySelectorAll('li.value')[this.indexSelected];
        this._root.querySelector('input[type="hidden"]').value = line.getAttribute('data-value');
        this._root.querySelector('input[type="text"]').value = line.innerHTML;
        this._root.querySelectorAll('li.value').forEach(line => {
            line.classList.remove('selected');
            line.classList.remove('hide');
        });
    }

    json() {
        const values = JSON.parse(this.getAttribute('values'));
        let selectedValue = {
            key: null,
            label: null
        };
        if (this.value) {
            let filter;
            if (Array.isArray(values)) {
                filter = values.filter(k => k.key === this.value);
            } else {
                filter = Object.values(values).filter(k => k.key === this.value);
            }
            if (filter && filter.length === 1) {
                selectedValue = filter[0];
            }
        }
        
        const highlight = () => {
            this._root.querySelectorAll('li.value')[this.indexSelected].classList.add('selected');
        }

        const addOptions = (json, values) => {
            values.forEach(value => {
                json.push({
                    tagName: 'li',
                    classes: ['value'],
                    innerHTML: value.label,
                    attributes: {
                        'data-value': value.key
                    },
                    events: {
                        click: () => this.select(),
                        mouseover: (evt) => {
                            const lines = this._root.querySelectorAll('li.value');
                            lines.forEach(line => line.classList.remove('selected'));
                            this.indexSelected = [].indexOf.call(lines, evt.target);
                            highlight();
                        }
                    }
                });
            });
        }
        
        const keyup = (e) => {
            const elt = this._root.querySelector('ul.selector');
            if (elt.classList.contains('hide')) {
                elt.classList.remove('hide');
            }
            if (e.code === 'Enter') {
                this.select();
                elt.classList.add('hide');
                return;
            }
            const lines = elt.querySelectorAll('li.value');
            lines.forEach(line => {
                line.classList.remove('selected');
                line.classList.remove('hide');
            });
            if (e.code === 'ArrowDown') {
                this.indexSelected += 1;
            }
            if (e.code === 'ArrowUp') {
                this.indexSelected -= 1;
            }
            if (this.indexSelected < 0) {
                this.indexSelected = 0;
            }
            if (this.indexSelected >= lines.length) {
                this.indexSelected = lines.length - 1;
            }
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Tab'].indexOf(e.code) < 0) {
                const query = this._root.querySelector('input[type="text"]').value;
                if (query.length > 0) {
                    elt.querySelectorAll('li.value').forEach(li => {
                        if (li.innerHTML.toLowerCase().indexOf(query.toLowerCase()) < 0) {
                            li.classList.add('hide');
                        }
                    });
                    const firstOccurence = elt.querySelectorAll('li.value:not(.hide,.multiselect-hide)')[0];
                    if (firstOccurence) {
                        this.indexSelected = [].indexOf.call(lines, firstOccurence);
                        firstOccurence.classList.add('selected');
                    }
                }
            }
            highlight();
        };

        const selector = {
            tagName: 'ul',
            classes: ['hide', 'selector'],
            children: []
        };

        if (Array.isArray(values)) {
            addOptions(selector.children, values);
        } else {
            Object.keys(values).forEach(groupValue => {
                const group = {
                    tagName: 'li',
                    classes: ['group'],
                    children: [
                        {
                            tagName: 'span',
                            innerHTML: groupValue
                        }
                    ]
                }
                const options = {
                    tagName: 'ul',
                    children: []
                }
                addOptions(options.children, values[groupValue]);
                group.children.push(options);
                selector.children.push(group);
            });
        }

        let closeAfter;
        return {
            tagName: 'div',
            classes: ['select'],
            children: [
                {
                    tagName: 'input',
                    classes: ['common'],
                    attributes: {
                        type: 'text',
                        placeholder: this.getAttribute('placeholder'),
                        value: selectedValue.label
                    },
                    events: {
                        blur: () => {
                            if (closeAfter) {
                                clearTimeout(closeAfter);
                            }
                            closeAfter = setTimeout(() => {
                                const elt = this._root.querySelector('ul.selector');
                                if (!elt.classList.contains('hide')) {
                                    elt.classList.add('hide');
                                }
                            }, 200);
                        },
                        click: () => this._root.querySelector('ul.selector').classList.toggle('hide'),
                        keyup: (e) => keyup(e)
                    }
                },
                {
                    tagName: 'input',
                    classes: [],
                    attributes: {
                        name: this.name,
                        value: selectedValue.key,
                        type: 'hidden'
                    }
                },
                selector
            ]
        };
    }

}

customElements.define('js-select', Select);
