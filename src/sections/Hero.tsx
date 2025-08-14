import { useCallback } from 'react';
import '../styles/hero.css';
import fondoIcono from '../assets/logos/fondo-icono.png';
import fondoHero from '../assets/content/fondo-hero-min.png';

export default function Hero() {
  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section className="hero" aria-label="Hero">
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
        <h1 className="hero__title">
          We turn opportunities into global connections.
        </h1>

        <div className="hero__actions">
          <button
            type="button"
            className="hero__btn-1"
            onClick={() => scrollToId('services')}
          >
            Services
          </button>
          <button
            type="button"
            className="hero__btn-2"
            onClick={() => scrollToId('contact')}
          >
            Contact
          </button>
        </div>
      </div>
    </section>
  );
}
