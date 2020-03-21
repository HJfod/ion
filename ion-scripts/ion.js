function loadJS(url) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.defer = true;
    document.getElementsByTagName('head')[0].appendChild(script);
}

function loadCSS(url) {
    let script = document.createElement('link');
    script.rel = 'stylesheet';
    script.href = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

loadJS("ion-scripts/ion-main.js");
loadJS("ion-scripts/ion-menu-toolbox.js");
loadJS("ion-scripts/ion-tabs.js");
loadCSS("ion-scripts/ion-main.css");
loadCSS("ion-scripts/ion-menu-toolbox.css");
loadCSS("ion-scripts/ion-tabs.css");