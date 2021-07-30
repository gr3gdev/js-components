class Table extends Element {

    constructor() {
        super();
        this.classes = ['table'];
    }
    
    json() {
        const content = document.createElement('div');
        content.innerHTML = this.innerHTML;
        // HEAD
        const headers = content.querySelector('js-table_headers').querySelectorAll('js-table_header');
        const widths = [];
        const headChildren = [];
        headers.forEach(header => {
            widths.push(header.getAttribute('width') || '1fr');
            headChildren.push({
                tagName: 'label',
                innerHTML: header.innerHTML
            });
        });
        // BODY
        const bodyChildren = [];
        const lines = content.querySelectorAll('js-table_line');
        lines.forEach(line => {
            const child = {
                tagName: 'div',
                classes: ['row'],
                attributes: {
                    style: `grid-template-columns: ${widths.join(' ')};`
                },
                children: []
            };
            const columns = line.querySelectorAll('js-table_column');
            columns.forEach(column => {
                child.children.push({
                    tagName: 'div',
                    classes: ['col'],
                    innerHTML: column.innerHTML
                });
            });
            bodyChildren.push(child);
        });
        return {
            tagName: 'div',
            children: [
                {
                    tagName: 'div',
                    classes: ['head'],
                    attributes: {
                        style: `grid-template-columns: ${widths.join(' ')};`
                    },
                    children: headChildren
                },
                {
                    tagName: 'div',
                    classes: ['body'],
                    children: bodyChildren
                }
            ]
        };
    }
    
}

customElements.define('js-table', Table);
