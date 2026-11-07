/* Mosfilm official links prototype 0.1.0. No streams, proxies or downloads. */
(function (window) {
    'use strict';
    if (window.__mosfilmOfficialLinks) return;
    var state = { ready: false, attempts: 0 };
    window.__mosfilmOfficialLinks = state;
    var films = [
        { title: 'Служили два товарища (1968)', id: 'e7P3QbcI91U',
          source: 'https://www.mosfilm.ru/about/news/sluzhili-dva-tovarishcha-zavershena-tsifrovaya-restavratsiya-filma/' },
        { title: 'Ты — мне, я — тебе (1976)', id: 't2d_B0T9P5M',
          source: 'https://www.mosfilm.ru/about/news/ty-mne-ya-tebe-smotrite-otrestavrirovannuyu-versiyu-na-youtube-kanale-mosfilma/' }
    ];
    function openFilm(film) {
        var L = window.Lampa;
        L.Select.show({
            title: film.title,
            items: [
                { title: 'Открыть официальный YouTube', action: 'watch',
                  subtitle: 'Переход из Lampa. 4K заявлено Мосфильмом; качество выбирается в YouTube.' },
                { title: 'Источник: статья Мосфильма', action: 'source',
                  subtitle: 'Подтверждение реставрации и бесплатной публикации' }
            ],
            onSelect: function (item) {
                if (item.action !== 'watch' && item.action !== 'source') return;
                L.Controller.toggle('settings');
                window.location.assign(item.action === 'watch'
                    ? 'https://www.youtube.com/watch?v=' + film.id : film.source);
            },
            onBack: function () { L.Controller.toggle('settings'); }
        });
    }
    function start() {
        var L = window.Lampa;
        if (!L || !L.SettingsApi || !L.SettingsApi.addComponent || !L.SettingsApi.addParam ||
            !L.Select || !L.Select.show || !L.Controller || !L.Controller.toggle) {
            state.attempts += 1;
            if (state.attempts < 120) window.setTimeout(start, 500);
            else { delete window.__mosfilmOfficialLinks; }
            return;
        }
        if (state.ready) return;
        L.SettingsApi.addComponent({ component: 'mosfilm_official_links', name: 'Мосфильм · 4K по данным студии',
            icon: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>' });
        films.forEach(function (film, index) {
            L.SettingsApi.addParam({ component: 'mosfilm_official_links',
                param: { name: 'mosfilm_film_' + index, type: 'button' },
                field: { name: film.title, description: 'Бесплатная официальная публикация. Фактическое 2160p на устройстве не проверено.' },
                onChange: function () { openFilm(film); }
            });
        });
        state.ready = true;
    }
    start();
}(window));
