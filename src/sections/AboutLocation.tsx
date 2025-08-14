import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import AboutBlock from '../components/AboutBlock';
import bgA from '../assets/content/global-presence-101-min.jpg';

export default function AboutSectionB() {
  const { language } = useLanguage();

  return (
    <AboutBlock
      bgSrc={bgA}
      text={translations[language].aboutB}
      sectionId='about-location'
    />
  );
}
