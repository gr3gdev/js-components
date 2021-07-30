class MultiSelect extends Select {

    constructor() {
        super();
    }

    select() {
        const line = this._root.querySelectorAll('li.value')[this.indexSelected];
        line.classList.add('multiselect-hide');

        const listValues = this._root.querySelector('input[type="hidden"]').value.split(',');
        listValues.push(line.getAttribute('data-value'));
        this._root.querySelector('input[type="hidden"]').value = listValues;

        const inputText = this._root.querySelector('input[type="text"]');
        inputText.value = '';
        const valueElt = document.createElement('label');
        valueElt.classList.add('multiselect-value');
        valueElt.setAttribute('multiselect-value', line.getAttribute('data-value'));
        valueElt.innerHTML = line.innerHTML;
        valueElt.addEventListener('click', () => {
            line.classList.remove('multiselect-hide');
            this._root.querySelector('.select').removeChild(valueElt);
            const values = this._root.querySelector('input[type="hidden"]').value.split(',');
            values.splice(values.indexOf(valueElt.getAttribute('multiselect-value')), 1);
            this._root.querySelector('input[type="hidden"]').value = values;
        });

        this._root.querySelector('.select').insertBefore(valueElt, inputText);
        this._root.querySelectorAll('li.value').forEach(line => {
            line.classList.remove('selected');
            line.classList.remove('hide');
        });
    }
}

customElements.define('js-multiselect', MultiSelect);
