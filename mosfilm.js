/* Mosfilm menu prototype 0.5.0. Experimental RUTUBE iframe adapter. Device playback unverified; no direct media streams. */
(function (window) {
    'use strict';
    if (window.__mosfilmMenuRutubeV05) return;
    var state = {ready: false, attempts: 0};
    window.__mosfilmMenuRutubeV05 = state;
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

    function MosfilmPage() {
        var L=window.Lampa, $=window.jQuery || window.$, self=this;
        var scroll=new L.Scroll({mask:true,over:true});
        var html=$('<div class="mosfilm-page" style="padding:1.5em"></div>');
        var cards=[], active=0, built=false, destroyed=false;
        var grid=$('<div style="display:flex;gap:2em;align-items:flex-start"></div>');
        html.append($('<h2 style="margin:0 0 1em">Мосфильм</h2>'));
        html.append($('<div style="margin-bottom:1.5em;opacity:.75">Официальные фильмы RUTUBE. Фактические 2160p не проверены.</div>'));
        html.append(grid); scroll.append(html);
        function focus(index) {
            active=Math.max(0,Math.min(cards.length-1,index));
            L.Controller.collectionFocus(cards[active],html);
        }
        films.forEach(function(film,index){
            var card=$('<div class="selector card" style="width:12em;flex:0 0 12em"></div>');
            var image=$('<img style="display:block;width:100%;height:18em;object-fit:contain;background:#222;border-radius:.4em" />');
            image.attr('src',film.poster).attr('alt',film.title);
            image.on('error',function(){image.hide();card.find('.mosfilm-image-error').show();});
            card.append(image);
            card.append($('<div class="mosfilm-image-error" style="display:none;height:18em;background:#222;padding:1em">Постер недоступен. Фильм можно открыть.</div>'));
            card.append($('<div style="margin-top:.6em"></div>').text(film.title));
            card.on('hover:focus',function(){
                active=index;
                cards.forEach(function(other){other.css('outline','none');});
                card.css('outline','0.2em solid #fff').css('outline-offset','0.4em');
                scroll.update(card);
            });
            card.on('hover:enter',function(){
                var url='https://rutube.ru/video/' + film.id + '/';
                if(!L.PlayerVideo.verifyTube(url)){L.Noty.show('Адаптер RUTUBE недоступен.');return;}
                active=index;
                L.Player.callback(function(){if(!destroyed) self.start();});
                L.Player.play({url:url,title:film.title,launch_player:'inner'});
            });
            cards.push(card);grid.append(card);
        });
        this.create=function(){
            if(!built){built=true;if(this.activity && this.activity.loader)this.activity.loader(false);}
            return this.render();
        };
        this.render=function(){return scroll.render();};
        this.start=function(){
            if(destroyed)return;
            L.Controller.add('content',{
                toggle:function(){L.Controller.collectionSet(html);focus(active);},
                left:function(){if(active>0)focus(active-1);else L.Controller.toggle('menu');},
                right:function(){if(active<cards.length-1)focus(active+1);},
                up:function(){L.Controller.toggle('head');},
                down:function(){},
                back:function(){L.Activity.backward();}
            });
            L.Controller.toggle('content');
        };
        this.pause=this.stop=function(){};
        this.destroy=function(){destroyed=true;cards.forEach(function(c){c.off();c.find('img').off();});scroll.destroy();html.remove();cards=[];};
    }
    function showFilms(){
        var L=window.Lampa;
        var current=L.Activity.active && L.Activity.active();
        if(current && current.component==='mosfilm_rutube_page') {L.Controller.toContent();return;}
        L.Activity.push({url:'',title:'Мосфильм',component:'mosfilm_rutube_page',page:1});
    }
    function start() {
        var L = window.Lampa;
        var $ = window.jQuery || window.$;
        if (!window.appready || !$ || !L || !L.Player || !L.Player.play || !L.Player.callback ||
            !L.Component || !L.Component.add || !L.Activity || !L.Activity.push || !L.Scroll ||
            !L.Controller || !L.Controller.add || !L.Controller.collectionSet || !L.Controller.collectionFocus || !L.Controller.toggle || !L.Noty || !L.Noty.show ||
            !$('.menu .menu__list').eq(0).length) {
            state.attempts += 1;
            if (state.attempts < 120) window.setTimeout(start, 500);
            else delete window.__mosfilmMenuRutubeV05;
            return;
        }
        if (state.ready) return;
        if (!L.PlayerVideo || typeof L.PlayerVideo.registerTube !== 'function') {
            L.Noty.show('Для RUTUBE требуется Lampa с поддержкой адаптеров плеера.');
            delete window.__mosfilmMenuRutubeV05; return;
        }
        L.PlayerVideo.registerTube({name:'Mosfilm RUTUBE', verify:function(url){return !!rutubeId(url);}, create:createRutube});
        L.Component.add('mosfilm_rutube_page',MosfilmPage);
        var button = $('<li class="menu__item selector" data-mosfilm-menu="0.5.0">' +
            '<div class="menu__ico"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></div>' +
            '<div class="menu__text">Мосфильм</div></li>');
        button.on('hover:enter', showFilms);
        $('.menu .menu__list').eq(0).append(button);
        state.ready = true;
    }
    start();
}(window));
