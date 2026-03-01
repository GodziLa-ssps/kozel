document.addEventListener('DOMContentLoaded', function () {

    // ===========================
    // 1. HAMBURGER MENU
    // ===========================
    // chatko + ytb tutorial na jednoduchy javascrip hamburger
    var hamburgerBtn = document.getElementById('hamburgerBtn');
    var mobileNav = document.getElementById('mobileNav');
    var mobileOverlay = document.getElementById('mobileOverlay');

    if (hamburgerBtn && mobileNav && mobileOverlay) {
        hamburgerBtn.addEventListener('click', function () {
            var isOpen = mobileNav.classList.contains('active');

            mobileNav.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', !isOpen);

            // Zmena ikony
            var icon = hamburgerBtn.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fa-solid fa-bars' : 'fa-solid fa-xmark';
            }

            // zabranit scrollovani kdyz je menu otevrene
            document.body.style.overflow = isOpen ? '' : 'hidden';
        });

        // zavrit menu pri kliknuti na overlay
        mobileOverlay.addEventListener('click', function () {
            mobileNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            hamburgerBtn.querySelector('i').className = 'fa-solid fa-bars';
            document.body.style.overflow = '';
        });
    }

    // ===========================
    // 2. HEADER SCROLL EFEKT
    // ===========================
    // header dostane tridu "scrolled" kdyz uzivatel scrolluje dolu
    var siteHeader = document.getElementById('siteHeader');

    if (siteHeader) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        });
    }

    // ===========================
    // 2.1 BACK TO TOP BUTTON
    // ===========================
    var backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===========================
    // 3.5. VYKRESLENI NOVINEK A AKCI
    // ===========================
    var newsContainer = document.getElementById('news-container');
    if (newsContainer && typeof novinky !== 'undefined') {
        newsContainer.innerHTML = '';
        novinky.forEach(function (n) {
            var article = document.createElement('article');
            article.className = 'news-card';
            article.innerHTML = `
                <div class="news-card-image">
                    <img src="${n.obrazek}" alt="${n.titulek}" loading="lazy">
                    <span class="news-card-tag">${n.tag}</span>
                </div>
                <div class="news-card-body">
                    <div class="news-card-date">
                        <i class="fa-regular fa-calendar"></i>
                        ${n.datum}
                    </div>
                    <h3>${n.titulek}</h3>
                    <p>${n.text}</p>
                </div>
            `;
            newsContainer.appendChild(article);
        });
    }

    var nadchazejiciContainer = document.getElementById('nadchazejici-akce');
    if (nadchazejiciContainer && typeof nadchazejiciAkce !== 'undefined') {
        nadchazejiciContainer.innerHTML = '';
        nadchazejiciAkce.forEach(function (a) {
            var item = document.createElement('div');
            item.className = 'timeline-item';
            item.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="date-tag">
                        <i class="fa-regular fa-calendar"></i>
                        ${a.datum}
                    </span>
                    <h3>${a.nazev}</h3>
                    <p>${a.popis}</p>
                    <div class="event-details">
                        <span><i class="fa-solid fa-location-dot"></i> ${a.misto}</span>
                        ${a.cas ? '<span><i class="fa-regular fa-clock"></i> ' + a.cas + '</span>' : ''}
                        <span><i class="fa-solid fa-tag"></i> ${a.tag}</span>
                    </div>
                </div>
            `;
            nadchazejiciContainer.appendChild(item);
        });
    }

    var probehleContainer = document.getElementById('probehle-akce');
    if (probehleContainer && typeof probehleAkce !== 'undefined') {
        probehleContainer.innerHTML = '';
        probehleAkce.forEach(function (a) {
            var item = document.createElement('div');
            item.className = 'timeline-item';

            var btnFotografie = a.galerie
                ? '<span><i class="fa-solid fa-camera"></i> <a href="' + a.galerie + '">Fotografie</a></span>'
                : '';

            item.innerHTML = `
                <div class="timeline-dot past"></div>
                <div class="timeline-content">
                    <img src="${a.obrazek}" alt="${a.nazev}" class="event-image" loading="lazy">
                    <span class="date-tag past">
                        <i class="fa-regular fa-calendar"></i>
                        ${a.datum}
                    </span>
                    <h3>${a.nazev}</h3>
                    <p>${a.popis}</p>
                    <div class="event-details">
                        <span><i class="fa-solid fa-location-dot"></i> ${a.misto}</span>
                        ${btnFotografie}
                    </div>
                </div>
            `;
            probehleContainer.appendChild(item);
        });
    }

    // ===========================
    // 4. GALERIE — generovani z JS a LIGHTBOX (Fáze 5)
    // ===========================
    var filterBtns = document.querySelectorAll('.filter-btn');
    var galerieContainer = document.getElementById('galerieContainer');
    var pocetNaStart = 12; // kolik fotek zobrazit na zacatku

    // Promenne pro ukladani kontextu lightboxu
    var curGalleryImages = [];
    var curImageIndex = 0;

    // funkce co vykresli galerii
    function vykresliGalerii(filtr) {
        if (!galerieContainer || typeof galerieFotky === 'undefined') return;

        galerieContainer.innerHTML = '';

        // seradit od nejnovejsiho
        var serazene = galerieFotky.slice().sort(function (a, b) {
            return b.rok - a.rok;
        });

        // vyfiltrovat podle kategorie
        var skupiny = serazene.filter(function (g) {
            return filtr === 'all' || g.kategorie === filtr;
        });

        if (skupiny.length === 0) {
            galerieContainer.innerHTML = '<p style="text-align:center;color:var(--text-muted);">Žádné fotografie.</p>';
            return;
        }

        // pro kazdou akci vytvorit sekci
        skupiny.forEach(function (skupina) {
            var sekce = document.createElement('div');
            sekce.className = 'gallery-year-section';

            // nadpis (napr. "Masopust 2025 (69 fotografií)")
            var nadpis = document.createElement('h2');
            nadpis.className = 'gallery-year-heading';
            nadpis.innerHTML = '<i class="fa-solid fa-calendar"></i> ' +
                skupina.nazev +
                ' <span class="photo-count">' + skupina.fotky.length + ' fotografií</span>';
            sekce.appendChild(nadpis);

            // grid s fotkami
            var grid = document.createElement('div');
            grid.className = 'gallery-grid';
            sekce.appendChild(grid);

            // pridat fotky
            skupina.fotky.forEach(function (fotka, i) {
                var item = document.createElement('div');
                item.className = 'gallery-item';

                // schovat fotky po pocetNaStart
                if (i >= pocetNaStart) {
                    item.classList.add('gallery-hidden');
                }

                var img = document.createElement('img');
                img.src = skupina.slozka + '/' + fotka;
                img.alt = skupina.nazev;
                img.loading = 'lazy';
                item.appendChild(img);
                grid.appendChild(item);
            });

            // tlacitko "zobrazit dalsi" pokud je vic fotek
            if (skupina.fotky.length > pocetNaStart) {
                var zbyva = skupina.fotky.length - pocetNaStart;
                var wrapper = document.createElement('div');
                wrapper.className = 'gallery-show-more';

                var tlacitko = document.createElement('button');
                tlacitko.className = 'btn btn-outline';
                tlacitko.innerHTML = '<i class="fa-solid fa-images"></i> Zobrazit dalších ' + zbyva + ' fotek';

                tlacitko.addEventListener('click', function () {
                    var skryte = grid.querySelectorAll('.gallery-hidden');
                    skryte.forEach(function (el) {
                        el.classList.remove('gallery-hidden');
                    });
                    wrapper.remove();
                });

                wrapper.appendChild(tlacitko);
                sekce.appendChild(wrapper);
            }

            galerieContainer.appendChild(sekce);
        });
    }

    // spustit galerii pri nacteni
    if (galerieContainer) {
        vykresliGalerii('all');
    }

    // filtry
    if (filterBtns.length > 0) {
        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                var filtr = btn.getAttribute('data-filter');
                vykresliGalerii(filtr);
            });
        });
    }

    // fullscreen overlay lightbox (Fáze 5)
    var overlay = document.getElementById('fotkaOverlay');
    var velkaFotka = document.getElementById('fotkaVelka');

    // Pokud overlay neexistuje primo v HTML (napr. v galerie.html), vytvorime ho dynamicky
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'fotkaOverlay';

        velkaFotka = document.createElement('img');
        velkaFotka.id = 'fotkaVelka';
        velkaFotka.alt = 'Zvětšená fotografie';

        overlay.appendChild(velkaFotka);
        document.body.appendChild(overlay);
    }

    if (overlay && velkaFotka) {
        // Vytvoreni ovladacich prvku dynamicky pokud neexistuji v HTML
        if (!document.getElementById('fotkaZavrit')) {
            overlay.insertAdjacentHTML('beforeend', `
                <button id="fotkaZavrit" class="lightbox-btn" aria-label="Zavřít"><i class="fa-solid fa-xmark"></i></button>
                <button id="fotkaPredchozi" class="lightbox-btn" aria-label="Předchozí"><i class="fa-solid fa-chevron-left"></i></button>
                <button id="fotkaDalsi" class="lightbox-btn" aria-label="Další"><i class="fa-solid fa-chevron-right"></i></button>
            `);
        }

        var zavritBtn = document.getElementById('fotkaZavrit');
        var prevBtn = document.getElementById('fotkaPredchozi');
        var nextBtn = document.getElementById('fotkaDalsi');

        // Funkce na zmenu fotky dle indexu
        function menFotku(noveIndex) {
            if (curGalleryImages.length === 0) return;
            // Osetreni koncu pole (nekonecna smycka)
            if (noveIndex < 0) {
                curImageIndex = curGalleryImages.length - 1;
            } else if (noveIndex >= curGalleryImages.length) {
                curImageIndex = 0;
            } else {
                curImageIndex = noveIndex;
            }
            velkaFotka.src = curGalleryImages[curImageIndex];
        }

        // Tlačítka Další a Předchozí
        prevBtn.addEventListener('click', function (e) { e.stopPropagation(); menFotku(curImageIndex - 1); });
        nextBtn.addEventListener('click', function (e) { e.stopPropagation(); menFotku(curImageIndex + 1); });
        zavritBtn.addEventListener('click', function (e) { e.stopPropagation(); overlay.classList.remove('aktivni'); });

        // Otevrit fotku (nyni sbira VSECHNY aktualni fotky do pole na posunovani)
        document.body.addEventListener('click', function (e) {
            var img = e.target.closest('.gallery-item img');
            if (!img) return;

            // Najde vsechny takove fotky v cele galerii, at uz jsou v ruznych sekcich
            var allImages = Array.from(document.querySelectorAll('.gallery-item img'));

            // Extrakce src z elementů do pole, abychom jimi mohli projizdet
            curGalleryImages = allImages.map(function (im) { return im.src; });

            // Zjisteni na kolikatou jsme klikli
            curImageIndex = curGalleryImages.indexOf(img.src);

            velkaFotka.src = img.src;
            overlay.classList.add('aktivni');
        });

        // zavrit fotku — kliknout na pozadi (mimo fotku a tlacitka)
        overlay.addEventListener('click', function (e) {
            if (e.target === velkaFotka || e.target.closest('.lightbox-btn')) return;
            overlay.classList.remove('aktivni');
        });
    }

    // zavrit / prepinat pomoci klavesnice
    document.addEventListener('keydown', function (e) {
        if (!overlay || !overlay.classList.contains('aktivni')) return;

        if (e.key === 'Escape') {
            overlay.classList.remove('aktivni');
        } else if (e.key === 'ArrowLeft') {
            menFotku(curImageIndex - 1);
        } else if (e.key === 'ArrowRight') {
            menFotku(curImageIndex + 1);
        }
    });

    // ===========================
    // 5. SMOOTH SCROLL PRO LINKY
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                var headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
                var top = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // ===========================
    // 6. SCROLL PROGRESS BAR
    // ===========================
    var progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', function () {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    });

    // ===========================
    // 8. STAT COUNTER ANIMACE
    // ===========================
    var statNumbers = document.querySelectorAll('.stat-number[data-target]');

    if (statNumbers.length > 0) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var target = parseInt(el.getAttribute('data-target'));
                    var suffix = el.getAttribute('data-suffix') || '';
                    var duration = 2000; // 2 sekundy
                    var start = 0;
                    var startTime = null;

                    function animate(timestamp) {
                        if (!startTime) startTime = timestamp;
                        var progress = Math.min((timestamp - startTime) / duration, 1);
                        var current = Math.floor(progress * target);
                        el.textContent = current + suffix;

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            el.textContent = target + suffix;
                        }
                    }

                    requestAnimationFrame(animate);
                    observer.unobserve(el); // spustit jen jednou
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(function (el) {
            observer.observe(el);
        });
    }

});
