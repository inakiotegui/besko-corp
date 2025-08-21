import { useCallback, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import '../styles/hero.css';
import fondoIcono from '../assets/logos/fondo-icono.png';
import fondoHero from '../assets/content/fondo-hero-min.png';

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const btn1Ref = useRef<HTMLButtonElement | null>(null);
  const btn2Ref = useRef<HTMLButtonElement | null>(null);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const options = {
      threshold: 0.5,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (titleRef.current) observer.observe(titleRef.current);
    if (btn1Ref.current) observer.observe(btn1Ref.current);
    if (btn2Ref.current) observer.observe(btn2Ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="hero" id="hero" aria-label="Hero">
      <img
        src={fondoHero}
        alt=""
        className="hero__bg-graphic"
        aria-hidden="true"
      />
      <img
        src={fondoIcono}
        alt=""
        className="hero__bg-icon"
        aria-hidden="true"
      />
      <div className="hero__content">
        <h1 ref={titleRef} className="hero__title fade-up">{t.hero.title}</h1>
        <div className="hero__actions">
          <button
            ref={btn1Ref}
            type="button"
            className="hero__btn-1 fade-up delay-1"
            onClick={() => scrollToId('services')}
          >
            {t.nav.services}
          </button>
          <button
            ref={btn2Ref}
            type="button"
            className="hero__btn-2 fade-up delay-2"
            onClick={() => scrollToId('contact')}
          >
            {t.nav.contact}
          </button>
        </div>
      </div>
    </section>
  );
}
