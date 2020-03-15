$('[data-menu]').contextmenu((e) => {
    e.preventDefault();
    let m = $('app-contextmenu');

    let ta = $(e.target);

    let i = 0;
    while (ta.attr('data-menu') == undefined) {
        if (i < 50) {
            i++;
        } else {
            return false;
        }
        ta = ta.parent();
    }

    let v = ta.attr('data-menu');
    v = v.split('//');

    for (let i = 0; i < v.length; i++) {
        if (v[i] === '---') {
            let n_s = document.createElement('text');
            n_s.innerHTML = '───────────';
            n_s.setAttribute('class', 'menu_separator');
            m.append(n_s);
        } else {
            v[i] = v[i].split('=>');
            let n_o = document.createElement('button');
            n_o.innerHTML = v[i][0];
            n_o.setAttribute('class', 'menu_option');
            n_o.setAttribute('onmouseup', v[i][2]);
            m.append(n_o);
        }
    }

    let mex = mouse_x, mey = mouse_y;
    if (mouse_x > window.innerWidth - Number(m.css('width').replace('px', ''))) {
        mex = mouse_x - Number(m.css('width').replace('px', ''));
    }
    if (mouse_y > window.innerHeight - Number(m.css('height').replace('px', ''))) {
        mey = mouse_y - Number(m.css('height').replace('px', ''));
    }
    m.css('left', mex + 'px').css('top', mey + 'px');

    m.show();
});