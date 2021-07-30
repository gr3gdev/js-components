class Tabs extends Element {

    constructor() {
        super();
        this.classes = ['tabs'];
    }
    
    json() {
        const workDiv = document.createElement('div');
        workDiv.innerHTML = this.innerHTML;
        const tabs = workDiv.querySelectorAll('js-tab');
        const children = [
            {
                tagName: 'div',
                classes: ['titles'],
                children: []
            },
            {
                tagName: 'div',
                classes: ['contents'],
                children: []
            }
        ];
        if (tabs) {
            let index = 0;
            tabs.forEach(tab => {
                const tabName = tab.getAttribute('label');
                const label = {
                    tagName: 'button',
                    classes: ['tab'],
                    innerHTML: tabName,
                    attributes: {
                        "data-content": tabName.replace(' ', '_')
                    },
                    events: {
                        click: (e) => {
                            this._root.querySelectorAll('.tabs .tab').forEach(l => l.classList.remove('active'));
                            this._root.querySelectorAll('.tabs .content').forEach(l => l.classList.remove('active'));
                            this._root.querySelector(`#${e.target.getAttribute('data-content')}`).classList.add('active');
                            this._root.querySelector(`button[data-content="${e.target.getAttribute('data-content')}"]`).classList.add('active');
                        }
                    }
                }
                children[0].children.push(label);
                const content = {
                    tagName: 'div',
                    classes: ['content'],
                    attributes: {
                        id: tabName.replace(' ', '_')
                    }
                }
                content.innerHTML = tab.innerHTML;
                children[1].children.push(content);
                if (index === 0) {
                    label.classes.push('active');
                    content.classes.push('active');
                }
                index++;
            });
            children[0].children.push({
                tagName: 'span',
                classes: ['empty']
            });
        }
        return {
            tagName: 'div',
            children: children
        }
    }

}

customElements.define('js-tabs', Tabs);
