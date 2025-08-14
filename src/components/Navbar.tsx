import { useEffect, useState, useCallback } from 'react';
import LanguageSelector from './LanguageSelector';
import '../styles/navbar.css';
import logo from '../assets/logos/logo-blanco.svg';
import logoMobile from '../assets/logos/besko-corp-logo.png';

type NavItem = { id: string; label: string; target: string };

const NAV_ITEMS: NavItem[] = [
  { id: 'about-us', label: 'About us', target: 'about-us' },
  { id: 'services', label: 'Services', target: 'services' },
  { id: 'contact', label: 'Contact', target: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('about-us');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

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
  };

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
              {item.label}
            </a>
          ))}
          <LanguageSelector />
        </nav>
        <button
          type="button"
          className={`navbar__hamburger ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
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
        <div className="navbar__mobile-inner">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.target}`}
              className={`nav__btn--mobile ${
                active === item.id ? 'is-active' : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item);
                setOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
          <div className="navbar__mobile-lang">
            <LanguageSelector />
          </div>
        </div>
      </aside>
    </header>
  );
}
