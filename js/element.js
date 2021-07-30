class Element extends HTMLElement {
    
    constructor() {
        super();
        this._root = this.attachShadow({mode: 'closed'});
    }
    
    json() {
        return null;
    }
    
    render() {        
        this._root.innerHTML = '';

        // Get attributes not updatables
        this.name = this.getAttribute('name');

        // Json configuration
        const _element = this.json();
    
        const cssVariablesAttribute = this.getAttribute('variables');
        
        // Style CSS
        const cssVariables = document.createElement('link');
        cssVariables.rel = 'stylesheet';
        cssVariables.type = 'text/css';
        if (cssVariablesAttribute) {
            cssVariables.href = cssVariablesAttribute;
        } else {
            cssVariables.href = 'css/components-variables.min.css';
        }
        this._root.appendChild(cssVariables);

        const styleSheet = document.createElement('link');
        styleSheet.rel = 'stylesheet';
        styleSheet.type = 'text/css';
        styleSheet.href = 'css/components.min.css';
        this._root.appendChild(styleSheet);

        // Main div with class "field"
        const mainDiv = document.createElement('div');
        if (this.classes) {
            this.classes.forEach(c => mainDiv.classList.add(c));
        }

        // Render element
        const createChildElement = (node) => {
            let element;
            if (node) {
                element = document.createElement(node.tagName);
                if (node.classes) {
                    node.classes.forEach(c => element.classList.add(c));
                }
                if (node.innerHTML) {
                    element.innerHTML = node.innerHTML;
                }
                if (node.attributes) {
                    Object.keys(node.attributes).forEach(key => {
                        if (node.attributes[key]) {
                            element.setAttribute(key, node.attributes[key]);
                        }
                    });
                }
                if (node.children) {
                    node.children.forEach(child => element.appendChild(createChildElement(child)))
                }
                if (node.events) {
                    Object.keys(node.events).forEach(key => {
                        if (node.events[key]) {
                            element.addEventListener(key, node.events[key]);
                        }
                    });
                }
            }
            return element;
        };

        const element = createChildElement(_element);
        if (element) {
            mainDiv.appendChild(element);
        }

        this._root.appendChild(mainDiv);
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    connectedCallback() {
        this.render();
    }
}