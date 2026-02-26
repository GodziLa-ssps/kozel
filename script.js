/* ============================================
   SPOLEK KOZEL — Shared JavaScript
   Spolek pro Kulturní Občerstvení ZELenče
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // 0. DARK MODE
    // ===========================
    const themeToggle = document.getElementById('themeToggle');

    // Apply saved theme immediately (also handled by inline script, but just in case)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    // ===========================
    // 1. HAMBURGER MENU
    // ===========================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileOverlay = document.getElementById('mobileOverlay');

    if (hamburgerBtn && mobileNav && mobileOverlay) {
        const toggleMenu = () => {
            const isOpen = mobileNav.classList.contains('active');

            mobileNav.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', !isOpen);

            // Swap icon
            const icon = hamburgerBtn.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fa-solid fa-bars' : 'fa-solid fa-xmark';
            }

            // Prevent body scroll when menu is open
            document.body.style.overflow = isOpen ? '' : 'hidden';
        };

        hamburgerBtn.addEventListener('click', toggleMenu);
        mobileOverlay.addEventListener('click', toggleMenu);

        // Close menu on link click
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileNav.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // ===========================
    // 2. HEADER SCROLL EFFECT
    // ===========================
    const siteHeader = document.getElementById('siteHeader');

    if (siteHeader) {
        const handleHeaderScroll = () => {
            if (window.scrollY > 10) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleHeaderScroll, { passive: true });
        handleHeaderScroll(); // Run on load
    }

    // ===========================
    // 3. SCROLL REVEAL ANIMATIONS
    // ===========================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all initial reveal elements
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });

    /**
     * Observe dynamically added .reveal elements.
     * Also handles instant-reveal for the news section.
     */
    function observeNewReveals(container, instant) {
        if (!container) return;
        container.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
            if (instant) {
                el.classList.add('visible');
            } else {
                revealObserver.observe(el);
            }
        });
    }

    // ===========================
    // 4. BACK TO TOP BUTTON
    // ===========================
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        const handleBackToTopVisibility = () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
        handleBackToTopVisibility();

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===========================
    // 5. COUNTER ANIMATION (about stats)
    // ===========================

    // Dynamicky vypočítat roky činnosti z roku založení
    document.querySelectorAll('.stat-number[data-founding-year]').forEach(el => {
        const founded = parseInt(el.getAttribute('data-founding-year'), 10);
        el.setAttribute('data-target', new Date().getFullYear() - founded);
    });

    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    if (statNumbers.length > 0) {
        const animateCounter = (el) => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            const duration = 2000; // ms
            const startTime = performance.now();

            const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

            const update = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutQuart(progress);

                el.textContent = Math.round(target * easedProgress);

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    // Add suffix if data-suffix is set, or "+" for large numbers
                    const suffix = el.getAttribute('data-suffix') || '';
                    if (suffix) {
                        el.textContent = target + suffix;
                    } else if (target >= 100) {
                        el.textContent = target + '+';
                    }
                }
            };

            requestAnimationFrame(update);
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => counterObserver.observe(el));
    }

    // ===========================
    // 6. GALLERY — render from GALLERY_DATA
    // ===========================
    const galleryContainer = document.getElementById('galleryContainer');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // All rendered gallery-item elements (populated after render)
    let allGalleryItems = [];
    const INITIAL_SHOW = 12; // photos per year-section before "show more"

    /**
     * Get thumbnail path for a photo.
     * Thumbnails are in thumbs/ as .webp, originals in fotky_weby/.
     * Falls back to original if thumbs folder doesn't exist.
     */
    function getThumbSrc(folder, photo) {
        // folder = 'fotky_weby/masopust24', photo = 'photo.jpg'
        // thumb  = 'thumbs/masopust24/photo.webp'
        const rel = folder.replace(/^fotky_weby\//, '');
        const webpName = photo.replace(/\.[^.]+$/, '.webp');
        return `thumbs/${rel}/${webpName}`;
    }

    /**
     * Build the gallery HTML: year-sections with grids of photos.
     * @param {string} filter - 'all' or a category key like 'masopust'
     */
    function renderGallery(filter) {
        if (!galleryContainer || typeof GALLERY_DATA === 'undefined') return;

        galleryContainer.innerHTML = '';
        allGalleryItems = [];

        // Sort data: newest year first
        const sorted = [...GALLERY_DATA].sort((a, b) => b.year - a.year);

        const groups = sorted.filter(g => filter === 'all' || g.category === filter);

        if (groups.length === 0) {
            galleryContainer.innerHTML = '<p style="text-align:center;color:var(--text-muted);">Žádné fotografie.</p>';
            return;
        }

        groups.forEach(group => {
            // Year-section wrapper
            const section = document.createElement('div');
            section.className = 'gallery-year-section';
            section.dataset.category = group.category;

            // Heading
            const heading = document.createElement('h2');
            heading.className = 'gallery-year-heading';
            heading.innerHTML = `
                <i class="fa-solid fa-calendar" aria-hidden="true"></i>
                ${group.title}
                <span class="photo-count">${group.photos.length} fotografií</span>
            `;
            section.appendChild(heading);

            // Grid
            const grid = document.createElement('div');
            grid.className = 'gallery-grid';
            section.appendChild(grid);

            // Render photos (first INITIAL_SHOW visible)
            group.photos.forEach((photo, i) => {
                const fullSrc = `${group.folder}/${photo}`;
                const thumbSrc = getThumbSrc(group.folder, photo);
                const item = document.createElement('div');
                item.className = 'gallery-item';
                item.dataset.category = group.category;
                item.dataset.src = fullSrc;
                item.dataset.caption = `${group.title} — ${i + 1}/${group.photos.length}`;

                if (i >= INITIAL_SHOW) {
                    item.classList.add('gallery-hidden');
                }

                item.innerHTML = `
                    <img src="${thumbSrc}" alt="${group.title}" loading="lazy"
                         onerror="this.onerror=null;this.src='${fullSrc}'">
                    <div class="gallery-item-overlay">
                        <span>${group.title}</span>
                    </div>
                `;
                grid.appendChild(item);
                allGalleryItems.push(item);
            });

            // "Show more" button if there are hidden photos
            if (group.photos.length > INITIAL_SHOW) {
                const showMoreWrap = document.createElement('div');
                showMoreWrap.className = 'gallery-show-more';

                const remaining = group.photos.length - INITIAL_SHOW;
                const btn = document.createElement('button');
                btn.className = 'btn btn-outline';
                btn.innerHTML = `<i class="fa-solid fa-images" aria-hidden="true"></i> Zobrazit dalších ${remaining} fotek`;

                btn.addEventListener('click', () => {
                    grid.querySelectorAll('.gallery-hidden').forEach(el => {
                        el.classList.remove('gallery-hidden');
                    });
                    showMoreWrap.remove();
                });

                showMoreWrap.appendChild(btn);
                section.appendChild(showMoreWrap);
            }

            galleryContainer.appendChild(section);
        });

        // Re-init lightbox with new items
        initLightbox();
    }

    // Filter buttons
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderGallery(btn.getAttribute('data-filter'));
            });
        });
    }

    // Initial render
    renderGallery('all');

    // ===========================
    // 7. LIGHTBOX
    // ===========================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentIndex = 0;
    let visibleItems = [];

    function getVisibleItems() {
        return allGalleryItems.filter(item => {
            // Must be in a visible section and not hidden by "show more"
            return !item.classList.contains('gallery-hidden') &&
                item.offsetParent !== null;
        });
    }

    function openLightbox(index) {
        if (!lightbox) return;
        visibleItems = getVisibleItems();
        currentIndex = index;

        const item = visibleItems[currentIndex];
        if (!item) return;

        lightboxImg.src = item.dataset.src;
        lightboxImg.alt = item.dataset.caption;
        lightboxCaption.textContent = item.dataset.caption;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxImg.src = '';
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        openLightbox(currentIndex);
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        openLightbox(currentIndex);
    }

    function initLightbox() {
        allGalleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const visible = getVisibleItems();
                const idx = visible.indexOf(item);
                if (idx !== -1) openLightbox(idx);
            });
        });
    }

    if (lightbox) {
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
        if (lightboxNext) lightboxNext.addEventListener('click', showNext);

        // Close on overlay click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        });
    }

    // ===========================
    // 8. NEWS CARDS (from site-data.js)
    // ===========================
    const newsGrid = document.getElementById('newsGrid');

    if (newsGrid && typeof NEWS_DATA !== 'undefined') {
        NEWS_DATA.forEach((item, i) => {
            const card = document.createElement('article');
            card.className = 'news-card reveal';
            card.style.setProperty('--i', i);

            const linkHref = item.link || '#';
            card.innerHTML = `
                <a href="${linkHref}" class="news-card-link">
                    <div class="news-card-image">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                        <span class="news-card-tag">${item.tag}</span>
                    </div>
                    <div class="news-card-body">
                        <div class="news-card-date">
                            <i class="fa-regular fa-calendar" aria-hidden="true"></i>
                            ${item.date}
                        </div>
                        <h3>${item.title}</h3>
                        <p>${item.text}</p>
                    </div>
                </a>
            `;
            newsGrid.appendChild(card);
        });

        // News cards are above the fold — reveal instantly
        observeNewReveals(newsGrid, true);
    }

    // ===========================
    // 9. EVENTS TIMELINE (from site-data.js)
    // ===========================
    const upcomingTimeline = document.getElementById('upcomingTimeline');
    const pastTimeline = document.getElementById('pastTimeline');

    if (typeof EVENTS_DATA !== 'undefined') {
        const upcoming = EVENTS_DATA.filter(e => e.upcoming);
        const past = EVENTS_DATA.filter(e => !e.upcoming);

        function renderTimeline(container, events, isPast) {
            if (!container) return;
            events.forEach((evt, i) => {
                const item = document.createElement('div');
                item.className = 'timeline-item reveal';
                item.style.setProperty('--i', i);

                // Build details row
                let details = `<span><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${evt.location}</span>`;
                if (evt.time) {
                    details += `<span><i class="fa-regular fa-clock" aria-hidden="true"></i> ${evt.time}</span>`;
                }
                if (evt.galleryLink) {
                    details += `<span><i class="fa-solid fa-camera" aria-hidden="true"></i> <a href="galerie.html">Fotografie</a></span>`;
                }
                if (evt.tag) {
                    details += `<span><i class="fa-solid fa-tag" aria-hidden="true"></i> ${evt.tag}</span>`;
                }

                item.innerHTML = `
                    <div class="timeline-dot${isPast ? ' past' : ''}"></div>
                    <div class="timeline-content">
                        <span class="date-tag${isPast ? ' past' : ''}">
                            <i class="fa-regular fa-calendar" aria-hidden="true"></i>
                            ${evt.date}
                        </span>
                        <h3>${evt.title}</h3>
                        <p>${evt.text}</p>
                        <div class="event-details">${details}</div>
                    </div>
                `;
                container.appendChild(item);
            });
        }

        renderTimeline(upcomingTimeline, upcoming, false);
        renderTimeline(pastTimeline, past, true);

        // Observe dynamic timeline items for scroll reveal
        observeNewReveals(upcomingTimeline, false);
        observeNewReveals(pastTimeline, false);
    }

    // ===========================
    // 10. SMOOTH SCROLL FOR ANCHOR LINKS
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
                const top = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ===========================
    // 11. ANNOUNCEMENT BAR (from site-data.js)
    // ===========================
    const announcementTrack = document.getElementById('announcementTrack');

    if (announcementTrack && typeof ANNOUNCEMENTS !== 'undefined' && ANNOUNCEMENTS.length > 0) {
        function buildAnnouncementInner(ariaHidden) {
            const div = document.createElement('div');
            div.className = 'announcement-inner';
            if (ariaHidden) div.setAttribute('aria-hidden', 'true');

            ANNOUNCEMENTS.forEach(item => {
                const a = document.createElement('a');
                a.href = item.link;
                a.className = 'announcement-item';
                let html = '';
                if (item.badge) html += '<span class="badge">Nové</span>';
                html += `<i class="${item.icon}" aria-hidden="true"></i> ${item.text}`;
                a.innerHTML = html;
                div.appendChild(a);
            });
            return div;
        }

        // Original + duplicate for seamless CSS marquee loop
        announcementTrack.appendChild(buildAnnouncementInner(false));
        announcementTrack.appendChild(buildAnnouncementInner(true));
    }

    // ===========================
    // 12. MAP CONSENT (GDPR)
    // ===========================
    const loadMapBtn = document.getElementById('loadMapBtn');
    const mapContainer = document.getElementById('mapContainer');
    const mapConsent = document.getElementById('mapConsent');

    if (loadMapBtn && mapContainer) {
        // Check if user already consented
        if (localStorage.getItem('mapConsent') === 'true') {
            loadMap();
        }

        loadMapBtn.addEventListener('click', () => {
            localStorage.setItem('mapConsent', 'true');
            loadMap();
        });

        function loadMap() {
            if (mapConsent) mapConsent.remove();
            const iframe = document.createElement('iframe');
            iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2557.5!2d14.6427!3d50.0867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470bee6b6f9a9e2d%3A0x400af0f66164bf0!2sFaltusova%20184%2F9%2C%20250%2091%20Zelene%C4%8D!5e0!3m2!1scs!2scz';
            //mapa na zelenec obecne     iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10236.04!2d14.6!3d50.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470bee6b6f9a9e2d%3A0x400af0f66164bf0!2sZelene%C4%8D!5e0!3m2!1scs!2scz!4v1700000000000!5m2!1scs!2scz';
            iframe.allowFullscreen = true;
            iframe.loading = 'lazy';
            iframe.referrerPolicy = 'no-referrer-when-downgrade';
            iframe.title = 'Mapa — Faltusova 184/9, Zeleneč';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = '0';
            mapContainer.appendChild(iframe);
        }
    }

    // ===========================
    // 13. SCROLL PROGRESS BAR
    // ===========================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.setAttribute('aria-hidden', 'true');
    document.body.prepend(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    }, { passive: true });

    // ===========================
    // 14. LIGHTBOX TOUCH SWIPE
    // ===========================
    if (lightbox) {
        let touchStartX = 0;
        let touchEndX = 0;

        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    showNext();
                } else {
                    showPrev();
                }
            }
        }, { passive: true });
    }

    // ===========================
    // 15. IMAGE ERROR HANDLING
    // ===========================
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function () {
            if (this.dataset.errorHandled) return;
            this.dataset.errorHandled = 'true';
            this.style.display = 'none';

            const fallback = document.createElement('div');
            fallback.className = 'img-error-fallback';
            fallback.style.width = '100%';
            fallback.style.height = '100%';
            fallback.style.minHeight = '120px';
            fallback.innerHTML = '<i class="fa-solid fa-image" style="font-size:1.5rem;opacity:0.3;"></i>';
            this.parentNode.insertBefore(fallback, this.nextSibling);
        });
    });

});
