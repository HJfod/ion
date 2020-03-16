const titlebar = document.getElementsByTagName('app-titlebar')[0];
const settings = document.getElementsByTagName('app-settings')[0];
const ipc = require('electron').ipcRenderer;
const html = document.documentElement;
const $ = require('jquery');

$(document).mousemove((e) => {
    mouse_x = e.pageX;
    mouse_y = e.pageY;
});

/*   settings   */

document.title = settings.getAttribute('app-name');
html.style.setProperty('--ion-app-main-color', settings.getAttribute('main-color'));
html.style.setProperty('--ion-app-shadow-color', settings.getAttribute('shadow-color'));
html.style.setProperty('--ion-app-panel-border-color', settings.getAttribute('panel-color'));

/*   titlebar   */

let titlebar_div = document.createElement('div');


let titlebar_buttons = [];
for (let i = 0; i < 4; i++) {
    titlebar_buttons[i] = document.createElement('button');
    switch (i) {
        case 0:
            titlebar_buttons[i].setAttribute('class', 'app-home-button close');
            titlebar_buttons[i].setAttribute('onclick', 'window.close()');
            titlebar_buttons[i].setAttribute('data-tool', 'Close App (Alt + F4)');
            titlebar_buttons[i].innerHTML = '\u2715';
            break;
        case 1:
            titlebar_buttons[i].setAttribute('class', 'app-home-button fs');
            titlebar_buttons[i].setAttribute('onclick', 'ipc.send("ion-app","fs")');
            titlebar_buttons[i].setAttribute('data-tool', 'Fullscreen (F11)');
            titlebar_buttons[i].innerHTML = '\u2610';
            break
        case 2:
            titlebar_buttons[i].setAttribute('class', 'app-home-button mz');
            titlebar_buttons[i].setAttribute('onclick', 'ipc.send("ion-app","mz")');
            titlebar_buttons[i].setAttribute('data-tool', 'Minimize (Ctrl + M)');
            titlebar_buttons[i].innerHTML = '\u2500';
            break;
        case 3:
            titlebar_buttons[i].setAttribute('class', 'app-home-button hm');
            titlebar_buttons[i].setAttribute('onclick', titlebar.getAttribute('onhomeclick'));
            titlebar_buttons[i].setAttribute('data-tool', 'Home (F2)');
            titlebar_buttons[i].innerHTML = '\u2616';
            break;
    }
    titlebar_div.appendChild(titlebar_buttons[i]);
}

let titlebar_text = document.createElement('text');
titlebar_text.innerHTML = titlebar.getAttribute('name');
titlebar_text.setAttribute('class', 'app-home-title');
titlebar_div.appendChild(titlebar_text);

titlebar_div.setAttribute('class', 'app-titlebar');
html.style.setProperty('--ion-app-titlebar-color', titlebar.getAttribute('background-color'));
html.style.setProperty('--ion-app-home-title-color', titlebar.getAttribute('text-color'));

document.body.insertBefore(titlebar_div, titlebar);
document.body.removeChild(titlebar);

/*   panels   */

function sizePanelOrGroup(o) {
    let size = o.getAttribute('size');

    if (size) {
        if (o.parentNode.getAttribute('direction') === 'left-right') {
            o.style.width = size;
            o.style.flexGrow = 0;
        } else {
            o.style.height = size;
            o.style.flexGrow = 0;
        }
    }
}

class AppGroup extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        switch (this.getAttribute('direction')) {
            case 'top-down':
                this.style.flexDirection = 'column';
                break;
            case 'left-right': default:
                this.style.flexDirection = 'row';
                break;
        }

        sizePanelOrGroup(this);
    }
}

class AppPanel extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        sizePanelOrGroup(this);
    }
}

class AppMain extends HTMLElement {
    constructor() {
        super();
    }
}

class AppDragger extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.setAttribute('class', `app-dragger ${this.parentNode.getAttribute('direction')}`);
        let r = btoa(Math.round(Math.random()*256));
        while (document.getElementsByName(r).length) {
            r = btoa(Math.round(Math.random() * 256));
        }
        this.setAttribute('name',r);
        this.setAttribute('data-menu', `Toggle panel=>toggle_panel("`+ r + `")`);
        this.addEventListener('mousedown', drag_on);
    }
}

customElements.define('app-group', AppGroup);
customElements.define('app-panel', AppPanel);
customElements.define('app-main', AppMain);
customElements.define('app-dragger', AppDragger);

/*   draggers   */

document.addEventListener('mouseup', drag_off);

let dragger_click;

function toggle_panel(which) {
    which = document.getElementsByName(which)[0];
    console.log(which);
    let obj = Array.prototype.slice.call(which.parentElement.children);
    let i = obj.indexOf(which);
    let o, refer = which.getAttribute('refer');

    switch (refer) {
        case 'above':
            o = obj[i - 1];
            break;
        case 'below':
            o = obj[i + 1];
            break;
        default:
            if (obj[i - 1].hasAttribute('size')) {
                o = obj[i - 1];
            } else if (obj[i + 1].hasAttribute('size')) {
                o = obj[i + 1];
            } else {
                o = obj[i - 1];
            }
    }

    if (o.style.display !== 'none') {
        o.style.display = 'none';
    } else {
        o.style.display = 'flex';
    }
}

function drag_on(e) {
    e.preventDefault();
    let obj = Array.prototype.slice.call(e.target.parentElement.children);
    let i = obj.indexOf(e.target);
    let o, p, m, off = 0, refer = e.target.getAttribute('refer');

    switch (refer) {
        case 'above':
            o = obj[i - 1]; p = 1; m = -1;
            break;
        case 'below':
            o = obj[i + 1]; p = 0; m = 1;
            break;
        default:
            if (obj[i - 1].hasAttribute('size')) {
                o = obj[i - 1]; p = 1; m = -1;
            } else if (obj[i + 1].hasAttribute('size')) {
                o = obj[i + 1]; p = 0; m = 1;
            } else {
                o = obj[i - 1]; p = 1; m = -1; o.style.flexGrow = '0';
            }
    }

    let w, h;
    if (e.target.getAttribute('class') == 'app-dragger left-right') {
        w = (Number(o.style.width.replace('px', '')));
        off = mouse_x;
    } else {
        h = (Number(o.style.height.replace('px', '')));
        off = mouse_y;
    }

    dragging(e.target, o, p, off, w, h);
}

function dragging(e, o, p, offset, w, h) {
    if (e.getAttribute('class') == 'app-dragger left-right') {
        o.style.width = p ? w - offset + mouse_x + 'px' : w + offset - mouse_x + 'px';
        document.body.style.cursor = 'ew-resize';
        if (o.hasAttribute('min-size')) {
            if (Number(o.style.width.replace('px', '')) < Number(o.getAttribute('min-size').replace('px', ''))) {
                o.style.width = o.getAttribute('min-size');
            }
        }
    } else {
        o.style.height = p ? h - offset + mouse_y + 'px' : h + offset - mouse_y + 'px';
        document.body.style.cursor = 'ns-resize';
        if (o.hasAttribute('min-size')) {
            if (Number(o.style.height.replace('px', '')) < Number(o.getAttribute('min-size').replace('px', ''))) {
                o.style.height = o.getAttribute('min-size');
            }
        }
    }

    dragger_click = setTimeout(() => { if (dragger_click != null) { dragging(e, o, p, offset, w, h) } }, 1 );
}

function drag_off(e) {
    clearTimeout(dragger_click);
    dragger_click = null;
    document.body.style.cursor = 'initial';
}