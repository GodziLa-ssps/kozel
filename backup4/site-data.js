/* ============================================
   SPOLEK KOZEL — Site Content Data
   Edit this file to add/update news and events.
   ============================================ */

/**
 * NEWS_DATA — cards displayed on main.html
 * Add new items at the top of the array (newest first).
 */
const NEWS_DATA = [
    {
        tag: 'Masopust',
        date: '18. února 2026',
        title: 'Masopust 2026 — děkujeme!',
        text: 'Letošní masopust byl opět plný masek, muziky a skvělé atmosféry. Děkujeme všem, kteří přišli a pomohli s organizací.',
        image: 'fotky_weby/masopust24/708441218071785.jpg',
        link: 'galerie.html'
    },
    {
        tag: 'Pohádkáč',
        date: 'Připravujeme',
        title: 'Pohádkáč 2026 — přihlášky otevřeny',
        text: 'Naše oblíbená pohádková stezka se vrací! Připravte děti na dobrodružství plné pohádkových postav a úkolů.',
        image: 'fotky_weby/pohad23/2023 Pohadkac Zelenec (1).JPG',
        link: 'akce.html'
    },
    {
        tag: 'Tábor',
        date: 'Červenec 2026',
        title: 'Letní příměstský tábor',
        text: 'Týden plný her, výletů a tvoření pro děti od 5 do 12 let. Kapacita omezena — přihlaste se včas!',
        image: 'fotky_weby/pohad23/2023 Pohadkac Zelenec (1).JPG',
        link: 'akce.html'
    },
    {
        tag: 'Dílny',
        date: 'Průběžně',
        title: 'Víkendové tvořivé dílny',
        text: 'Každý měsíc pořádáme kreativní dílny, kde si děti vyzkouší malování, keramiku, výrobu masek a další tvoření.',
        image: 'fotky_weby/maso24/masopust_dolezal/DSCF5123.JPG',
        link: 'akce.html'
    },
    {
        tag: 'Setkání',
        date: 'Prosinec 2025',
        title: 'Vánoční setkání a pečení cukroví',
        text: 'Společné vánoční setkání s pečením cukroví, zpíváním koled a výrobou ozdob. Krásný způsob, jak si zpříjemnit adventní čas.',
        image: 'fotky_weby/maso19/DSC_1325.jpg',
        link: 'akce.html'
    }
];

/**
 * EVENTS_DATA — timeline displayed on akce.html
 * upcoming: true = "Nadcházející akce", false = "Proběhlé akce"
 * Add new events at the top of each group.
 */
const EVENTS_DATA = [
    // ——— Nadcházející ———
    {
        upcoming: true,
        date: '19. dubna 2026',
        title: 'Velikonoční tvořivé dílny',
        text: 'Přijďte s dětmi vyrobit velikonoční dekorace — kraslice, jarní věnce a ozdoby z přírodních materiálů. Dílny jsou vhodné pro děti od 4 let v doprovodu rodičů.',
        location: 'Komunitní centrum Zeleneč',
        time: '10:00 – 15:00',
        tag: 'Dílny'
    },
    {
        upcoming: true,
        date: '14. června 2026',
        title: 'Den dětí v Zelenči',
        text: 'Velká oslava Dne dětí s bohatým programem — soutěže, hry, skákací hrad, malování na obličej, hudební vystoupení a spousta zábavy pro celou rodinu. Vstup zdarma.',
        location: 'Park Zeleneč',
        time: '10:00 – 17:00',
        tag: 'Setkání'
    },
    {
        upcoming: true,
        date: '6. – 10. července 2026',
        title: 'Letní příměstský tábor',
        text: 'Týden plný her, výletů, tvoření a zábavy pro děti od 5 do 12 let. Program zahrnuje výlety do přírody, sportovní aktivity, kreativní dílny a společné opékání u ohně. Kapacita omezena na 25 dětí.',
        location: 'Zeleneč a okolí',
        time: '8:00 – 16:00',
        tag: 'Tábor'
    },
    {
        upcoming: true,
        date: '20. září 2026',
        title: 'Pohádkáč 2026 — pohádková stezka',
        text: 'Naše vlajková akce je zpět! Pohádková stezka okolím Zelenče plná úkolů, pohádkových postav a překvapení. Trasa dlouhá přibližně 4 km je vhodná pro děti od 3 let. Na každém stanovišti čeká pohádková postava s úkolem a odměnou.',
        location: 'Okolí Zelenče',
        time: '9:00 – 14:00',
        tag: 'Pohádkáč'
    },

    // ——— Proběhlé ———
    {
        upcoming: false,
        date: '15. – 16. února 2026',
        title: 'Masopust 2026',
        text: 'Tradiční masopustní oslavy s průvodem masek obcí, hudbou, tancem a masopustním hodováním. Děkujeme všem účastníkům, dobrovolníkům a sponzorům za úžasnou atmosféru!',
        location: 'Zeleneč',
        galleryLink: true
    },
    {
        upcoming: false,
        date: '7. – 8. února 2026',
        title: 'Masopustní přípravné dílny',
        text: 'Víkendové dílny na přípravu masopustu — výroba masek, dekorací, transparentů a dalšího vybavení pro masopustní průvod. Skvělá parta dobrovolníků!',
        location: 'Dílna spolku',
        tag: 'Dílny'
    },
    {
        upcoming: false,
        date: '14. prosince 2025',
        title: 'Vánoční setkání a pečení cukroví',
        text: 'Společné vánoční setkání s pečením cukroví, zpíváním koled, výrobou vánočních ozdob a přáníček. Krásný způsob, jak si zpříjemnit adventní čas.',
        location: 'Komunitní centrum Zeleneč',
        galleryLink: true
    },
    {
        upcoming: false,
        date: '21. září 2025',
        title: 'Pohádkáč 2025 — pohádková stezka',
        text: 'Šestý ročník naší pohádkové stezky přilákal rekordních 120 rodin. Na 8 stanovištích čekaly pohádkové postavy s úkoly a odměnami.',
        location: 'Okolí Zelenče',
        galleryLink: true
    }
];
