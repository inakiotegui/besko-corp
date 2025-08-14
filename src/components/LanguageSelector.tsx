import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/language-selector.css';

const languageLabels = {
  en: { placeholder: 'Language', options: { es: 'Español', ar: 'اَلْعَرَبِيَّة' } },
  es: { placeholder: 'Lenguaje', options: { en: 'English', ar: 'اَلْعَرَبِيَّة' } },
  ar: { placeholder: 'اللُّغَة', options: { en: 'English', es: 'Español' } },
} as const;

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { placeholder, options } = languageLabels[language];

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!open) return;
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const choose = (code: 'en'|'es'|'ar') => {
    setLanguage(code);
    setOpen(false);
  };

  return (
    <div className="lang">
      <button
        ref={btnRef}
        type="button"
        className="lang__btn"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={placeholder}
      >
        {placeholder}
        <span className="lang__caret" aria-hidden>▾</span>
      </button>

      {open && (
        <div ref={menuRef} className="lang__menu" role="listbox">
          {Object.entries(options).map(([code, label]) => (
            <button
              key={code}
              role="option"
              type="button"
              className="lang__option"
              onClick={() => choose(code as 'en'|'es'|'ar')}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
