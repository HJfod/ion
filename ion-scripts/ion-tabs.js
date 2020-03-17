function ion_tabs_switch_to(where, tab) {
    pages = arr(document.getElementsByTagName('app-pages'));
    for (i in pages) {
        if (pages[i].getAttribute('from') === where) {
            arr(pages[i].children).forEach((item, index) => {
                item.style.display = 'none';
                if (item.getAttribute('link') === tab) {
                    item.style.display = 'initial';
                }
            });
            break;
        }
    }
}

class AppTabs extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        arr(this.children).forEach((item, index) => {
            item.style.height = this.getAttribute('tab-height');
            item.style.color = this.getAttribute('text-color');
            if (item.hasAttribute('default')) {
                ion_tabs_switch_to(this.getAttribute('destination'),item.getAttribute('link'));
            }
        });
    }
}

class AppTab extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.setAttribute('onclick', `ion_tabs_switch_to("${this.parentElement.getAttribute('destination')}","${this.getAttribute('link')}")`);
        this.innerHTML = this.getAttribute('name');
    }
}

customElements.define('app-tabs', AppTabs);
customElements.define('app-tab', AppTab);