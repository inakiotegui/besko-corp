import { useEffect, useState, useCallback, useRef } from 'react';
import LanguageSelector from './LanguageSelector';
import '../styles/navbar.css';
import logo from '../assets/logos/logo-blanco.svg';
import logoMobile from '../assets/logos/besko-corp-logo.png';

import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

type NavItem = { id: string; target: string };

const NAV_ITEMS: NavItem[] = [
  { id: 'about-us', target: 'about-us' },
  { id: 'services', target: 'services' },
  { id: 'contact', target: 'contact' },
];

export default function Navbar() {
  const { language } = useLanguage();
  const t = translations[language];
  const labelMap = {
    'about-us': t.nav.about,
    services: t.nav.services,
    contact: t.nav.contact,
  };

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1024) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty('--scrollbar-width', `${w}px`);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleNavClick = (item: NavItem) => {
    setActive(item.id);
    scrollToId(item.target);
    setOpen(false);
  };

  useEffect(() => {
  const sections = NAV_ITEMS
    .map(n => ({ id: n.id, el: document.getElementById(n.target) }))
    .filter((x): x is { id: string; el: HTMLElement } => !!x.el);

  const getFirstTop = () => Math.min(...sections.map(s => s.el.offsetTop));

  const onScrollSpy = () => {
    if (sections.length === 0) return;

    const viewportPivot = window.scrollY + window.innerHeight * 0.50;
    let current: string | null = null;

    for (const s of sections) {
      const top = s.el.offsetTop;
      if (viewportPivot >= top) current = s.id;
    }

    const firstTop = getFirstTop();
    if (window.scrollY < firstTop - 80) {
      current = null;
    }

    setActive(current);
  };

  onScrollSpy();
  window.addEventListener('scroll', onScrollSpy, { passive: true });
  window.addEventListener('resize', onScrollSpy);
  return () => {
    window.removeEventListener('scroll', onScrollSpy);
    window.removeEventListener('resize', onScrollSpy);
  };
}, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__content">
        <div className="navbar__logo-wrap">
          <img
            src={isMobile ? logoMobile : logo}
            alt="Logo"
            className="navbar__logo"
          />
        </div>

        <nav className="navbar__nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.target}`}
              className={`nav__btn ${active === item.id ? 'is-active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item);
              }}
            >
              {labelMap[item.id as keyof typeof labelMap]}
            </a>
          ))}
          <LanguageSelector />
        </nav>

        <button
          type="button"
          className={`navbar__hamburger ${open ? 'is-open' : ''}`}
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <aside
        id="mobile-menu"
        className={`navbar__mobile ${open ? 'navbar__mobile--open' : ''}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <div
          className="navbar__mobile-inner"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.target}`}
              className={`nav__btn--mobile ${active === item.id ? 'is-active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item);
              }}
            >
              {labelMap[item.id as keyof typeof labelMap]}
            </a>
          ))}
          <div
            className="navbar__mobile-lang"
            onChange={() => setOpen(false)}
          >
            <LanguageSelector />
          </div>
        </div>
        <button
          type="button"
          className="navbar__mobile-backdrop"
          aria-label={t.nav.closeMenu}
          onClick={() => setOpen(false)}
        />
      </aside>
    </header>
  );
}
