import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import ObjectivesBlock from '../components/ObjectivesBlock';

import objA from '../assets/content/fondo-businessobj-min.png';
import objB from '../assets/content/business-obj-min.png';

export default function BusinessObjectives() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <ObjectivesBlock
      imgA={objA}
      imgB={objB}
      title={t.businessObjectivesTitle}
      subtitle={t.businessObjectivesSubtitle}
    />
  );
}
