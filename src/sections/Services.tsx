import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUpRightAndDownLeftFromCenter, faShip, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import '../styles/services.css';

export default function ServicesSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const items = [
    {
      id: 'export',
      icon: faGlobe,
      title: t.services.export.title,
      subtitle: t.services.export.subtitle,
    },
    {
      id: 'import',
      icon: faUpRightAndDownLeftFromCenter,
      title: t.services.import.title,
      subtitle: t.services.import.subtitle,
    },
    {
      id: 'logistics',
      icon: faShip,
      title: t.services.logistics.title,
      subtitle: t.services.logistics.subtitle,
    },
    {
      id: 'advisory',
      icon: faMoneyBill,
      title: t.services.advisory.title,
      subtitle: t.services.advisory.subtitle,
    },
  ];

  return (
    <section className="services" aria-label={t.servicesTitle} id="services">
      <div className="services__inner">
        <h2 className="services__title">{t.servicesTitle}</h2>

        <div className="services__grid">
          {items.map((it) => (
            <article key={it.id} className="services__item">
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
