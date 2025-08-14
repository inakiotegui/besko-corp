import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import ObjectivesBlock from '../components/ObjectivesBlock';

import objA from '../assets/content/fondo-commit-min.png';
import objB from '../assets/content/commit-min.png';

export default function CommitmentToExcellence() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <ObjectivesBlock
      imgA={objA}
      imgB={objB}
      title={t.commitmentToExcellenceTitle}
      subtitle={t.commitmentToExcellenceSubtitle}
    />
  );
}
