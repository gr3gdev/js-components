function parseItems(elt) {
    const children = [];
    const items = elt.querySelectorAll('js-list-item');
    items.forEach(item => {
        if (item.parentNode === elt) {
            const icon = item.getAttribute('icon');
            const itemClasses = [];
            const itemChildren = parseItems(item);
            item.querySelectorAll('js-list-item').forEach(c => item.removeChild(c));
            if (icon) {
                children.push({
                    tagName: 'i',
                    classes: [icon]
                });
                itemClasses.push('icon');
            }
            const lineItem = {
                tagName: 'li',
                classes: itemClasses,
                innerHTML: item.innerHTML
            };
            if (itemChildren.length > 0) {
                lineItem.children = [
                    {
                        tagName: 'ul',
                        children: itemChildren
                    }
                ];
            }
            children.push(lineItem);
        }
    });
    return children;
}

class List extends Element {

    constructor() {
        super();
        this.classes = ['list'];
    }
    
    json() {
        const workDiv = document.createElement('div');
        workDiv.innerHTML = this.innerHTML;
        return {
            tagName: 'ul',
            children: parseItems(workDiv)
        };
    }

}

customElements.define('js-list', List);
