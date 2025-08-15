import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import agencyLogo from '../assets/logos/agency-logo.svg';
import '../styles/dev-bar.css';

export default function DevBar() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="devbar">
      <div className="devbar__inner">
        <span className="devbar__text">{t.devbar?.by ?? 'Developed by'}</span>
        <img src={agencyLogo} alt="Agency logo" className="devbar__logo" />
      </div>
    </div>
  );
}
