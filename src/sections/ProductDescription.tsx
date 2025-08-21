import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";
import "../styles/product-description.css";

import img1A from "../assets/content/7.png";
import img1B from "../assets/content/5.png";
import img2A from "../assets/content/3.png";
import img2B from "../assets/content/1.png";

function renderSubtitleHTML(text: string) {
  const html = text.replace(/\n/g, "<br/>");
  return (
    <p className="pd__subtitle" dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export default function ProductDescription() {
  const { language } = useLanguage();
  const t = translations[language];

  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = { threshold: 0.5 };
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    if (block1Ref.current) observer.observe(block1Ref.current);
    if (block2Ref.current) observer.observe(block2Ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="pd">
      <div className="pd__block">
        <div className="pd__inner">
          <div className="pd__right-inv">
            <div ref={block1Ref} className="pd__right-inner fade-left-pd">
              <h2 className="pd__title">{t.productDescription.title1}</h2>
              {renderSubtitleHTML(t.productDescription.subtitle1)}
            </div>
          </div>
          <div className="pd__left-inv">
            <img src={img1A} alt="" className="pd__imgA" aria-hidden="true" />
            <img src={img1B} alt="" className="pd__imgB" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="pd__block">
        <div className="pd__inner">
          <div className="pd__left">
            <img src={img2A} alt="" className="pd__imgC" aria-hidden="true" />
            <img src={img2B} alt="" className="pd__imgD" aria-hidden="true" />
          </div>
          <div className="pd__right">
            <div ref={block2Ref} className="pd__right-inner fade-right-pd">
              <h2 className="pd__title">{t.productDescription.title2}</h2>
              {renderSubtitleHTML(t.productDescription.subtitle2)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
