/* Mosfilm menu prototype 0.4.0. Experimental RUTUBE iframe adapter. Device playback unverified; no direct media streams. */
(function (window) {
    'use strict';
    if (window.__mosfilmMenuRutubeV04) return;
    var state = {ready: false, attempts: 0};
    window.__mosfilmMenuRutubeV04 = state;
    var films = [
        {title: 'Деловые люди (1962)', id: 'b13ef664275a06c4dc6e46337cc52719', poster: 'https://www.mosfilm.ru/upload/iblock/0c2/mxjngg4dd3fd50wntbvp6h9fp5e6gr1q/1e9cb99488fe283aceba63ba354cc7c5.jpg'},
        {title: 'Земля Санникова (1973)', id: '517a03c96cb712b66c3490e8c5460271', poster: 'https://www.mosfilm.ru/upload/iblock/22a/zo4t9z6y7lsxliv4lxf0mvx3pd40avkg/1920x-_5_.webp'}
    ];
    // Documented RUTUBE embed bridge. No stream extraction, ad suppression or external navigation.
    function rutubeId(url) {
        var match = /^https:\/\/rutube\.ru\/video\/([a-f0-9]{32})\/?$/.exec(String(url || ''));
        return match ? match[1] : '';
    }
    function createRutube(callVideo) {
        var $ = window.jQuery || window.$;
        var box = $('<div style="position:absolute;inset:0;width:100%;height:100%"></div>');
        var video = box[0], frame, src = '', ready = false, dead = false, timer;
        var callbacks = {}, current = 0, duration = 0, volume = 1, paused = true;
        var desiredPlay = false, pendingSeek = null;
        function emit(name) { (callbacks[name] || []).slice().forEach(function (fn) { fn({type:name}); }); }
        function send(type, data) {
            if (!dead && ready && frame) frame.contentWindow.postMessage(JSON.stringify({type:type, data:data || {}}), 'https://rutube.ru');
        }
        function fail(message) {
            if (dead) return;
            window.clearTimeout(timer);
            video.error = {code: 4, message: message};
            window.Lampa.Noty.show(message);
            emit('error');
        }
        function receive(event) {
            if (dead || !frame || event.origin !== 'https://rutube.ru' || event.source !== frame.contentWindow) return;
            var msg;
            try { msg = typeof event.data === 'string' ? JSON.parse(event.data) : event.data; } catch (e) { return; }
            if (!msg || typeof msg !== 'object') return;
            var data = msg.data || {};
            if (msg.type === 'player:ready') {
                ready = true; window.clearTimeout(timer);
                send('player:setVolume', {volume:volume});
                if (pendingSeek !== null) send('player:setCurrentTime', {time:pendingSeek});
                emit('canplay');
                if (desiredPlay) send('player:play');
            }
            if (msg.type === 'player:durationChange' && typeof data.duration === 'number' && isFinite(data.duration) && data.duration >= 0) {
                duration = data.duration; emit('loadeddata');
            }
            if (msg.type === 'player:currentTime' && typeof data.time === 'number' && isFinite(data.time) && data.time >= 0) {
                current = data.time; emit('timeupdate');
            }
            if (msg.type === 'player:changeState') {
                if (data.state === 'playing') { paused = false; emit('playing'); }
                if (data.state === 'paused') { paused = true; emit('pause'); }
            }
            if (msg.type === 'player:playComplete') { paused = true; emit('ended'); }
            if (msg.type === 'player:error') fail('RUTUBE не смог воспроизвести видео. Код: ' + String(data.code || 'не указан').slice(0,30));
            if (msg.type === 'player:qualityList' && Array.isArray(data.list)) {
                // Offered quality is not proof of the currently decoded resolution.
                video.rutubeAvailableQualities = data.list.filter(function (n) { return typeof n === 'number' && isFinite(n) && n > 0; });
            }
        }
        Object.defineProperties(video, {
            src: {get:function(){return src;}, set:function(value){src=value;}},
            currentTime: {get:function(){return current;}, set:function(value){
                if (typeof value === 'number' && isFinite(value) && value >= 0) { pendingSeek=value; send('player:setCurrentTime',{time:value}); }
            }},
            duration: {get:function(){return duration;}}, paused: {get:function(){return paused;}},
            volume: {get:function(){return volume;}, set:function(value){
                if (typeof value === 'number' && isFinite(value)) { volume=Math.max(0,Math.min(1,value));send('player:setVolume',{volume:volume}); }
            }},
            videoWidth: {get:function(){return 0;}}, videoHeight: {get:function(){return 0;}},
            audioTracks: {get:function(){return [];}}, textTracks: {get:function(){return [];}}
        });
        video.addEventListener = function(name, fn) { (callbacks[name] || (callbacks[name]=[])).push(fn); };
        video.removeEventListener = function(name, fn) { callbacks[name]=(callbacks[name] || []).filter(function(f){return f!==fn;}); };
        video.load = function() {
            if (dead || frame) return;
            var id = rutubeId(src); if (!id) { fail('Неверная ссылка RUTUBE.'); return; }
            frame = window.document.createElement('iframe');
            frame.src = 'https://rutube.ru/play/embed/' + id;
            frame.setAttribute('allow','autoplay; fullscreen'); frame.setAttribute('allowfullscreen','true');
            frame.setAttribute('title','Мосфильм · RUTUBE');
            frame.style.cssText = 'border:0;width:100%;height:100%;display:block';
            window.addEventListener('message', receive);
            box.append(frame);
            timer=window.setTimeout(function(){fail('Плеер RUTUBE не ответил. Нажмите Назад.');},30000);
        };
        video.play = function(){desiredPlay=true;send('player:play');};
        video.pause = function(){desiredPlay=false;send('player:pause');};
        video.canPlayType = function(){return true;};
        video.resize = video.size = video.speed = function(){};
        video.destroy = function(){
            if (dead) return;
            send('player:stop'); dead=true; window.clearTimeout(timer);
            window.removeEventListener('message',receive);
            if(frame) frame.remove(); frame=null; callbacks={}; box.remove();
        };
        callVideo(video);
        return box;
    }

    // Native Lampa row/cards preserve its directional controller and lazy image loading.
    function homeRow() {
        return {title: 'Мосфильм · RUTUBE · 4K по данным студии', mosfilmRow: true,
            results: films.map(function(film){
                return {id:'mosfilm_' + film.id, title:film.title, poster:film.poster,
                    params:{emit:{
                        onlyEnter:function(){
                            var L=window.Lampa;
                            var url='https://rutube.ru/video/' + film.id + '/';
                            if (!L.PlayerVideo.verifyTube(url)) { L.Noty.show('Адаптер RUTUBE недоступен.'); return; }
                            L.Player.callback(function(){L.Controller.toContent();});
                            L.Player.play({url:url,title:film.title,launch_player:'inner'});
                        },
                        onlyLong:function(){window.Lampa.Noty.show('Официальная публикация Мосфильма. Фактические 2160p не проверены.');}
                    }}}
            })};
    }
    function installHomeRow() {
        var L=window.Lampa;
        if (!L.Api || typeof L.Api.main !== 'function' || !L.Controller.toContent) return false;
        var original=L.Api.main;
        if(original.mosfilmHomeRow) return true;
        function main(params, done, fail) {
            var added=false;
            return original.call(this,params,function(rows){
                if (!Array.isArray(rows)) return done.apply(this,arguments);
                var next=rows.slice();
                if (!added) {
                    added=true;
                    if (!next.some(function(row){return row && row.mosfilmRow;})) next.unshift(homeRow());
                }
                return done.call(this,next);
            },fail);
        }
        main.mosfilmHomeRow=true;
        L.Api.main=main;
        return true;
    }
    function showFilms() {
        var L = window.Lampa;
        L.Select.show({
            title: 'Мосфильм · 2 фильма · пробная версия',
            items: films.map(function (film, index) {
                return {title: film.title, index: index,
                    subtitle: 'Официальный RUTUBE · 4K в названии публикации. Фактические 2160p не проверены.'};
            }),
            onBack: function () { L.Controller.toggle('menu'); },
            onSelect: function (item) {
                var film = item && typeof item.index === 'number' && films[item.index];
                if (!film) { L.Controller.toggle('menu'); return; }
                var url = 'https://rutube.ru/video/' + film.id + '/' ;
                if (!L.PlayerVideo || typeof L.PlayerVideo.verifyTube !== 'function' || !L.PlayerVideo.verifyTube(url)) {
                    L.Noty.show('Эта версия Lampa не поддерживает адаптер RUTUBE. Переход на сайт отключён.');
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
            else delete window.__mosfilmMenuRutubeV04;
            return;
        }
        if (state.ready) return;
        if (!L.PlayerVideo || typeof L.PlayerVideo.registerTube !== 'function') {
            L.Noty.show('Для RUTUBE требуется Lampa с поддержкой адаптеров плеера.');
            delete window.__mosfilmMenuRutubeV04; return;
        }
        L.PlayerVideo.registerTube({name:'Mosfilm RUTUBE', verify:function(url){return !!rutubeId(url);}, create:createRutube});
        state.homeRowInstalled=installHomeRow();
        var button = $('<li class="menu__item selector" data-mosfilm-menu="0.4.0">' +
            '<div class="menu__ico"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></div>' +
            '<div class="menu__text">Мосфильм</div></li>');
        button.on('hover:enter', showFilms);
        $('.menu .menu__list').eq(0).append(button);
        state.ready = true;
    }
    start();
}(window));
