/* Mosfilm menu prototype 0.8.0. Experimental RUTUBE iframe adapter. Device playback unverified; no direct media streams. */
(function (window) {
    'use strict';
    if (window.__mosfilmMenuRutubeV08) return;
    var state = {ready: false, attempts: 0};
    window.__mosfilmMenuRutubeV08 = state;
    var films = [
    {
        "title": "Деловые люди (1962)",
        "id": "b13ef664275a06c4dc6e46337cc52719",
        "poster": "https://www.mosfilm.ru/upload/iblock/0c2/mxjngg4dd3fd50wntbvp6h9fp5e6gr1q/1e9cb99488fe283aceba63ba354cc7c5.jpg",
        "publicationTitle": "Деловые люди (1962) — Леонид Гайдай | комедия | Мосфильм 4K",
        "duration": "01:23:46",
        "description": "Экранизация трёх рассказов О. Генри: «Дороги, которые мы выбираем», «Родственные души» и «Вождь краснокожих».",
        "descriptionSource": "https://www.mosfilm.ru/cinema/films/delovye-lyudi/",
        "posterFallback": null
    },
    {
        "title": "Земля Санникова (1973)",
        "id": "517a03c96cb712b66c3490e8c5460271",
        "poster": "https://www.mosfilm.ru/upload/iblock/22a/zo4t9z6y7lsxliv4lxf0mvx3pd40avkg/1920x-_5_.webp",
        "publicationTitle": "Земля Санникова (1973) — Мкртчян, Попов | приключения | Mosfilm 4K",
        "duration": "01:33:25",
        "description": "Приключения русской экспедиции, открывшей на Крайнем Севере неизвестную землю с доисторической жизнью. По роману Владимира Обручева.",
        "descriptionSource": "https://www.mosfilm.ru/cinema/films/zemlya-sannikova/",
        "posterFallback": null
    },
    {
        "title": "\"О спорт, ты - мир!\" (1980)",
        "id": "f836d141ec5d199c16a1efa9aaeb832e",
        "poster": "https://www.mosfilm.ru/upload/iblock/6a2/ud1l0lau1cjs8sjbga61445xypyzraox/O-sport-poster.jpg",
        "publicationTitle": "\"О спорт, ты - мир!\" (4К, документальный, реж. Юрий Озеров, 1980 г.)",
        "duration": "02:27:51",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Американская дочь (1995)",
        "id": "f594c020efcdbe4132ea5e9c8427427c",
        "poster": "https://www.mosfilm.ru/upload/iblock/903/6w8qear5wwm401qwih4zdzdf33o09hln/b74356df412486d8c7597d92b090ea40_min.jpg",
        "publicationTitle": "Американская дочь (4K, драма, реж. Карен Шахназаров, 1995 г.)",
        "duration": "01:37:35",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Анна Каренина. История Вронского (2017)",
        "id": "4d9ace7f17adfc0bee49c07da1a4b5d8",
        "poster": "https://www.mosfilm.ru/upload/iblock/9e4/vucs6bjjilmos7k7mjb7mdlpr7u5sk0k/9583c6c5fcbfb283d61c81ecb1d42ec9-_1_-_1_min.jpg",
        "publicationTitle": "Анна Каренина. История Вронского (4К) (мелодрама, реж. Карен Шахназаров, 2017 г.)",
        "duration": "02:18:05",
        "description": null,
        "descriptionSource": null,
        "posterFallback": "https://pic.rtbcdn.ru/video/be/3a/be3a6ce67f6e5b873c346d8a5958be20.jpg?size=l"
    },
    {
        "title": "Анна Каренина. Фильм 1 (2017)",
        "id": "5115847ea90aa493dae6421289f36830",
        "poster": "https://www.mosfilm.ru/upload/iblock/d8b/9vm6c8oszc4lr2j0y8p3hkopk2dxq5sp/f90866d36036b447f6a5c725b758cf54.jpg",
        "publicationTitle": "Анна Каренина. Фильм 1 (4К, драма, реж. Карен Шахназаров, 2017 г.)",
        "duration": "01:23:38",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Анна Каренина. Фильм 2 (2017)",
        "id": "2b8e4afc36ff1c3c0da93007c2507bcb",
        "poster": "https://www.mosfilm.ru/upload/iblock/d8b/9vm6c8oszc4lr2j0y8p3hkopk2dxq5sp/f90866d36036b447f6a5c725b758cf54.jpg",
        "publicationTitle": "Анна Каренина. Фильм 2 (4К, драма, реж. Карен Шахназаров, 2017 г.)",
        "duration": "01:22:58",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Анна Каренина. Фильм 3 (2017)",
        "id": "0b73d5d4d1b2e7ed9866af1f9233733a",
        "poster": "https://www.mosfilm.ru/upload/iblock/d8b/9vm6c8oszc4lr2j0y8p3hkopk2dxq5sp/f90866d36036b447f6a5c725b758cf54.jpg",
        "publicationTitle": "Анна Каренина. Фильм 3 (4К, драма, реж. Карен Шахназаров, 2017 г.)",
        "duration": "01:31:30",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Анна Каренина. Фильм 4 (2017)",
        "id": "1b6705254dcf9e0205f0ef17ce94e751",
        "poster": "https://www.mosfilm.ru/upload/iblock/d8b/9vm6c8oszc4lr2j0y8p3hkopk2dxq5sp/f90866d36036b447f6a5c725b758cf54.jpg",
        "publicationTitle": "Анна Каренина. Фильм 4 (4К, драма, реж. Карен Шахназаров, 2017 г.)",
        "duration": "01:28:36",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Анна Павлова",
        "id": "9525d4347475943a6d865ce040854554",
        "poster": "https://www.mosfilm.ru/upload/iblock/703/3da9f8xkg3ox2j0wh4c7kc97yy6xb0wk/03f588a3f6513b1bf0349cf5ad24b1fd.jpg",
        "publicationTitle": "Анна Павлова (4К) Легенда мирового балета",
        "duration": "02:32:00",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Бег, 1 серия (1970)",
        "id": "0667aa33b0435d954f698d4d55cc90f1",
        "poster": "https://www.mosfilm.ru/upload/iblock/735/4d9d3ry7jq1aceukjhzzo803mtnug7g8/4a3c2498291dc5be2a5fd84524a077a9.jpg",
        "publicationTitle": "Бег, 1 серия (4К, драма, реж. Александр Алов, Владимир Наумов, 1970 г.)",
        "duration": "01:33:08",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Бег, 2 серия (1970)",
        "id": "c6f99f74e5172ab99b0a3e0a7e6ee956",
        "poster": "https://www.mosfilm.ru/upload/iblock/735/4d9d3ry7jq1aceukjhzzo803mtnug7g8/4a3c2498291dc5be2a5fd84524a077a9.jpg",
        "publicationTitle": "Бег, 2 серия (4К, драма, реж. Александр Алов, Владимир Наумов, 1970 г.)",
        "duration": "01:40:10",
        "description": null,
        "descriptionSource": null,
        "posterFallback": "https://pic.rtbcdn.ru/video/2025-02-14/6b/60/6b606ce3c810da50792ca3e9a54f79e6.jpg?size=l"
    },
    {
        "title": "Берегись автомобиля (1966)",
        "id": "e6bb01652353356ca0333f34a957353c",
        "poster": "https://www.mosfilm.ru/upload/iblock/156/fo70duhfpeao9t60nts8brtb30uck219/64c606c475e32f53391ed55c56a94629.jpg",
        "publicationTitle": "Берегись автомобиля (4K, комедия, реж. Эльдар Рязанов, 1966 г.)",
        "duration": "01:32:59",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Битва за Москву: \"Агрессия\". Серия 1 (1985)",
        "id": "d6f214540607cdc5919d980703acec72",
        "poster": "https://www.mosfilm.ru/upload/iblock/d4a/qn6r5stvos1jgnqw9gfa3m6yb4fys3ai/8799fd5b73672b294f7ca86f7c036f0d.jpg",
        "publicationTitle": "Битва за Москву: \"Агрессия\". Серия 1 (4К, военный, реж. Юрий Озеров, 1985 г.)",
        "duration": "01:21:43",
        "description": null,
        "descriptionSource": null,
        "posterFallback": "https://pic.rtbcdn.ru/video/2025-05-06/7f/72/7f72a85f86ed1592a162f15ba9c358c4.jpg?size=l"
    },
    {
        "title": "Битва за Москву: \"Агрессия\". Серия 2 (1985)",
        "id": "6e5439b46354f63c7660fa86e1e3d88f",
        "poster": "https://www.mosfilm.ru/upload/iblock/d4a/qn6r5stvos1jgnqw9gfa3m6yb4fys3ai/8799fd5b73672b294f7ca86f7c036f0d.jpg",
        "publicationTitle": "Битва за Москву: \"Агрессия\". Серия 2 (4К, военный, реж. Юрий Озеров, 1985 г.)",
        "duration": "01:32:32",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Битва за Москву: \"Тайфун\". Серия 1 (1985)",
        "id": "ba782d6ccd0199d3f1d457f87e479ec8",
        "poster": "https://www.mosfilm.ru/upload/iblock/d4a/qn6r5stvos1jgnqw9gfa3m6yb4fys3ai/8799fd5b73672b294f7ca86f7c036f0d.jpg",
        "publicationTitle": "Битва за Москву: \"Тайфун\". Серия 1 (4К, военный, реж. Юрий Озеров, 1985 г.)",
        "duration": "01:27:08",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Битва за Москву: \"Тайфун\". Серия 2 (1985)",
        "id": "b95f4ba6b30bf112ea1aa59347dfd020",
        "poster": "https://www.mosfilm.ru/upload/iblock/d4a/qn6r5stvos1jgnqw9gfa3m6yb4fys3ai/8799fd5b73672b294f7ca86f7c036f0d.jpg",
        "publicationTitle": "Битва за Москву: \"Тайфун\". Серия 2 (4К, военный, реж. Юрий Озеров, 1985 г.)",
        "duration": "01:33:09",
        "description": null,
        "descriptionSource": null,
        "posterFallback": "https://pic.rtbcdn.ru/video/2025-05-06/05/39/05391f0fe5bd67d47e23eaf3aa00965e.jpg?size=l"
    },
    {
        "title": "Владивосток (2021)",
        "id": "6dd052a50f9a9d219092ef75f05f6607",
        "poster": "https://www.mosfilm.ru/upload/iblock/542/3nz628zy9q8mkrp4nh786lahongiu2rm/2d91b86fea9c20cf7b3ce4a90e8e0f2c.jpg",
        "publicationTitle": "Владивосток (4К, драма, реж. Антон Борматов, 2021 г.)",
        "duration": "01:36:51",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Внимание, черепаха! (1969)",
        "id": "591b87fe05726931c18aeb7d55bcd109",
        "poster": "https://www.mosfilm.ru/upload/iblock/0e5/hyiutp4i2861q6s8ecylh49eojg9qe0m/1920x-_46_.jpg",
        "publicationTitle": "Внимание, черепаха! (1969) — Ролан Быков | детская комедия | Мосфильм 4K",
        "duration": "01:25:20",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Гори, гори, моя звезда (1969)",
        "id": "90bd6d6e5386629a5acb4ee79ae5a5e9",
        "poster": "https://www.mosfilm.ru/upload/iblock/8d9/rxe201g5d5o4bl2m95ggcq05iahbho51/1920x_29_.jpg",
        "publicationTitle": "Гори, гори, моя звезда (1969) — Александр Митта | трагикомедия | Мосфильм 4K",
        "duration": "01:34:02",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Гранатовый браслет (1964)",
        "id": "01a787842a4825f7d1ad5b32ef884949",
        "poster": "https://www.mosfilm.ru/upload/iblock/478/uw3wco7szfxs5d80zyt222bprr6wqvqw/4cc8afdf3ef834b9ecfa559b6c2ac0d0.jpg",
        "publicationTitle": "Гранатовый браслет (1964) — Абрам Роом | драма | Мосфильм 4K",
        "duration": "01:30:07",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Дайте жалобную книгу (1964)",
        "id": "7ac9df1b7bc81d726262bc363bece056",
        "poster": "https://www.mosfilm.ru/upload/iblock/4ec/hxrydkte1x7mgiy09v7d2ky58wv0qfje/cb649ad5c96192725795690a373156ba.jpg",
        "publicationTitle": "Дайте жалобную книгу (4К, комедия, реж. Эльдар Рязанов, 1964 г.)",
        "duration": "01:29:33",
        "description": null,
        "descriptionSource": null,
        "posterFallback": "https://pic.rtbcdn.ru/video/2026-05-22/e7/74/e77441287f6d2d76916cde6c107c726f.jpg?size=l"
    },
    {
        "title": "Добряки (1979)",
        "id": "c075e93fa35900ab99b0e07877d4f47e",
        "poster": "https://www.mosfilm.ru/upload/iblock/b2b/yl6m17wolaaf8smzihobzm8wj6sdr10h/1920x_4_.jpg",
        "publicationTitle": "Добряки (4K, комедия, реж. Карен Шахназаров, 1979 г.)",
        "duration": "17:17:21",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Еще раз про любовь (1968)",
        "id": "0648fd5f7438d672b72c5d50c0b8cf2b",
        "poster": "https://www.mosfilm.ru/upload/iblock/866/jr9vtf47uvfgjw9aaibpwqdnpznzoo13/4411a164187cf870b5adcab94373d9fe.jpg",
        "publicationTitle": "Еще раз про любовь (4K, мелодрама, реж. Георгий Натансон, 1968 г.)",
        "duration": "01:35:30",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Жена керосинщика (1988)",
        "id": "8a7cfdf45c6ce53b7174528ac5d21edf",
        "poster": "https://www.mosfilm.ru/upload/iblock/fc8/4fc3ip7tsmhe5n0kbei0t2usloi7u8vh/c81cc5a45eafd0f3f3e93b846b2c8738.jpg",
        "publicationTitle": "Жена керосинщика (4К, драма, реж. Александр Кайдановский, 1988 г.)",
        "duration": "01:39:13",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Живые и мертвые 1-я серия (1963)",
        "id": "29b1086da8430396818cae153c50d3c0",
        "poster": "https://www.mosfilm.ru/upload/iblock/b2b/tvsiw6qnfuty7x38f128247701xmxcwh/ZHivye-i-mertvye-poster.jpg",
        "publicationTitle": "Живые и мертвые 1-я серия (4K, драма, реж. Александр Столпер, 1963 г.)",
        "duration": "01:38:08",
        "description": null,
        "descriptionSource": null,
        "posterFallback": "https://pic.rtbcdn.ru/video/2025-04-28/b3/7f/b37fc8923c1117a02a0ad7241da661cc.jpg?size=l"
    },
    {
        "title": "Живые и мертвые 2-я серия (1963)",
        "id": "47379a09d29f42d7d18892fb82e5475f",
        "poster": "https://www.mosfilm.ru/upload/iblock/b2b/tvsiw6qnfuty7x38f128247701xmxcwh/ZHivye-i-mertvye-poster.jpg",
        "publicationTitle": "Живые и мертвые 2-я серия (4K, драма, реж. Александр Столпер, 1963 г.)",
        "duration": "01:39:29",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Жизнь прекрасна (1980)",
        "id": "5e4eb41dc56647c92b6a50111c4b413c",
        "poster": "https://www.mosfilm.ru/upload/iblock/a98/ei234d9c6jd2f4kc5mxk7kff1wurtr3y/d0c9ef1cea46e123fd24bcf1a79129de.jpg",
        "publicationTitle": "Жизнь прекрасна (4К, драма, реж. Григорий Чухрай, 1980 г.)",
        "duration": "01:39:16",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Забытая мелодия для флейты (1987)",
        "id": "a0ca452d03459724da4073233dffe314",
        "poster": "https://www.mosfilm.ru/upload/iblock/fe4/erhv4pgtogp4eiilqu833400qu2frz50/67421_min.jpg",
        "publicationTitle": "Забытая мелодия для флейты (4К, драма, реж. Эльдар Рязанов, 1987 г.)",
        "duration": "02:12:23",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Зеркало (1974)",
        "id": "1c21a6b23a01475a06e8131813f72c21",
        "poster": "https://www.mosfilm.ru/upload/iblock/c11/u1jcfdngs7tx8pmgn81ms24mi7ozjm09/96e246c96f54949f0fd2ae26e01e0d4c.jpg",
        "publicationTitle": "Зеркало (4К, драма, реж. Андрей Тарковский, 1974 г.)",
        "duration": "01:46:47",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Зимний вечер в Гаграх (1985)",
        "id": "2adc63a4d04293c2b4f73a2147d6bef0",
        "poster": "https://www.mosfilm.ru/upload/iblock/afa/issrf51lesgqzn7rdm9jzoh0x6obfr7q/81a2c27d357b70945d16692f8f181a4e_min.jpg",
        "publicationTitle": "Зимний вечер в Гаграх (4K, мелодрама, реж. Карен Шахназаров, 1985 г.)",
        "duration": "01:25:07",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Иваново детство (1962)",
        "id": "e76bfe1f071d9a938e284cb359523a24",
        "poster": "https://www.mosfilm.ru/upload/iblock/a8f/ksslw7nlgsciqn6o79zb9gcfocrxqhcd/ivanovo-detstvo-2.jpg",
        "publicationTitle": "Иваново детство (1962) 4К | Андрей Тарковский — «Золотой лев» Венецианского кинофестиваля",
        "duration": "01:35:25",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Из жизни отдыхающих (1980)",
        "id": "f23ba815f7727bcfb40a692d7c5bbfc0",
        "poster": "https://www.mosfilm.ru/upload/iblock/28e/x7jevsmqmrzs4vr6komqn2710lrky3yt/deb8c593fe23b73c1e69c4ba0ab8be36.jpg",
        "publicationTitle": "Из жизни отдыхающих (4К, драма, реж. Николай Губенко, 1980 г.)",
        "duration": "01:22:56",
        "description": null,
        "descriptionSource": null,
        "posterFallback": "https://pic.rtbcdn.ru/video/7f/2d/7f2d3a801409a748a89c4643278bd1ad.png?size=l"
    },
    {
        "title": "Исчезнувшая империя (2007)",
        "id": "ea0df4d7b51ab0de57c92defee411054",
        "poster": "https://www.mosfilm.ru/upload/iblock/883/ukpxymd4hya6j1n8cednjhi8duzn6pjs/eab228615bed30c8b3bf534a10e84593.jpg",
        "publicationTitle": "Исчезнувшая империя (4К, драма, реж. Карен Шахназаров, 2007 г.)",
        "duration": "01:44:07",
        "description": null,
        "descriptionSource": null,
        "posterFallback": "https://pic.rtbcdn.ru/video/a8/ac/a8acd83b36f650cebb9431e5e9c0ffd2.jpg?size=l"
    },
    {
        "title": "Камышовый рай (1989)",
        "id": "813a450520c9def783ab82c5ae29123a",
        "poster": "https://www.mosfilm.ru/upload/iblock/fbc/pu4utcgj00ds3gaqi0pafx81pznwxw0e/1d33eba477a51275e4fadb05fac4bb01.jpg",
        "publicationTitle": "Камышовый рай (4К, драма, Елена Цыплакова, 1989 г.)",
        "duration": "01:31:43",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Карнавальная ночь (1956)",
        "id": "2489d73325e7135837a6663027535d61",
        "poster": "https://www.mosfilm.ru/upload/iblock/fff/0iw8r3b6u979lml7f0as4mdoe4cnk3m3/8fa57dfb5f996b59ece0530962f8c6af.jpg",
        "publicationTitle": "Карнавальная ночь (4К, комедия, реж. Эльдар Рязанов, 1956 г.)",
        "duration": "01:16:06",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Конец «Сатурна» (1967)",
        "id": "e78970fceea4532ab1e4e21698d64015",
        "poster": "https://www.mosfilm.ru/upload/iblock/30d/bha65lf7pu1xw5si9f2f30pmggzyg7aq/23819fd74273015efb678fdf93299fcb.jpg",
        "publicationTitle": "Конец «Сатурна» (4К, приключения, реж. Виллен Азаров, 1967 г.)",
        "duration": "01:35:27",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Красная палатка (1969)",
        "id": "dcd9dcbf08d177d51656c01dd7bd75b4",
        "poster": "https://www.mosfilm.ru/upload/iblock/488/39gm9uxj1jxf8z06h3il7fe5frt86kne/63000a3ccc52854ffa0f58795935cc5c.jpg",
        "publicationTitle": "Красная палатка (1969) - Михаил Калатозов | драма | Мосфильм 4K",
        "duration": "02:36:56",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Красные колокола: Мексика в огне (1982)",
        "id": "237231d48b6be7f098b9cb66659db356",
        "poster": "https://www.mosfilm.ru/upload/iblock/c34/944ba4qv06vn5ox9n0e2dei79gu5q05r/a333de673bcbf5e4aa101dacd19b1ff9-_1_.jpg",
        "publicationTitle": "Красные колокола: Мексика в огне (4К, драма, реж. Сергей Бондарчук, 1982 г.)",
        "duration": "02:13:00",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Красные колокола: Я видел рождение нового мира (1982)",
        "id": "5beaa98777cedccb5d19f0a062c0ac7e",
        "poster": "https://www.mosfilm.ru/upload/iblock/b7b/yv7kgx06z0qyun3340itau2aorn9jwzx/600x900.jpg",
        "publicationTitle": "Красные колокола: Я видел рождение нового мира (4К, драма, реж. Сергей Бондарчук, 1982 г.)",
        "duration": "02:17:10",
        "description": null,
        "descriptionSource": null,
        "posterFallback": "https://pic.rtbcdn.ru/video/2026-01-30/97/54/9754180b8714b2ae1ca17371f1eb3ecc.jpg?size=l"
    },
    {
        "title": "Кто, если не мы (1998)",
        "id": "1f97873ee1045a537ab5ca69a9f03b65",
        "poster": "https://www.mosfilm.ru/upload/iblock/338/rs8ox2wtiaj65s6t6uic61yr0qkth8r4/600x900.jpg",
        "publicationTitle": "Кто, если не мы (4К, драма, реж. Валерий Приемыхов, 1998 г.)",
        "duration": "01:31:10",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Курьер (1986)",
        "id": "788d258dd76e66c7f1e8bf972125e2bf",
        "poster": "https://www.mosfilm.ru/upload/iblock/b48/csro0ykmz6ise6yhf6bb2vcvzs78xx17/de7befb7a09706cc74e5d89fa7b2bb2c.jpg",
        "publicationTitle": "Курьер (4К, драма, реж. Карен Шахназаров, 1986 г.)",
        "duration": "01:27:10",
        "description": null,
        "descriptionSource": null,
        "posterFallback": "https://pic.rtbcdn.ru/video/40/79/407977a685c6b404c4ba0a061cfea784.jpg?size=l"
    },
    {
        "title": "Ленин в Париже (1981)",
        "id": "4a7aa7a24e9e5cd79dd828364e3b604e",
        "poster": "https://www.mosfilm.ru/upload/iblock/b6d/0xt8fayzf53b5vkaxou2uf2e2vdihvbv/b35177d36ffb9a0060ffcb2958230d62.jpg",
        "publicationTitle": "Ленин в Париже (4К, драма, реж. Сергей Юткевич, Леонид Эйдлин, 1981 г.)",
        "duration": "01:43:58",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Лунная радуга (1983)",
        "id": "96ecbcc1770f422243fe37ddd3dbb186",
        "poster": "https://www.mosfilm.ru/upload/iblock/f0c/txjdbshy9nozdocrc0h3wcqkr87uuknc/1920x-_37_.webp",
        "publicationTitle": "Лунная радуга (4К, фантастика, реж. Андрей Ермаш, 1983 г.)",
        "duration": "01:29:18",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Любовь и голуби (1984)",
        "id": "68781d890618ea50933ec020fd5060bf",
        "poster": "https://www.mosfilm.ru/upload/iblock/057/4vj6mhgl56ezue9qqrk157zgiyka0ser/ee72cf927e1447ec98cc906909231f18.jpg",
        "publicationTitle": "Любовь и голуби (4К, комедия, реж. Владимир Меньшов, 1984 г.)",
        "duration": "01:45:17",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Мир входящему (1961)",
        "id": "8d7135b0568c61d62bd7e61b7022f590",
        "poster": "https://www.mosfilm.ru/upload/iblock/bd0/4a8soxobrvq9rug8l0wasla1ugorfugs/98584c1f928d981240c28be5bf825f83.jpg",
        "publicationTitle": "Мир входящему (4К, драма, реж. Алов Александр, Наумов Владимир, 1961 г.)",
        "duration": "01:28:46",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Огненные вёрсты (1957)",
        "id": "cb938ce9165cc0febf632cb4a56b02af",
        "poster": "https://www.mosfilm.ru/upload/iblock/9e7/47bg09sro08n6p8bjfota18sxf32cdic/Poster-filma-_1_.jpg",
        "publicationTitle": "Огненные вёрсты (4К, драма, реж. Самсон Самсонов, 1957 г.)",
        "duration": "01:23:27",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Одиночное плавание (1985)",
        "id": "1fc2614cc6668453192d0141207e7c03",
        "poster": "https://www.mosfilm.ru/upload/iblock/9b6/fge4fei70jptvm4azp28zq3fwe7bz2ni/Plakat_filma_Odinochnoe_plavanie_SSSR_1985_.jpg",
        "publicationTitle": "Одиночное плавание (4К, боевик, реж. Михаил Туманишвили, 1985 г.)",
        "duration": "01:34:37",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Опасные тропы (1954)",
        "id": "e61c19905dc42cc4505acb1c9a336c7d",
        "poster": "https://www.mosfilm.ru/upload/iblock/73c/bq16by3yvk8u5zjiryvv2mny8yjypbr4/4762.jpg",
        "publicationTitle": "Опасные тропы (4К, криминальный, реж. Евгений Алексеев, Александр Алексеев, 1954 г.)",
        "duration": "01:01:58",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Освобождение. Фильм 1-й. Огненная дуга (1968)",
        "id": "a5c3e7a232182f4c114bddbe777a7eea",
        "poster": "https://www.mosfilm.ru/upload/iblock/add/xgczs9c980ekr7pghohodfyynds21yk2/Osvobozhdenie1.jpg",
        "publicationTitle": "Освобождение. Фильм 1-й. Огненная дуга (4К, военный, реж. Юрий Озеров, 1968 г.)",
        "duration": "01:31:47",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Освобождение. Фильм 2-й. Прорыв (1968)",
        "id": "76bdcb43ee8ea78eb533c2a7d0ee06ec",
        "poster": "https://www.mosfilm.ru/upload/iblock/84f/xrlrcpu60m38ssfx68nfz68ftss3xbaj/1920x-_65_.jpg",
        "publicationTitle": "Освобождение. Фильм 2-й. Прорыв (4К, военный, реж. Юрий Озеров, 1968 г.)",
        "duration": "01:28:58",
        "description": null,
        "descriptionSource": null,
        "posterFallback": "https://pic.rtbcdn.ru/video/2026-05-06/7f/84/7f8495513ebab92bda9c59ba9d3b13e2.jpg?size=l"
    },
    {
        "title": "Освобождение. Фильм 3-й. Направление главного удара (1970)",
        "id": "9de7e057b3052df902a211bb388f1193",
        "poster": "https://www.mosfilm.ru/upload/iblock/84f/xrlrcpu60m38ssfx68nfz68ftss3xbaj/1920x-_65_.jpg",
        "publicationTitle": "Освобождение. Фильм 3-й. Направление главного удара (4К, военный, реж. Юрий Озеров, 1970 г.)",
        "duration": "02:06:58",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Освобождение. Фильм 4-й. Битва за Берлин (1971)",
        "id": "8936da04a6780f1ce4db0fd69169b71e",
        "poster": "https://www.mosfilm.ru/upload/iblock/84f/xrlrcpu60m38ssfx68nfz68ftss3xbaj/1920x-_65_.jpg",
        "publicationTitle": "Освобождение. Фильм 4-й. Битва за Берлин (4К, военный, реж. Юрий Озеров, 1971 г.)",
        "duration": "01:21:58",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Освобождение. Фильм 5-й. Последний штурм (1971)",
        "id": "5e2279b4fb076695ec6dc7587a65a81f",
        "poster": "https://www.mosfilm.ru/upload/iblock/84f/xrlrcpu60m38ssfx68nfz68ftss3xbaj/1920x-_65_.jpg",
        "publicationTitle": "Освобождение. Фильм 5-й. Последний штурм (4К, военный, реж. Юрий Озеров, 1971 г.)",
        "duration": "01:14:10",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Палата №6 (2009)",
        "id": "48be756b83375cacdb5a9b6bb81b0e89",
        "poster": "https://www.mosfilm.ru/upload/iblock/65b/12b0qltwrnud86gyj7m39sbvk8yrgtfm/0bf1740878005919238d39089ae65f82.jpg",
        "publicationTitle": "Палата №6 (4K, драма, реж. Карен Шахназаров, 2009 г.)",
        "duration": "01:26:34",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Первый учитель (1965)",
        "id": "2b20fbd25503fc60231ec9577ebc2748",
        "poster": "https://www.mosfilm.ru/upload/iblock/95c/j2un7pkp9ckahcsavevvyg5572ringro/POSTER.jpg",
        "publicationTitle": "Первый учитель (4К, драма, реж. Андрей Михалков-Кончаловский, 1965 г.)",
        "duration": "01:39:14",
        "description": null,
        "descriptionSource": null,
        "posterFallback": "https://pic.rtbcdn.ru/video/2026-07-22/e0/f7/e0f7f53c0ad7e0d1a23bb7b50dcb1366.jpg?size=l"
    },
    {
        "title": "По прозвищу «Зверь» (1990)",
        "id": "f9fddf8e570a62c744b20459f7ba9209",
        "poster": "https://www.mosfilm.ru/upload/iblock/4a1/y9cjmhlzjtislxoot4g5cnay6550myk5/c998ea5e08dd1ac94be374e65a46e392.jpg",
        "publicationTitle": "По прозвищу «Зверь» (4К, боевик, реж. Александр Муратов, 1990 г.)",
        "duration": "01:27:31",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Председатель. Серия 1 (1964)",
        "id": "90ee7225dcc6c17a9b0fcb267447551b",
        "poster": "https://www.mosfilm.ru/upload/iblock/d04/7vzbz9maan7q8bcippq94uxwehwevyco/91f96146f98c2ded10fdbb24030f6a9d.jpg",
        "publicationTitle": "Председатель. Серия 1 (4К, драма, реж. Алексей Салтыков, 1964)",
        "duration": "01:33:44",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Председатель. Серия 2 (1964)",
        "id": "47e3db017954bba9bda9803941f13e56",
        "poster": "https://www.mosfilm.ru/upload/iblock/d04/7vzbz9maan7q8bcippq94uxwehwevyco/91f96146f98c2ded10fdbb24030f6a9d.jpg",
        "publicationTitle": "Председатель. Серия 2 (4К, драма, реж. Алексей Салтыков, 1964)",
        "duration": "01:09:59",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Путь в «Сатурн» (1967)",
        "id": "50e20c2636872de739c18644e5ebabd4",
        "poster": "https://www.mosfilm.ru/upload/iblock/e5b/wp2efc68v4jp8ecekjwpoxsj13gvbedm/c29f793a6e1665f9f445c91631439f66.jpg",
        "publicationTitle": "Путь в «Сатурн» (4К, приключения, реж. Виллен Азаров, 1967 г.)",
        "duration": "01:21:57",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Пядь земли (1964)",
        "id": "d705dd8f8acffca43f1eddfe437e866f",
        "poster": "https://www.mosfilm.ru/upload/iblock/a0d/equjq3g54fe47vntdxjmj8ntnmmp241p/090b6dc3ffcb60e51c2c5560a8a82b33.jpg",
        "publicationTitle": "Пядь земли (4К, военный, реж. Андрей Смирнов, Борис Яшин, 1964 г.)",
        "duration": null,
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Решение о ликвидации (2018)",
        "id": "b0feef9dd7c212307c95c549f5a43014",
        "poster": "https://www.mosfilm.ru/upload/iblock/ae3/19hle5uvum4n0ml9o73brj3stkbj2ea6/71bfbd5e6160dc99be359e2b622b3820-_1_min.jpg",
        "publicationTitle": "Решение о ликвидации (4К, военный, реж. Александр Аравин, 2018 г.)",
        "duration": "01:36:26",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Решение о ликвидации. Серии 1 и 2 (2018)",
        "id": "92dc9da43f5dac7d97476ca6b7495ca0",
        "poster": "https://www.mosfilm.ru/upload/iblock/ae3/19hle5uvum4n0ml9o73brj3stkbj2ea6/71bfbd5e6160dc99be359e2b622b3820-_1_min.jpg",
        "publicationTitle": "Решение о ликвидации (4К) серии 1 и 2 (боевик, драма, реж. Александр Аравин, 2018 г.)",
        "duration": "01:19:02",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Решение о ликвидации. Серии 3 и 4 (2018)",
        "id": "01a2ec7c18fe93722f271151c1ce8850",
        "poster": "https://www.mosfilm.ru/upload/iblock/ae3/19hle5uvum4n0ml9o73brj3stkbj2ea6/71bfbd5e6160dc99be359e2b622b3820-_1_min.jpg",
        "publicationTitle": "Решение о ликвидации (4К) серии 3 и 4 (боевик, драма, реж. Александр Аравин, 2018 г.)",
        "duration": "01:18:54",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Сны (1993)",
        "id": "2d2b72bf4071179b2aaca148c45ce4be",
        "poster": "https://www.mosfilm.ru/upload/iblock/78f/k0ohj2eesxomzr4d5507kahvldfyvjar/bd9518ef51499de6379ad8639026c19f.jpg",
        "publicationTitle": "Сны (4K, комедия, реж. К. Шахназаров, А. Бородянский, 1993 г.)",
        "duration": "01:18:54",
        "description": null,
        "descriptionSource": null,
        "posterFallback": "https://pic.rtbcdn.ru/video/29/3c/293cddb035a1d11cd21fd1b059ea21b7.jpg?size=l"
    },
    {
        "title": "Солярис (1972)",
        "id": "74ef826bbe750918b3baac15c118f1a8",
        "poster": "https://www.mosfilm.ru/upload/iblock/876/7q5kkw2hpcmakubrxoa9davo0p7ou06e/8a8fb83a3445b955bd56a4c73f87a35b.jpg",
        "publicationTitle": "Солярис (4К, фантастика, реж. Андрей Тарковский, 1972 г.)",
        "duration": "02:47:05",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Сталинград. Серия 1 (1989)",
        "id": "551ea69818b79dcdf1a46dc379335b98",
        "poster": "https://www.mosfilm.ru/upload/iblock/ca6/v7d1i5co8in5kqs6jnxdowoakc5ud0wr/stalingrad-poster-.jpg",
        "publicationTitle": "Сталинград. Серия 1 (4К, военный, реж. Юрий Озеров, 1989 г.)",
        "duration": "01:30:56",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Сталинград. Серия 2 (1989)",
        "id": "d641fb0ef5223340b6c1de22c9eb8012",
        "poster": "https://www.mosfilm.ru/upload/iblock/ca6/v7d1i5co8in5kqs6jnxdowoakc5ud0wr/stalingrad-poster-.jpg",
        "publicationTitle": "Сталинград. Серия 2 (4К, военный, реж. Юрий Озеров, 1989 г.)",
        "duration": "01:42:21",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Сталкер (1979)",
        "id": "51c61871c3db1ef2624b2e4cd0aae155",
        "poster": "https://www.mosfilm.ru/upload/iblock/53e/4epi78f7raavs0wxgpvu9ncw50ylxqk0/74474b259144e840f825893ec66f8324.jpg",
        "publicationTitle": "Сталкер (4К, фантастика, реж. Андрей Тарковский, 1979 г.)",
        "duration": "02:42:02",
        "description": null,
        "descriptionSource": null,
        "posterFallback": "https://pic.rtbcdn.ru/video/2025-06-20/42/74/4274a0fd288ce1909e4a02cb4e056f74.jpg?size=l"
    },
    {
        "title": "Старая азбука (1987)",
        "id": "eaf5b70c49f695da6cd1c68bf98bad57",
        "poster": "https://www.mosfilm.ru/upload/iblock/644/xecxyo3l6sqksmame7r6mt026xk32ehu/f1fb49e4aaa0387ff97c9c3ef965a0cb.jpg",
        "publicationTitle": "Старая азбука (4К, драма, реж. Виктор Прохоров, 1987 г.)",
        "duration": "01:23:37",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Степь (1977)",
        "id": "70861fbae89e4d29f2dc35dad1f29f56",
        "poster": "https://www.mosfilm.ru/upload/iblock/b58/hqbaw1gwxq19du5akd2db7s096gtv40k/0f8cc310ff9ed6bdf1369e5426a5f0e3.jpg",
        "publicationTitle": "Степь (4К, драма, реж. Сергей Бондарчук, 1977 г.)",
        "duration": "02:12:16",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Суета сует (1979)",
        "id": "60b3de16497f812364819363fac5ed2b",
        "poster": "https://www.mosfilm.ru/upload/iblock/45b/huzt63bi936h03abjz7rxjt6z1es7krz/93c3647c3ca33affed7c317ad84ee063.jpg",
        "publicationTitle": "Суета сует (4К, комедия, реж. Алла Сурикова, 1979 г.)",
        "duration": "01:26:29",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Табор уходит в небо (1976)",
        "id": "5ee9ac8df7002536fe888df3503f686b",
        "poster": "https://www.mosfilm.ru/upload/iblock/dc8/qaq3zfbqh7fgsdt5w8r31z8tz6hxwthd/42d9ac38647aae070c4b40fdb32d9b6c-_1_.jpg",
        "publicationTitle": "Табор уходит в небо (4К, драма, реж. Эмиль Лотяну, 1976 г.)",
        "duration": "01:36:04",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Тайна вечной ночи (1955)",
        "id": "8d2e90e1bf0925eff69d95ae0544cab3",
        "poster": "https://www.mosfilm.ru/upload/iblock/c84/8l5eupgu0t8vmtc0x5i9vnk0ak3o94mu/853500ecb005f8002b39a54db24f7cb6.jpg",
        "publicationTitle": "Тайна вечной ночи (4К, драма, реж. Дмитрий Васильев, 1955 г.)",
        "duration": "01:18:51",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Укрощение огня (1972)",
        "id": "5f546d43a8f15ef49a5aec53098c8a7a",
        "poster": "https://www.mosfilm.ru/upload/iblock/972/9uen12f1ph1sk4g6frnp893tx7xo1sfy/36049b449a2a742c48154d0c7ceb3dde.jpg",
        "publicationTitle": "Укрощение огня — советская космическая драма (4К, реж. Даниил Храбровицкий, 1972 г.)",
        "duration": "02:44:03",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Хитровка. Знак четырёх (2023)",
        "id": "e4815c220252ceac0ea9c0460b8cf5bc",
        "poster": "https://www.mosfilm.ru/upload/iblock/966/fo13jropnz7ims12v1ky4mk9ykodwe8n/kse3vw479rdxhcsfvn2jv3reo3tww94h-_1_min.jpg",
        "publicationTitle": "Хитровка. Знак четырёх (4К, детектив, приключения, реж. Карен Шахназаров, 2023 г.)",
        "duration": "02:09:29",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Цареубийца (1991)",
        "id": "c990498a7a02b5e4d27ea3011446ddc2",
        "poster": "https://www.mosfilm.ru/upload/iblock/3de/qqeski2o5zw9k1kf6sa0ilkfgi4s5k3c/879cb3597184bc54fe3c9d6d71660c03.jpg",
        "publicationTitle": "Цареубийца (4K 16:9, драма, реж. Карен Шахназаров, 1991 г.)",
        "duration": "01:43:05",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Человек ниоткуда (1961)",
        "id": "15a6bab2c303276cd17b5b971ad0a980",
        "poster": "https://www.mosfilm.ru/upload/iblock/505/v3vhf8h0lmhvakrvmbphi3ee6emqpt4f/d569e0d788329e1c17c555a118f721c7.jpg",
        "publicationTitle": "Человек ниоткуда (4К, фантастика, реж. Эльдар Рязанов, 1961 г.)",
        "duration": "01:20:23",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
    },
    {
        "title": "Яды, или Всемирная история отравлений (2001)",
        "id": "dfc38c56d05a6efedf8be2701c378738",
        "poster": "https://www.mosfilm.ru/upload/iblock/25c/k7tzbcx4nydugponwa21qm9ajgpf9p1w/e13b422fd4509e584b05b80c9f2b22d6.jpg",
        "publicationTitle": "Яды, или Всемирная история отравлений (4К, комедия, реж. Карен Шахназаров, 2001 г.)",
        "duration": "01:44:15",
        "description": null,
        "descriptionSource": null,
        "posterFallback": null
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
        var video = box[0], frame, src = '', ready = false, dead = false, failed = false, timer;
        var callbacks = {}, current = 0, duration = 0, volume = 1, muted = false, paused = true;
        var desiredPlay = false, pendingSeek = null, startupTimer=null, started=false, adActive=false, contentStarted=false;
        function watchStart(){
            window.clearTimeout(startupTimer);
            if(!dead && !failed && ready && desiredPlay && !started) startupTimer=window.setTimeout(function(){
                fail('RUTUBE загрузился, но воспроизведение не началось. Вернитесь назад и попробуйте снова.');
            },45000);
        }
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
                if(dead || failed || !ready)return;
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
            if (!dead && !failed && ready && frame) frame.contentWindow.postMessage(JSON.stringify({type:type, data:data || {}}), 'https://rutube.ru');
        }
        function fail(message) {
            if (dead || failed) return;
            send('player:stop');
            failed=true;desiredPlay=false;paused=true;ready=false;
            if(frame){frame.remove();frame=null;}
            window.clearTimeout(timer);window.clearTimeout(startupTimer);
            video.error = {code: 4, message: message};
            window.Lampa.Noty.show(message);
            emit('error');
        }
        function receive(event) {
            if (dead || failed || !frame || event.origin !== 'https://rutube.ru' || event.source !== frame.contentWindow) return;
            var msg;
            try { msg = typeof event.data === 'string' ? JSON.parse(event.data) : event.data; } catch (e) { return; }
            if (!msg || typeof msg !== 'object') return;
            var data = msg.data || {};
            if (msg.type === 'player:ready') {
                ready = true; window.clearTimeout(timer);
                send('player:setVolume', {volume:volume});
                send(muted?'player:mute':'player:unMute');
                if (pendingSeek !== null) send('player:setCurrentTime', {time:pendingSeek});
                emit('canplay');
                if (desiredPlay) send('player:play');
                watchStart();
            }
            if (msg.type === 'player:durationChange' && typeof data.duration === 'number' && isFinite(data.duration) && data.duration >= 0) {
                duration = data.duration; emit('loadeddata');
            }
            if (msg.type === 'player:currentTime' && typeof data.time === 'number' && isFinite(data.time) && data.time >= 0) {
                current = data.time; emit('timeupdate');
            }
            if (msg.type === 'player:changeState') {
                if (data.state === 'playing') { if(!adActive)contentStarted=true;started=true;window.clearTimeout(startupTimer);paused = false; emit('playing'); }
                if (data.state === 'paused') { paused = true; emit('pause'); }
            }
            if (msg.type === 'player:adStart') {adActive=true;started=true;window.clearTimeout(startupTimer);paused=false;emit('playing');}
            if(msg.type === 'player:adEnd'){adActive=false;started=contentStarted;watchStart();}
            if(msg.type === 'player:volumeChange'){
                var changed=typeof data.volume==='number'?data.volume:typeof data.volume==='string' && /^\d*(\.\d+)?$/.test(data.volume) && data.volume!=='' ? Number(data.volume) : NaN;
                if(isFinite(changed) && changed>=0 && changed<=1)volume=changed;
                if(typeof data.muted==='boolean')muted=data.muted;
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
            muted: {get:function(){return muted;},set:function(value){muted=Boolean(value);send(muted?'player:mute':'player:unMute');}},
            videoWidth: {get:function(){return 0;}}, videoHeight: {get:function(){return 0;}},
            audioTracks: {get:function(){return [];}}, textTracks: {get:function(){return [];}}
        });
        video.addEventListener = function(name, fn) { (callbacks[name] || (callbacks[name]=[])).push(fn); };
        video.removeEventListener = function(name, fn) { callbacks[name]=(callbacks[name] || []).filter(function(f){return f!==fn;}); };
        video.load = function() {
            if (dead || failed || frame) return;
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
        video.play = function(){if(dead || failed)return;desiredPlay=true;send('player:play');watchStart();};
        video.pause = function(){desiredPlay=false;window.clearTimeout(startupTimer);send('player:pause');};
        video.canPlayType = function(){return true;};
        video.resize = video.size = video.speed = function(){};
        video.destroy = function(){
            if (dead) return;
            send('player:stop'); dead=true; window.clearTimeout(timer);window.clearTimeout(startupTimer);
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
                var detailFallback=false;
                poster.on('error',function(){
                    if(!detailFallback && film.posterFallback){detailFallback=true;poster.attr('src',film.posterFallback);return;}
                    poster.hide();
                });layout.append(poster);
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
            var cardFallback=false;
            image.on('error',function(){
                if(!cardFallback && film.posterFallback){cardFallback=true;image.attr('src',film.posterFallback);return;}
                image.hide();card.find('.mosfilm-image-error').show();
            });
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
            else delete window.__mosfilmMenuRutubeV08;
            return;
        }
        if (state.ready) return;
        var older=['__mosfilmMenuRutubeV03','__mosfilmMenuRutubeV04','__mosfilmMenuRutubeV05','__mosfilmMenuRutubeV06','__mosfilmMenuRutubeV07','__mosfilmMenuV02','__mosfilmOfficialLinks'];
        if(older.some(function(key){return window[key] && window[key].ready;}) || window.__mosfilmOfficialRuntime){
            L.Noty.show('Для обновления «Мосфильма» полностью перезапустите Lampa. Не добавляйте второй адрес плагина.');
            delete window.__mosfilmMenuRutubeV08;return;
        }
        if (!L.PlayerVideo || typeof L.PlayerVideo.registerTube !== 'function') {
            L.Noty.show('Для RUTUBE требуется Lampa с поддержкой адаптеров плеера.');
            delete window.__mosfilmMenuRutubeV08; return;
        }
        L.PlayerVideo.registerTube({name:'Mosfilm RUTUBE', verify:function(url){return !!rutubeId(url);}, create:createRutube});
        L.Component.add('mosfilm_rutube_page',MosfilmPage);
        L.Component.add('mosfilm_rutube_details',MosfilmDetails);
        var button = $('<li class="menu__item selector" data-mosfilm-menu="0.8.0-local">' +
            '<div class="menu__ico"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></div>' +
            '<div class="menu__text">Мосфильм</div></li>');
        button.on('hover:enter', showFilms);
        $('.menu .menu__list').eq(0).append(button);
        state.ready = true;
        window.__mosfilmOfficialRuntime=state;
    }
    start();
}(window));
