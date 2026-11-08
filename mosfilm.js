/* Mosfilm menu prototype 0.7.0. Experimental RUTUBE iframe adapter. Device playback unverified; no direct media streams. */
(function (window) {
    'use strict';
    if (window.__mosfilmMenuRutubeV07) return;
    var state = {ready: false, attempts: 0};
    window.__mosfilmMenuRutubeV07 = state;
    var films = [
    {
        "title": "Деловые люди (1962)",
        "id": "b13ef664275a06c4dc6e46337cc52719",
        "poster": "https://www.mosfilm.ru/upload/iblock/0c2/mxjngg4dd3fd50wntbvp6h9fp5e6gr1q/1e9cb99488fe283aceba63ba354cc7c5.jpg",
        "publicationTitle": "Деловые люди (1962) — Леонид Гайдай | комедия | Мосфильм 4K",
        "duration": "01:23:46",
        "description": "Экранизация трёх рассказов О. Генри: «Дороги, которые мы выбираем», «Родственные души» и «Вождь краснокожих».",
        "descriptionSource": "https://www.mosfilm.ru/cinema/films/delovye-lyudi/"
    },
    {
        "title": "Земля Санникова (1973)",
        "id": "517a03c96cb712b66c3490e8c5460271",
        "poster": "https://www.mosfilm.ru/upload/iblock/22a/zo4t9z6y7lsxliv4lxf0mvx3pd40avkg/1920x-_5_.webp",
        "publicationTitle": "Земля Санникова (1973) — Мкртчян, Попов | приключения | Mosfilm 4K",
        "duration": "01:33:25",
        "description": "Приключения русской экспедиции, открывшей на Крайнем Севере неизвестную землю с доисторической жизнью. По роману Владимира Обручева.",
        "descriptionSource": "https://www.mosfilm.ru/cinema/films/zemlya-sannikova/"
    },
    {
        "title": "\"О спорт, ты - мир!\" (1980)",
        "id": "f836d141ec5d199c16a1efa9aaeb832e",
        "poster": null,
        "publicationTitle": "\"О спорт, ты - мир!\" (4К, документальный, реж. Юрий Озеров, 1980 г.)",
        "duration": "02:27:51",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Американская дочь (1995)",
        "id": "f594c020efcdbe4132ea5e9c8427427c",
        "poster": null,
        "publicationTitle": "Американская дочь (4K, драма, реж. Карен Шахназаров, 1995 г.)",
        "duration": "01:37:35",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Анна Каренина. История Вронского (2017)",
        "id": "4d9ace7f17adfc0bee49c07da1a4b5d8",
        "poster": "https://pic.rtbcdn.ru/video/be/3a/be3a6ce67f6e5b873c346d8a5958be20.jpg?size=l",
        "publicationTitle": "Анна Каренина. История Вронского (4К) (мелодрама, реж. Карен Шахназаров, 2017 г.)",
        "duration": "02:18:05",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Анна Каренина. Фильм 1 (2017)",
        "id": "5115847ea90aa493dae6421289f36830",
        "poster": null,
        "publicationTitle": "Анна Каренина. Фильм 1 (4К, драма, реж. Карен Шахназаров, 2017 г.)",
        "duration": "01:23:38",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Анна Каренина. Фильм 2 (2017)",
        "id": "2b8e4afc36ff1c3c0da93007c2507bcb",
        "poster": null,
        "publicationTitle": "Анна Каренина. Фильм 2 (4К, драма, реж. Карен Шахназаров, 2017 г.)",
        "duration": "01:22:58",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Анна Каренина. Фильм 3 (2017)",
        "id": "0b73d5d4d1b2e7ed9866af1f9233733a",
        "poster": null,
        "publicationTitle": "Анна Каренина. Фильм 3 (4К, драма, реж. Карен Шахназаров, 2017 г.)",
        "duration": "01:31:30",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Анна Каренина. Фильм 4 (2017)",
        "id": "1b6705254dcf9e0205f0ef17ce94e751",
        "poster": null,
        "publicationTitle": "Анна Каренина. Фильм 4 (4К, драма, реж. Карен Шахназаров, 2017 г.)",
        "duration": "01:28:36",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Анна Павлова",
        "id": "9525d4347475943a6d865ce040854554",
        "poster": null,
        "publicationTitle": "Анна Павлова (4К) Легенда мирового балета",
        "duration": "02:32:00",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Бег, 1 серия (1970)",
        "id": "0667aa33b0435d954f698d4d55cc90f1",
        "poster": null,
        "publicationTitle": "Бег, 1 серия (4К, драма, реж. Александр Алов, Владимир Наумов, 1970 г.)",
        "duration": "01:33:08",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Бег, 2 серия (1970)",
        "id": "c6f99f74e5172ab99b0a3e0a7e6ee956",
        "poster": "https://pic.rtbcdn.ru/video/2025-02-14/6b/60/6b606ce3c810da50792ca3e9a54f79e6.jpg?size=l",
        "publicationTitle": "Бег, 2 серия (4К, драма, реж. Александр Алов, Владимир Наумов, 1970 г.)",
        "duration": "01:40:10",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Берегись автомобиля (1966)",
        "id": "e6bb01652353356ca0333f34a957353c",
        "poster": null,
        "publicationTitle": "Берегись автомобиля (4K, комедия, реж. Эльдар Рязанов, 1966 г.)",
        "duration": "01:32:59",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Битва за Москву: \"Агрессия\". Серия 1 (1985)",
        "id": "d6f214540607cdc5919d980703acec72",
        "poster": "https://pic.rtbcdn.ru/video/2025-05-06/7f/72/7f72a85f86ed1592a162f15ba9c358c4.jpg?size=l",
        "publicationTitle": "Битва за Москву: \"Агрессия\". Серия 1 (4К, военный, реж. Юрий Озеров, 1985 г.)",
        "duration": "01:21:43",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Битва за Москву: \"Агрессия\". Серия 2 (1985)",
        "id": "6e5439b46354f63c7660fa86e1e3d88f",
        "poster": null,
        "publicationTitle": "Битва за Москву: \"Агрессия\". Серия 2 (4К, военный, реж. Юрий Озеров, 1985 г.)",
        "duration": "01:32:32",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Битва за Москву: \"Тайфун\". Серия 1 (1985)",
        "id": "ba782d6ccd0199d3f1d457f87e479ec8",
        "poster": null,
        "publicationTitle": "Битва за Москву: \"Тайфун\". Серия 1 (4К, военный, реж. Юрий Озеров, 1985 г.)",
        "duration": "01:27:08",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Битва за Москву: \"Тайфун\". Серия 2 (1985)",
        "id": "b95f4ba6b30bf112ea1aa59347dfd020",
        "poster": "https://pic.rtbcdn.ru/video/2025-05-06/05/39/05391f0fe5bd67d47e23eaf3aa00965e.jpg?size=l",
        "publicationTitle": "Битва за Москву: \"Тайфун\". Серия 2 (4К, военный, реж. Юрий Озеров, 1985 г.)",
        "duration": "01:33:09",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Владивосток (2021)",
        "id": "6dd052a50f9a9d219092ef75f05f6607",
        "poster": null,
        "publicationTitle": "Владивосток (4К, драма, реж. Антон Борматов, 2021 г.)",
        "duration": "01:36:51",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Внимание, черепаха! (1969)",
        "id": "591b87fe05726931c18aeb7d55bcd109",
        "poster": null,
        "publicationTitle": "Внимание, черепаха! (1969) — Ролан Быков | детская комедия | Мосфильм 4K",
        "duration": "01:25:20",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Гори, гори, моя звезда (1969)",
        "id": "90bd6d6e5386629a5acb4ee79ae5a5e9",
        "poster": null,
        "publicationTitle": "Гори, гори, моя звезда (1969) — Александр Митта | трагикомедия | Мосфильм 4K",
        "duration": "01:34:02",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Гранатовый браслет (1964)",
        "id": "01a787842a4825f7d1ad5b32ef884949",
        "poster": null,
        "publicationTitle": "Гранатовый браслет (1964) — Абрам Роом | драма | Мосфильм 4K",
        "duration": "01:30:07",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Дайте жалобную книгу (1964)",
        "id": "7ac9df1b7bc81d726262bc363bece056",
        "poster": "https://pic.rtbcdn.ru/video/2026-05-22/e7/74/e77441287f6d2d76916cde6c107c726f.jpg?size=l",
        "publicationTitle": "Дайте жалобную книгу (4К, комедия, реж. Эльдар Рязанов, 1964 г.)",
        "duration": "01:29:33",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Добряки (1979)",
        "id": "c075e93fa35900ab99b0e07877d4f47e",
        "poster": null,
        "publicationTitle": "Добряки (4K, комедия, реж. Карен Шахназаров, 1979 г.)",
        "duration": "17:17:21",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Еще раз про любовь (1968)",
        "id": "0648fd5f7438d672b72c5d50c0b8cf2b",
        "poster": null,
        "publicationTitle": "Еще раз про любовь (4K, мелодрама, реж. Георгий Натансон, 1968 г.)",
        "duration": "01:35:30",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Жена керосинщика (1988)",
        "id": "8a7cfdf45c6ce53b7174528ac5d21edf",
        "poster": null,
        "publicationTitle": "Жена керосинщика (4К, драма, реж. Александр Кайдановский, 1988 г.)",
        "duration": "01:39:13",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Живые и мертвые 1-я серия (1963)",
        "id": "29b1086da8430396818cae153c50d3c0",
        "poster": "https://pic.rtbcdn.ru/video/2025-04-28/b3/7f/b37fc8923c1117a02a0ad7241da661cc.jpg?size=l",
        "publicationTitle": "Живые и мертвые 1-я серия (4K, драма, реж. Александр Столпер, 1963 г.)",
        "duration": "01:38:08",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Живые и мертвые 2-я серия (1963)",
        "id": "47379a09d29f42d7d18892fb82e5475f",
        "poster": null,
        "publicationTitle": "Живые и мертвые 2-я серия (4K, драма, реж. Александр Столпер, 1963 г.)",
        "duration": "01:39:29",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Жизнь прекрасна (1980)",
        "id": "5e4eb41dc56647c92b6a50111c4b413c",
        "poster": null,
        "publicationTitle": "Жизнь прекрасна (4К, драма, реж. Григорий Чухрай, 1980 г.)",
        "duration": "01:39:16",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Забытая мелодия для флейты (1987)",
        "id": "a0ca452d03459724da4073233dffe314",
        "poster": null,
        "publicationTitle": "Забытая мелодия для флейты (4К, драма, реж. Эльдар Рязанов, 1987 г.)",
        "duration": "02:12:23",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Зеркало (1974)",
        "id": "1c21a6b23a01475a06e8131813f72c21",
        "poster": null,
        "publicationTitle": "Зеркало (4К, драма, реж. Андрей Тарковский, 1974 г.)",
        "duration": "01:46:47",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Зимний вечер в Гаграх (1985)",
        "id": "2adc63a4d04293c2b4f73a2147d6bef0",
        "poster": null,
        "publicationTitle": "Зимний вечер в Гаграх (4K, мелодрама, реж. Карен Шахназаров, 1985 г.)",
        "duration": "01:25:07",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Иваново детство (1962)",
        "id": "e76bfe1f071d9a938e284cb359523a24",
        "poster": null,
        "publicationTitle": "Иваново детство (1962) 4К | Андрей Тарковский — «Золотой лев» Венецианского кинофестиваля",
        "duration": "01:35:25",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Из жизни отдыхающих (1980)",
        "id": "f23ba815f7727bcfb40a692d7c5bbfc0",
        "poster": "https://pic.rtbcdn.ru/video/7f/2d/7f2d3a801409a748a89c4643278bd1ad.png?size=l",
        "publicationTitle": "Из жизни отдыхающих (4К, драма, реж. Николай Губенко, 1980 г.)",
        "duration": "01:22:56",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Исчезнувшая империя (2007)",
        "id": "ea0df4d7b51ab0de57c92defee411054",
        "poster": "https://pic.rtbcdn.ru/video/a8/ac/a8acd83b36f650cebb9431e5e9c0ffd2.jpg?size=l",
        "publicationTitle": "Исчезнувшая империя (4К, драма, реж. Карен Шахназаров, 2007 г.)",
        "duration": "01:44:07",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Камышовый рай (1989)",
        "id": "813a450520c9def783ab82c5ae29123a",
        "poster": null,
        "publicationTitle": "Камышовый рай (4К, драма, Елена Цыплакова, 1989 г.)",
        "duration": "01:31:43",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Карнавальная ночь (1956)",
        "id": "2489d73325e7135837a6663027535d61",
        "poster": null,
        "publicationTitle": "Карнавальная ночь (4К, комедия, реж. Эльдар Рязанов, 1956 г.)",
        "duration": "01:16:06",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Конец «Сатурна» (1967)",
        "id": "e78970fceea4532ab1e4e21698d64015",
        "poster": null,
        "publicationTitle": "Конец «Сатурна» (4К, приключения, реж. Виллен Азаров, 1967 г.)",
        "duration": "01:35:27",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Красная палатка (1969)",
        "id": "dcd9dcbf08d177d51656c01dd7bd75b4",
        "poster": null,
        "publicationTitle": "Красная палатка (1969) - Михаил Калатозов | драма | Мосфильм 4K",
        "duration": "02:36:56",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Красные колокола: Мексика в огне (1982)",
        "id": "237231d48b6be7f098b9cb66659db356",
        "poster": null,
        "publicationTitle": "Красные колокола: Мексика в огне (4К, драма, реж. Сергей Бондарчук, 1982 г.)",
        "duration": "02:13:00",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Красные колокола: Я видел рождение нового мира (1982)",
        "id": "5beaa98777cedccb5d19f0a062c0ac7e",
        "poster": "https://pic.rtbcdn.ru/video/2026-01-30/97/54/9754180b8714b2ae1ca17371f1eb3ecc.jpg?size=l",
        "publicationTitle": "Красные колокола: Я видел рождение нового мира (4К, драма, реж. Сергей Бондарчук, 1982 г.)",
        "duration": "02:17:10",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Кто, если не мы (1998)",
        "id": "1f97873ee1045a537ab5ca69a9f03b65",
        "poster": null,
        "publicationTitle": "Кто, если не мы (4К, драма, реж. Валерий Приемыхов, 1998 г.)",
        "duration": "01:31:10",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Курьер (1986)",
        "id": "788d258dd76e66c7f1e8bf972125e2bf",
        "poster": "https://pic.rtbcdn.ru/video/40/79/407977a685c6b404c4ba0a061cfea784.jpg?size=l",
        "publicationTitle": "Курьер (4К, драма, реж. Карен Шахназаров, 1986 г.)",
        "duration": "01:27:10",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Ленин в Париже (1981)",
        "id": "4a7aa7a24e9e5cd79dd828364e3b604e",
        "poster": null,
        "publicationTitle": "Ленин в Париже (4К, драма, реж. Сергей Юткевич, Леонид Эйдлин, 1981 г.)",
        "duration": "01:43:58",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Лунная радуга (1983)",
        "id": "96ecbcc1770f422243fe37ddd3dbb186",
        "poster": null,
        "publicationTitle": "Лунная радуга (4К, фантастика, реж. Андрей Ермаш, 1983 г.)",
        "duration": "01:29:18",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Любовь и голуби (1984)",
        "id": "68781d890618ea50933ec020fd5060bf",
        "poster": null,
        "publicationTitle": "Любовь и голуби (4К, комедия, реж. Владимир Меньшов, 1984 г.)",
        "duration": "01:45:17",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Мир входящему (1961)",
        "id": "8d7135b0568c61d62bd7e61b7022f590",
        "poster": null,
        "publicationTitle": "Мир входящему (4К, драма, реж. Алов Александр, Наумов Владимир, 1961 г.)",
        "duration": "01:28:46",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Огненные вёрсты (1957)",
        "id": "cb938ce9165cc0febf632cb4a56b02af",
        "poster": null,
        "publicationTitle": "Огненные вёрсты (4К, драма, реж. Самсон Самсонов, 1957 г.)",
        "duration": "01:23:27",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Одиночное плавание (1985)",
        "id": "1fc2614cc6668453192d0141207e7c03",
        "poster": null,
        "publicationTitle": "Одиночное плавание (4К, боевик, реж. Михаил Туманишвили, 1985 г.)",
        "duration": "01:34:37",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Опасные тропы (1954)",
        "id": "e61c19905dc42cc4505acb1c9a336c7d",
        "poster": null,
        "publicationTitle": "Опасные тропы (4К, криминальный, реж. Евгений Алексеев, Александр Алексеев, 1954 г.)",
        "duration": "01:01:58",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Освобождение. Фильм 1-й. Огненная дуга (1968)",
        "id": "a5c3e7a232182f4c114bddbe777a7eea",
        "poster": null,
        "publicationTitle": "Освобождение. Фильм 1-й. Огненная дуга (4К, военный, реж. Юрий Озеров, 1968 г.)",
        "duration": "01:31:47",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Освобождение. Фильм 2-й. Прорыв (1968)",
        "id": "76bdcb43ee8ea78eb533c2a7d0ee06ec",
        "poster": "https://pic.rtbcdn.ru/video/2026-05-06/7f/84/7f8495513ebab92bda9c59ba9d3b13e2.jpg?size=l",
        "publicationTitle": "Освобождение. Фильм 2-й. Прорыв (4К, военный, реж. Юрий Озеров, 1968 г.)",
        "duration": "01:28:58",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Освобождение. Фильм 3-й. Направление главного удара (1970)",
        "id": "9de7e057b3052df902a211bb388f1193",
        "poster": null,
        "publicationTitle": "Освобождение. Фильм 3-й. Направление главного удара (4К, военный, реж. Юрий Озеров, 1970 г.)",
        "duration": "02:06:58",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Освобождение. Фильм 4-й. Битва за Берлин (1971)",
        "id": "8936da04a6780f1ce4db0fd69169b71e",
        "poster": null,
        "publicationTitle": "Освобождение. Фильм 4-й. Битва за Берлин (4К, военный, реж. Юрий Озеров, 1971 г.)",
        "duration": "01:21:58",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Освобождение. Фильм 5-й. Последний штурм (1971)",
        "id": "5e2279b4fb076695ec6dc7587a65a81f",
        "poster": null,
        "publicationTitle": "Освобождение. Фильм 5-й. Последний штурм (4К, военный, реж. Юрий Озеров, 1971 г.)",
        "duration": "01:14:10",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Палата №6 (2009)",
        "id": "48be756b83375cacdb5a9b6bb81b0e89",
        "poster": null,
        "publicationTitle": "Палата №6 (4K, драма, реж. Карен Шахназаров, 2009 г.)",
        "duration": "01:26:34",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Первый учитель (1965)",
        "id": "2b20fbd25503fc60231ec9577ebc2748",
        "poster": "https://pic.rtbcdn.ru/video/2026-07-22/e0/f7/e0f7f53c0ad7e0d1a23bb7b50dcb1366.jpg?size=l",
        "publicationTitle": "Первый учитель (4К, драма, реж. Андрей Михалков-Кончаловский, 1965 г.)",
        "duration": "01:39:14",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "По прозвищу «Зверь» (1990)",
        "id": "f9fddf8e570a62c744b20459f7ba9209",
        "poster": null,
        "publicationTitle": "По прозвищу «Зверь» (4К, боевик, реж. Александр Муратов, 1990 г.)",
        "duration": "01:27:31",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Председатель. Серия 1 (1964)",
        "id": "90ee7225dcc6c17a9b0fcb267447551b",
        "poster": null,
        "publicationTitle": "Председатель. Серия 1 (4К, драма, реж. Алексей Салтыков, 1964)",
        "duration": "01:33:44",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Председатель. Серия 2 (1964)",
        "id": "47e3db017954bba9bda9803941f13e56",
        "poster": null,
        "publicationTitle": "Председатель. Серия 2 (4К, драма, реж. Алексей Салтыков, 1964)",
        "duration": "01:09:59",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Путь в «Сатурн» (1967)",
        "id": "50e20c2636872de739c18644e5ebabd4",
        "poster": null,
        "publicationTitle": "Путь в «Сатурн» (4К, приключения, реж. Виллен Азаров, 1967 г.)",
        "duration": "01:21:57",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Пядь земли (1964)",
        "id": "d705dd8f8acffca43f1eddfe437e866f",
        "poster": null,
        "publicationTitle": "Пядь земли (4К, военный, реж. Андрей Смирнов, Борис Яшин, 1964 г.)",
        "duration": null,
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Решение о ликвидации (2018)",
        "id": "b0feef9dd7c212307c95c549f5a43014",
        "poster": null,
        "publicationTitle": "Решение о ликвидации (4К, военный, реж. Александр Аравин, 2018 г.)",
        "duration": "01:36:26",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Решение о ликвидации. Серии 1 и 2 (2018)",
        "id": "92dc9da43f5dac7d97476ca6b7495ca0",
        "poster": null,
        "publicationTitle": "Решение о ликвидации (4К) серии 1 и 2 (боевик, драма, реж. Александр Аравин, 2018 г.)",
        "duration": "01:19:02",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Решение о ликвидации. Серии 3 и 4 (2018)",
        "id": "01a2ec7c18fe93722f271151c1ce8850",
        "poster": null,
        "publicationTitle": "Решение о ликвидации (4К) серии 3 и 4 (боевик, драма, реж. Александр Аравин, 2018 г.)",
        "duration": "01:18:54",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Сны (1993)",
        "id": "2d2b72bf4071179b2aaca148c45ce4be",
        "poster": "https://pic.rtbcdn.ru/video/29/3c/293cddb035a1d11cd21fd1b059ea21b7.jpg?size=l",
        "publicationTitle": "Сны (4K, комедия, реж. К. Шахназаров, А. Бородянский, 1993 г.)",
        "duration": "01:18:54",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Солярис (1972)",
        "id": "74ef826bbe750918b3baac15c118f1a8",
        "poster": null,
        "publicationTitle": "Солярис (4К, фантастика, реж. Андрей Тарковский, 1972 г.)",
        "duration": "02:47:05",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Сталинград. Серия 1 (1989)",
        "id": "551ea69818b79dcdf1a46dc379335b98",
        "poster": null,
        "publicationTitle": "Сталинград. Серия 1 (4К, военный, реж. Юрий Озеров, 1989 г.)",
        "duration": "01:30:56",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Сталинград. Серия 2 (1989)",
        "id": "d641fb0ef5223340b6c1de22c9eb8012",
        "poster": null,
        "publicationTitle": "Сталинград. Серия 2 (4К, военный, реж. Юрий Озеров, 1989 г.)",
        "duration": "01:42:21",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Сталкер (1979)",
        "id": "51c61871c3db1ef2624b2e4cd0aae155",
        "poster": "https://pic.rtbcdn.ru/video/2025-06-20/42/74/4274a0fd288ce1909e4a02cb4e056f74.jpg?size=l",
        "publicationTitle": "Сталкер (4К, фантастика, реж. Андрей Тарковский, 1979 г.)",
        "duration": "02:42:02",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Старая азбука (1987)",
        "id": "eaf5b70c49f695da6cd1c68bf98bad57",
        "poster": null,
        "publicationTitle": "Старая азбука (4К, драма, реж. Виктор Прохоров, 1987 г.)",
        "duration": "01:23:37",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Степь (1977)",
        "id": "70861fbae89e4d29f2dc35dad1f29f56",
        "poster": null,
        "publicationTitle": "Степь (4К, драма, реж. Сергей Бондарчук, 1977 г.)",
        "duration": "02:12:16",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Суета сует (1979)",
        "id": "60b3de16497f812364819363fac5ed2b",
        "poster": null,
        "publicationTitle": "Суета сует (4К, комедия, реж. Алла Сурикова, 1979 г.)",
        "duration": "01:26:29",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Табор уходит в небо (1976)",
        "id": "5ee9ac8df7002536fe888df3503f686b",
        "poster": null,
        "publicationTitle": "Табор уходит в небо (4К, драма, реж. Эмиль Лотяну, 1976 г.)",
        "duration": "01:36:04",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Тайна вечной ночи (1955)",
        "id": "8d2e90e1bf0925eff69d95ae0544cab3",
        "poster": null,
        "publicationTitle": "Тайна вечной ночи (4К, драма, реж. Дмитрий Васильев, 1955 г.)",
        "duration": "01:18:51",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Укрощение огня (1972)",
        "id": "5f546d43a8f15ef49a5aec53098c8a7a",
        "poster": null,
        "publicationTitle": "Укрощение огня — советская космическая драма (4К, реж. Даниил Храбровицкий, 1972 г.)",
        "duration": "02:44:03",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Хитровка. Знак четырёх (2023)",
        "id": "e4815c220252ceac0ea9c0460b8cf5bc",
        "poster": null,
        "publicationTitle": "Хитровка. Знак четырёх (4К, детектив, приключения, реж. Карен Шахназаров, 2023 г.)",
        "duration": "02:09:29",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Цареубийца (1991)",
        "id": "c990498a7a02b5e4d27ea3011446ddc2",
        "poster": null,
        "publicationTitle": "Цареубийца (4K 16:9, драма, реж. Карен Шахназаров, 1991 г.)",
        "duration": "01:43:05",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Человек ниоткуда (1961)",
        "id": "15a6bab2c303276cd17b5b971ad0a980",
        "poster": null,
        "publicationTitle": "Человек ниоткуда (4К, фантастика, реж. Эльдар Рязанов, 1961 г.)",
        "duration": "01:20:23",
        "description": null,
        "descriptionSource": null
    },
    {
        "title": "Яды, или Всемирная история отравлений (2001)",
        "id": "dfc38c56d05a6efedf8be2701c378738",
        "poster": null,
        "publicationTitle": "Яды, или Всемирная история отравлений (4К, комедия, реж. Карен Шахназаров, 2001 г.)",
        "duration": "01:44:15",
        "description": null,
        "descriptionSource": null
    }
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
        var availableQuality=[], currentHeight=0, automatic=true;
        function qualityLabel(text){
            var panel=window.Lampa.PlayerPanel;
            if(panel && panel.render) panel.render().find('.player-panel__quality').text(text);
        }
        function publishQuality(){
            var panel=window.Lampa.PlayerPanel;
            if(!panel || typeof panel.quality!=='function')return;
            var options={};
            function choice(value){return {call:function(){
                if(dead || !ready)return;
                if(value!=='auto' && availableQuality.indexOf(value)<0)return;
                send('player:changeQuality',{quality:String(value)});
                window.Lampa.Noty.show('Запрошено качество: ' + (value==='auto'?'Авто':value+'p') + '. Ожидаем ответ RUTUBE.');
                // Do not call Lampa's URL-switch callback: there is no new media URL.
            }};}
            options['Авто']=choice('auto');
            availableQuality.forEach(function(q){options[q+'p']=choice(q);});
            panel.quality(options,false);
            qualityLabel(currentHeight ? (automatic?'Авто · ':'')+currentHeight+'p' : 'Качество');
        }
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
            if (msg.type === 'player:currentQuality' && data.quality && typeof data.quality.height === 'number' && isFinite(data.quality.height) && data.quality.height>0 && data.quality.height<=8640) {
                currentHeight=data.quality.height;
                automatic=data.quality.isAutoQuality === true;
                video.rutubeCurrentQuality=currentHeight;
                qualityLabel((automatic?'Авто · ':'')+currentHeight+'p');
            }
            if (msg.type === 'player:qualityList' && Array.isArray(data.list)) {
                // Offered quality is not proof of the currently decoded resolution.
                availableQuality = data.list.filter(function (n,i,a) { return typeof n === 'number' && isFinite(n) && n > 0 && n <= 8640 && n % 1 === 0 && a.indexOf(n) === i; }).sort(function(a,b){return b-a;});
                video.rutubeAvailableQualities=availableQuality.slice();
                publishQuality();
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
            if(window.Lampa.PlayerPanel && window.Lampa.PlayerPanel.quality)window.Lampa.PlayerPanel.quality({},false);
        };
        callVideo(video);
        return box;
    }

    // Dedicated full-screen Activity for this official catalog. Never treats RUTUBE IDs as TMDB IDs.
    function MosfilmDetails(object){
        var L=window.Lampa,$=window.jQuery||window.$,self=this,dead=false;
        var film=films.filter(function(f){return f.id===object.filmId;})[0];
        var scroll=new L.Scroll({mask:true,over:true});
        var html=$('<div class="mosfilm-details" style="padding:2em"></div>');
        var play=$('<div class="selector full-start__button" style="display:inline-block;padding:1em 2em;background:#333;margin:1em 0">Воспроизвести</div>');
        var last=play, sourceOpen=false, sourceToken=0;
        if(film){
            var layout=$('<div style="display:flex;gap:2em;align-items:flex-start"></div>');
            if(film.poster){
                var poster=$('<img style="width:14em;max-height:23em;object-fit:contain" />').attr('src',film.poster).attr('alt',film.title);
                poster.on('error',function(){poster.hide();});layout.append(poster);
            }
            var body=$('<div style="flex:1"></div>');
            body.append($('<h1></h1>').text(film.title));
            body.append($('<div style="opacity:.75;margin:1em 0"></div>').text((film.duration?'Длительность: '+film.duration+' · ':'')+'Официальный канал «Мосфильм» · RUTUBE'));
            body.append($('<p style="line-height:1.5"></p>').text(film.description || 'Описание сюжета для этой публикации пока не подтверждено.'));
            body.append($('<p style="opacity:.75;line-height:1.5"></p>').text('Название публикации: '+film.publicationTitle));
            body.append($('<p style="opacity:.75"></p>').text('4K указано издателем. Доступные разрешения появятся после загрузки плеера.'));
            body.append(play);layout.append(body);html.append(layout);
            play.on('hover:enter',function(){
                if(dead || sourceOpen)return;
                sourceOpen=true;var token=++sourceToken;
                L.Select.show({title:'Источник воспроизведения',items:[{title:'RUTUBE · Мосфильм',source:'mosfilm-rutube',subtitle:'Официальный встроенный плеер'}],
                    onBack:function(){if(dead || token!==sourceToken)return;sourceOpen=false;sourceToken++;self.start();},
                    onSelect:function(choice){
                        if(dead || token!==sourceToken || !sourceOpen)return;
                        sourceOpen=false;sourceToken++;
                        if(!choice || choice.source!=='mosfilm-rutube'){self.start();return;}
                        var url='https://rutube.ru/video/'+film.id+'/';
                        if(!L.PlayerVideo || !L.PlayerVideo.verifyTube || !L.PlayerVideo.verifyTube(url)){
                            L.Noty.show('Адаптер RUTUBE недоступен.');self.start();return;
                        }
                        L.Player.callback(function(){if(!dead)self.start();});
                        L.Player.play({url:url,title:film.title,launch_player:'inner'});
                    }
                });
            });
        } else {
            html.append($('<h2>Публикация не найдена</h2>'));
            play.text('Назад').on('hover:enter',function(){L.Activity.backward();});html.append(play);
        }
        play.on('hover:focus',function(){play.css('outline','0.2em solid #fff');scroll.update(play);});
        scroll.append(html);
        this.render=function(){return scroll.render();};
        this.create=function(){if(this.activity && this.activity.loader)this.activity.loader(false);return this.render();};
        this.start=function(){if(dead)return;L.Controller.add('content',{
            toggle:function(){L.Controller.collectionSet(html);L.Controller.collectionFocus(last,html);},
            left:function(){L.Controller.toggle('menu');},right:function(){},up:function(){L.Controller.toggle('head');},down:function(){},
            back:function(){L.Activity.backward();}
        });L.Controller.toggle('content');};
        this.pause=this.stop=function(){};
        this.destroy=function(){dead=true;play.off();html.find('img').off();scroll.destroy();html.remove();};
    }
    function MosfilmPage() {
        var L=window.Lampa, $=window.jQuery || window.$, self=this;
        var scroll=new L.Scroll({mask:true,over:true});
        var html=$('<div class="mosfilm-page" style="padding:1.5em"></div>');
        var cards=[], active=0, built=false, destroyed=false, query='';
        var search=$('<div class="selector" style="padding:.8em;margin-bottom:1em;background:#333">Поиск по каталогу</div>');
        var grid=$('<div style="display:flex;flex-wrap:wrap;gap:2em 2%;align-items:flex-start"></div>');
        html.append($('<h2 style="margin:0 0 1em">Мосфильм</h2>'));
        html.append(search);
        html.append($('<div style="margin-bottom:1.5em;opacity:.75">Официальные фильмы RUTUBE. Фактические 2160p не проверены.</div>'));
        html.append(grid); scroll.append(html);
        function focus(index) {
            active=index<0 || !cards.length ? -1 : Math.min(cards.length-1,index);
            L.Controller.collectionFocus(active<0?search:cards[active],html);
        }
        search.on('hover:focus',function(){active=-1;cards.forEach(function(c){c.css('outline','none');});search.css('outline','0.2em solid #fff');scroll.update(search);});
        search.on('hover:enter',function(){
            if(!L.Input || !L.Input.edit){L.Noty.show('Поиск недоступен в этой версии Lampa.');return;}
            L.Input.edit({title:'Поиск по Мосфильму',value:query,nosave:true,free:true},function(value){
                if(destroyed)return;
                query=String(value||'').trim().toLowerCase().replace(/ё/g,'е');draw();active=-1;self.start();
            });
        });
        function draw(){
        cards.forEach(function(c){c.off();c.find('img').off();});cards=[];grid.empty();
        var selected=films.filter(function(f){return f.title.toLowerCase().replace(/ё/g,'е').indexOf(query)>=0;});
        search.text((query?'Поиск: '+query:'Поиск по каталогу')+' · '+selected.length+' из '+films.length);
        selected.forEach(function(film,index){
            var card=$('<div class="selector card" style="width:22%;flex:0 0 22%;margin-bottom:1em"></div>');
            var image=$('<img style="display:block;width:100%;height:18em;object-fit:contain;background:#222;border-radius:.4em" />');
            image.attr('alt',film.title).attr('loading','lazy');
            if(film.poster) image.attr('src',film.poster);
            image.on('error',function(){image.hide();card.find('.mosfilm-image-error').show();});
            card.append(image);
            card.append($('<div class="mosfilm-image-error" style="display:none;height:18em;background:#222;padding:1em">Постер недоступен. Фильм можно открыть.</div>'));
            if(!film.poster){image.hide();card.find('.mosfilm-image-error').show();}
            card.append($('<div style="margin-top:.6em"></div>').text(film.title));
            card.on('hover:focus',function(){
                active=index;search.css('outline','none');
                cards.forEach(function(other){other.css('outline','none');});
                card.css('outline','0.2em solid #fff').css('outline-offset','0.4em');
                scroll.update(card);
            });
            card.on('hover:enter',function(){
                active=index;
                L.Activity.push({url:'',title:film.title,component:'mosfilm_rutube_details',filmId:film.id,page:1});
            });
            cards.push(card);grid.append(card);
        });
        }
        draw();
        this.create=function(){
            if(!built){built=true;if(this.activity && this.activity.loader)this.activity.loader(false);}
            return this.render();
        };
        this.render=function(){return scroll.render();};
        this.start=function(){
            if(destroyed)return;
            L.Controller.add('content',{
                toggle:function(){L.Controller.collectionSet(html);focus(active);},
                left:function(){if(active>0 && active%4!==0)focus(active-1);else L.Controller.toggle('menu');},
                right:function(){if(active<0)focus(0);else if(active%4!==3 && active<cards.length-1)focus(active+1);},
                up:function(){if(active<0)L.Controller.toggle('head');else focus(active>=4?active-4:-1);},
                down:function(){if(active<0)focus(0);else if(active+4<cards.length)focus(active+4);else if(Math.floor(active/4)<Math.floor((cards.length-1)/4))focus(cards.length-1);},
                back:function(){L.Activity.backward();}
            });
            L.Controller.toggle('content');
        };
        this.pause=this.stop=function(){};
        this.destroy=function(){destroyed=true;cards.forEach(function(c){c.off();c.find('img').off();});scroll.destroy();html.remove();cards=[];search.off();};
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
            !L.Select || !L.Select.show || !L.Component || !L.Component.add || !L.Activity || !L.Activity.push || !L.Scroll ||
            !L.Controller || !L.Controller.add || !L.Controller.collectionSet || !L.Controller.collectionFocus || !L.Controller.toggle || !L.Noty || !L.Noty.show ||
            !$('.menu .menu__list').eq(0).length) {
            state.attempts += 1;
            if (state.attempts < 120) window.setTimeout(start, 500);
            else delete window.__mosfilmMenuRutubeV07;
            return;
        }
        if (state.ready) return;
        if (!L.PlayerVideo || typeof L.PlayerVideo.registerTube !== 'function') {
            L.Noty.show('Для RUTUBE требуется Lampa с поддержкой адаптеров плеера.');
            delete window.__mosfilmMenuRutubeV07; return;
        }
        L.PlayerVideo.registerTube({name:'Mosfilm RUTUBE', verify:function(url){return !!rutubeId(url);}, create:createRutube});
        L.Component.add('mosfilm_rutube_page',MosfilmPage);
        L.Component.add('mosfilm_rutube_details',MosfilmDetails);
        var button = $('<li class="menu__item selector" data-mosfilm-menu="0.7.0">' +
            '<div class="menu__ico"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></div>' +
            '<div class="menu__text">Мосфильм</div></li>');
        button.on('hover:enter', showFilms);
        $('.menu .menu__list').eq(0).append(button);
        state.ready = true;
    }
    start();
}(window));
