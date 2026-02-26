/* ============================================
   Header + Footer, kdyz zmeninm neco tak to se zmeni vsude
   ============================================ */

(function () {
    const page = location.pathname.split('/').pop() || 'index.html';

    // ========== HEADER ==========
    const headerEl = document.getElementById('site-header');
    if (headerEl) {
        headerEl.outerHTML = `
    <header class="site-header" id="siteHeader">
        <div class="header-inner">
            <a href="index.html" class="logo-link">
                <img src="Logo_Kozel.png" alt="Logo Spolek KOZEL" class="logo-icon">
                <div class="logo-text">
                    <span class="logo-name">KOZEL</span>
                    <span class="logo-subtitle"><strong>K</strong>ulturní <strong>O</strong>bčerstvení <strong>ZEL</strong>enče</span>
                </div>
            </a>

            <nav class="main-nav" aria-label="Hlavní navigace">
                <ul>
                    <li><a href="index.html"><i class="fa-solid fa-house" aria-hidden="true"></i> Úvod</a></li>
                    <li><a href="galerie.html"><i class="fa-solid fa-images" aria-hidden="true"></i> Galerie</a></li>
                    <li><a href="akce.html"><i class="fa-solid fa-calendar-days" aria-hidden="true"></i> Akce</a></li>
                    <li><a href="info.html"><i class="fa-solid fa-circle-info" aria-hidden="true"></i> O nás</a></li>
                </ul>
            </nav>

            <div style="display:flex;align-items:center;gap:4px">
                <button class="theme-toggle" id="themeToggle" aria-label="Přepnout tmavý režim">
                    <i class="fa-solid fa-moon" aria-hidden="true"></i>
                    <i class="fa-solid fa-sun" aria-hidden="true"></i>
                </button>
                <button class="hamburger" id="hamburgerBtn" aria-label="Otevřít menu" aria-expanded="false">
                    <i class="fa-solid fa-bars" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </header>

    <div class="mobile-nav-overlay" id="mobileOverlay"></div>

    <nav class="mobile-nav" id="mobileNav" aria-label="Mobilní navigace">
        <ul>
            <li><a href="index.html"><i class="fa-solid fa-house" aria-hidden="true"></i> Úvod</a></li>
            <li><a href="galerie.html"><i class="fa-solid fa-images" aria-hidden="true"></i> Galerie</a></li>
            <li><a href="akce.html"><i class="fa-solid fa-calendar-days" aria-hidden="true"></i> Akce</a></li>
            <li><a href="info.html"><i class="fa-solid fa-circle-info" aria-hidden="true"></i> O nás</a></li>
        </ul>
        <a href="info.html#podpora" class="btn btn-primary"><i class="fa-solid fa-heart" aria-hidden="true"></i> Podpořte nás</a>
    </nav>

    <div class="content-push"></div>`;
    }

    // ========== FOOTER ==========
    const footerEl = document.getElementById('site-footer');
    if (footerEl) {
        footerEl.outerHTML = `
    <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col footer-about">
                    <a href="index.html" class="logo-link">
                        <img src="Logo_Kozel.png" alt="Logo Spolek KOZEL" class="logo-icon">
                        <div class="logo-text">
                            <span class="logo-name">KOZEL</span>
                            <span class="logo-subtitle"><strong>K</strong>ulturní <strong>O</strong>bčerstvení <strong>ZEL</strong>enče</span>
                        </div>
                    </a>
                    <p>
                        Spolek pro Kulturní Občerstvení ZELenče. Pořádáme akce nejen pro
                        děti a&nbsp;rodiny — pohádkové stezky, masopusty, tvořivé
                        dílny, ale i koncerty, letní kina a&nbsp;další.
                    </p>
                    <div class="footer-social">
                        <a href="https://www.facebook.com/" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a>
                        <a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
                        <a href="mailto:pohadkoveputovanizelenci@gmail.com" aria-label="E-mail"><i class="fa-solid fa-envelope" aria-hidden="true"></i></a>
                    </div>
                </div>

                <div class="footer-col">
                    <h4>Navigace</h4>
                    <ul>
                        <li><a href="index.html"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i> Úvod</a></li>
                        <li><a href="galerie.html"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i> Galerie</a></li>
                        <li><a href="akce.html"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i> Akce</a></li>
                        <li><a href="info.html"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i> O nás</a></li>
                        <li><a href="info.html#podpora"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i> Podpořte nás</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h4>Kontakt</h4>
                    <div class="footer-contact-item">
                        <i class="fa-solid fa-phone" aria-hidden="true"></i>
                        <span>Ing. Michal Gazdo: <a href="tel:+420604176735">604&nbsp;176&nbsp;735</a><br>Jana Doležalová Mendlová: <a href="tel:+420607932148">607&nbsp;932&nbsp;148</a></span>
                    </div>
                    <div class="footer-contact-item">
                        <i class="fa-solid fa-envelope" aria-hidden="true"></i>
                        <span><a href="mailto:pohadkoveputovanizelenci@gmail.com">pohadkoveputovanizelenci<wbr>@gmail.com</a></span>
                    </div>
                    <div class="footer-contact-item">
                        <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
                        <span>Faltusova 184/9<br>Zeleneč 250 91</span>
                    </div>
                </div>

                <div class="footer-col">
                    <h4>Transparentní účet</h4>
                    <div class="footer-contact-item">
                        <i class="fa-solid fa-building-columns" aria-hidden="true"></i>
                        <span>
                            <strong>2801325330 / 2010</strong><br>
                            <small>Fio banka</small><br>
                            <small>IČO: 06529631</small>
                        </span>
                    </div>
                    <a href="info.html#podpora" class="btn btn-primary footer-support-btn">
                        <i class="fa-solid fa-heart" aria-hidden="true"></i> Podpořte nás
                    </a>
                </div>
            </div>

            <div class="footer-bottom">
                <span>&copy; ${new Date().getFullYear()} Spolek KOZEL. Všechna práva vyhrazena.</span>
                <span>
                    Vytvořeno s <i class="fa-solid fa-heart footer-heart" aria-hidden="true"></i>
                    pro komunitu v Zelenči
                    · <a href="admin.html" style="color:#64748b;font-size:.75rem;text-decoration:none;opacity:.5;" title="Správa obsahu">admin</a>
                </span>
            </div>
        </div>
    </footer>

    <button class="back-to-top" id="backToTop" aria-label="Zpět nahoru">
        <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>
    </button>`;
    }

    // ========== SET ACTIVE NAV LINK ==========
    document.querySelectorAll('.main-nav a, .mobile-nav ul a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === page || (page === '' && href === 'index.html')) {
            a.classList.add('active');
        }
    });
})();
