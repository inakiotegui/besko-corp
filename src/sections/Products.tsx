import { useEffect, useRef } from "react";
import iconNuez from "../assets/content/icon-nuez.png";
import iconAlfalfa from "../assets/content/icon-alfalfa.png";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";
import "../styles/products.css";

export default function ProductsSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const headerRefs = useRef<(HTMLElement | null)[]>([]);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  const items = [
    {
      id: "nuez",
      icon: iconNuez,
      title: t.products.nuez.title,
      subtitle: t.products.nuez.subtitle,
    },
    {
      id: "alfalfa",
      icon: iconAlfalfa,
      title: t.products.alfalfa.title,
      subtitle: t.products.alfalfa.subtitle,
    },
  ];

  useEffect(() => {
    const options = { threshold: 0.3 };
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    headerRefs.current.forEach((el) => el && observer.observe(el));
    itemsRef.current.forEach((el) => el && observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="products" aria-label={t.productsTitle} id="products">
      <div className="products__inner">
        <h2
          ref={(el) => { headerRefs.current[0] = el; }}
          className="products__title fade-up-prod"
        >
          {t.productsTitle}
        </h2>
        <p
          ref={(el) => {headerRefs.current[1] = el}}
          className="products__subtitle fade-up-prod"
        >
          {t.productsSubtitle}
        </p>

        <div className="products__grid">
          {items.map((it, idx) => (
            <article
              key={it.id}
              ref={(el) => {itemsRef.current[idx] = el}}
              className={`products__item fade-up-prod-deep delay-${idx}`}
            >
              <div className="products__icon-wrap">
                <img src={it.icon} alt={it.title} className="products__icon" />
              </div>
              <h3 className="products__item-title">{it.title}</h3>
              <p className="products__item-sub">{it.subtitle}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
