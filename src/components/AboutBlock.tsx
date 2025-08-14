import { useEffect, useRef, useState } from 'react';
import '../styles/about-block.css';
import logo from '../assets/logos/logo-blanco.svg';

type Props = {
  bgSrc: string;
  text: string;
  sectionId: string;
};

export default function AboutBlock({ bgSrc, text, sectionId }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = rootRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const raw = Math.max(0, Math.min(50, (-rect.top) * 0.1));
          setY(raw);
        }
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={rootRef} className="about" aria-label="About block" id={sectionId}>
      <img
        src={bgSrc}
        alt=""
        className="about__bg"
        style={{ transform: `translateY(${y}px)` }}
        aria-hidden="true"
      />

      <div className="about__inner">
        <div className="about__logo-wrap">
          <img src={logo} alt="" className="about__logo" aria-hidden="true" />
        </div>

        <div className="about__content">
          <p className="about__text">{text}</p>
        </div>
      </div>
    </section>
  );
}
