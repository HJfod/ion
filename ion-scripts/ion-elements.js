class AppSlider extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let w = Number(getComputedStyle(html).getPropertyValue('--ion-app-slider-width').replace('px', ''));

        let knob = document.createElement('div');
        knob.setAttribute('class', 'app-slider-knob');
        knob.style.marginLeft = (w / (this.getAttribute('max') - this.getAttribute('min'))) * this.getAttribute('default') + 'px';
        this.appendChild(knob);

        this.setAttribute('onmousedown', 'app_slider_move(event)');
        let t = document.createElement('text');
        t.setAttribute('class', 'app-slider-text');
        t.innerHTML = this.getAttribute('default');
        this.appendChild(t);
    }
}

let slider_timeout = null;

function app_slider_move(e) {
    e.preventDefault();
    let b;
    
    switch (e.target.tagName) {
        case 'APP-SLIDER':
            b = $(e.target).children().first();
            break;
        case 'DIV':
            b = $(e.target);
            break;
        default:
            return;
    }
    moving_slider(b);
}

var testvar = 0;

function moving_slider(s) {
    pos = s.position().left;

    s.css('margin-left', mouse_x - pos).css('background-color','var(--ion-app-extra-color)');

    let w = Number(s.parent().css('width').replace('px', ''));
    let l = Number((s.css('margin-left')).replace('px', ''));
    let m = Number(getComputedStyle(html).getPropertyValue('--ion-app-slider-size').replace('px',''));

    if (pos + l > pos + w - m) {
        s.css('margin-left', w - m);
    }
    if (pos + l < pos) {
        s.css('margin-left', 0);
    }

    let max = Number(s.parent().attr('max')), min = Number(s.parent().attr('min')), b = Number(getComputedStyle(html).getPropertyValue('--ion-app-slider-size').replace('px', '')), inc = Number(s.parent().attr('increment'));
    let calc = (Math.round((Number(s.css('margin-left').replace('px', '')) / ((w - b) / (max - min)) + min) * (1 / inc)) / (1 / inc));
    s.parent().children().last().text(calc);

    if (s.parent().attr('affect') !== undefined) {
        window[s.parent().attr('affect')] = calc;
    }

    slider_timeout = setTimeout(() => { if (slider_timeout != null) { moving_slider(s) } else { s.css('background-color','') } }, 1);
}

function app_slider_stop_move() {
    slider_timeout = null;
}

customElements.define('app-slider', AppSlider);