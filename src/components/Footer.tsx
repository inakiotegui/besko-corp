import { useCallback, useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import logo from '../assets/logos/logo-blanco.svg';
import '../styles/footer.css';

type NavItem = { id: string; target: string };

const NAV_ITEMS: NavItem[] = [
  { id: 'about-us', target: 'about-us' },
  { id: 'services', target: 'services' },
  { id: 'contact', target: 'contact' },
];

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];
  const labelMap = {
    'about-us': t.nav.about,
    services: t.nav.services,
    contact: t.nav.contact,
  };

  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = NAV_ITEMS
      .map(n => ({ id: n.id, el: document.getElementById(n.target) }))
      .filter((x): x is { id: string; el: HTMLElement } => !!x.el);

    const getFirstTop = () =>
      sections.length ? Math.min(...sections.map(s => s.el.offsetTop)) : 0;

    const onScrollSpy = () => {
      if (sections.length === 0) return;

      const viewportPivot = window.scrollY + window.innerHeight * 0.5;
      let current: string | null = null;

      for (const s of sections) {
        const top = s.el.offsetTop;
        if (viewportPivot >= top) current = s.id;
      }

      const firstTop = getFirstTop();
      if (window.scrollY < firstTop - 80) current = null;

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

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <footer className="footer" aria-label='Footer'>
      <div className="footer__inner">
        <div className="footer__left">
          <img src={logo} alt="Logo" className="footer__logo" />
          <p className="footer__subtitle">
            {t.hero?.title ?? 'Global connections for modern trade.'}
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          {NAV_ITEMS.map(item => (
            <a
              key={item.id}
              href={`#${item.target}`}
              className={`footer__link ${active === item.id ? 'is-active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(item.target);
              }}
            >
              {labelMap[item.id as keyof typeof labelMap]}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
