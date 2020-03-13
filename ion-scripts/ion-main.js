const panels = document.getElementsByTagName('panel');
const titlebar = document.getElementsByTagName('app-titlebar')[0];
const settings = document.getElementsByTagName('app-settings')[0];
const ipc = require('electron').ipcRenderer;
const html = document.documentElement;

/*   settings   */

document.title = settings.getAttribute('app-name');
html.style.setProperty('--ion-app-main-color', settings.getAttribute('main-color'));
html.style.setProperty('--ion-app-shadow-color', settings.getAttribute('shadow-color'));

/*   titlebar   */

let titlebar_color = titlebar.getAttribute('color');
let titlebar_name = titlebar.getAttribute('name');

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
            titlebar_buttons[i].setAttribute('onclick', 'ion_toggle_home();');
            titlebar_buttons[i].setAttribute('data-tool', 'Home (F2)');
            titlebar_buttons[i].innerHTML = '\u2616';
            break;
    }
    titlebar_div.appendChild(titlebar_buttons[i]);
}

let titlebar_text = document.createElement('text');
titlebar_text.innerHTML = titlebar_name;
titlebar_text.setAttribute('class', 'app-home-title');
titlebar_div.appendChild(titlebar_text);

console.log(titlebar_color);

titlebar_div.setAttribute('class', 'app-titlebar');
html.style.setProperty('--ion-app-titlebar-color', titlebar_color);

document.body.insertBefore(titlebar_div, titlebar);
document.body.removeChild(titlebar);

/*   panels   */
/*
panels.forEach((item, index) => {
    panels[index].setAttribute('class', 'panel');
    switch (panels[index].getAttribute('position')) {
        case 'left':

            break;
    }
});

*/