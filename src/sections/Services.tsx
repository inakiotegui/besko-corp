import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faUpRightAndDownLeftFromCenter,
  faShip,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";
import "../styles/services.css";

export default function ServicesSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  const items = [
    {
      id: "export",
      icon: faGlobe,
      title: t.services.export.title,
      subtitle: t.services.export.subtitle,
    },
    {
      id: "import",
      icon: faUpRightAndDownLeftFromCenter,
      title: t.services.import.title,
      subtitle: t.services.import.subtitle,
    },
    {
      id: "logistics",
      icon: faShip,
      title: t.services.logistics.title,
      subtitle: t.services.logistics.subtitle,
    },
    {
      id: "advisory",
      icon: faMoneyBill,
      title: t.services.advisory.title,
      subtitle: t.services.advisory.subtitle,
    },
  ];

  useEffect(() => {
    const options = { threshold: 0.3 };
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === titleRef.current) {
            entry.target.classList.add("show");
            if (itemsRef.current[0]) itemsRef.current[0].classList.add("show");
          } else {
            entry.target.classList.add("show");
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (titleRef.current) observer.observe(titleRef.current);
    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="services" aria-label={t.servicesTitle} id="services">
      <div className="services__inner">
        <h2 ref={titleRef} className="services__title fade-up-serv">
          {t.servicesTitle}
        </h2>

        <div className="services__grid">
          {items.map((it, idx) => (
            <article
              key={it.id}
              ref={(el) => { itemsRef.current[idx] = el }}
              className={`services__item fade-up-serv-deep delay-${idx}`}
            >
              <div className="services__icon-wrap">
                <FontAwesomeIcon icon={it.icon} className="services__icon" />
              </div>
              <h3 className="services__item-title">{it.title}</h3>
              <p className="services__item-sub">{it.subtitle}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
