/* Mosfilm menu prototype 0.2.0. Uses Lampa's official YouTube iframe adapter, not direct media streams. */
(function (window) {
    'use strict';
    if (window.__mosfilmMenuV02) return;
    var state = {ready: false, attempts: 0};
    window.__mosfilmMenuV02 = state;
    var films = [
        {title: 'Служили два товарища (1968)', id: 'e7P3QbcI91U'},
        {title: 'Ты — мне, я — тебе (1976)', id: 't2d_B0T9P5M'}
    ];
    function showFilms() {
        var L = window.Lampa;
        L.Select.show({
            title: 'Мосфильм · 2 фильма · пробная версия',
            items: films.map(function (film, index) {
                return {title: film.title, index: index,
                    subtitle: 'Официальный YouTube внутри Lampa. 4K заявлено студией, на устройстве не проверено.'};
            }),
            onBack: function () { L.Controller.toggle('menu'); },
            onSelect: function (item) {
                var film = item && typeof item.index === 'number' && films[item.index];
                if (!film) { L.Controller.toggle('menu'); return; }
                var url = 'https://www.youtube.com/watch?v=' + film.id;
                if (!L.PlayerVideo || typeof L.PlayerVideo.verifyTube !== 'function' || !L.PlayerVideo.verifyTube(url)) {
                    L.Noty.show('Эта версия Lampa не поддерживает YouTube внутри плеера. Переход на сайт отключён.');
                    L.Controller.toggle('menu');
                    return;
                }
                L.Player.callback(showFilms);
                L.Player.play({url: url, title: film.title, launch_player: 'inner'});
            }
        });
    }
    function start() {
        var L = window.Lampa;
        var $ = window.jQuery || window.$;
        if (!window.appready || !$ || !L || !L.Player || !L.Player.play || !L.Player.callback ||
            !L.Select || !L.Select.show || !L.Controller || !L.Controller.toggle || !L.Noty || !L.Noty.show ||
            !$('.menu .menu__list').eq(0).length) {
            state.attempts += 1;
            if (state.attempts < 120) window.setTimeout(start, 500);
            else delete window.__mosfilmMenuV02;
            return;
        }
        if (state.ready) return;
        var button = $('<li class="menu__item selector" data-mosfilm-menu="0.2.0">' +
            '<div class="menu__ico"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></div>' +
            '<div class="menu__text">Мосфильм</div></li>');
        button.on('hover:enter', showFilms);
        $('.menu .menu__list').eq(0).append(button);
        state.ready = true;
    }
    start();
}(window));
