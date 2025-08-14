import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import AboutBlock from '../components/AboutBlock';
import bgA from '../assets/content/about-us-100-min.jpg';

export default function AboutSectionA() {
  const { language } = useLanguage();

  return (
    <AboutBlock
      bgSrc={bgA}
      text={translations[language].aboutA}
      sectionId="about-us"
    />
  );
}
