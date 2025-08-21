import { useEffect, useRef } from "react";
import "../styles/objectives-block.css";

type Props = {
  imgA: string;
  imgB: string;
  title: string;
  subtitle: string;
};

function renderSubtitleHTML(text: string) {
  const html = text.replace(/-([^-\n]+)-/g, "<strong>$1</strong>");
  return (
    <p className="obj__subtitle" dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export default function ObjectivesBlock({
  imgA,
  imgB,
  title,
  subtitle,
}: Props) {
  const rightRef = useRef<HTMLDivElement>(null);

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
    if (rightRef.current) observer.observe(rightRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="obj" aria-label="Objectives block">
      <div className="obj__inner">
        <div className="obj__left">
          <img src={imgA} alt="" className="obj__imgA" aria-hidden="true" />
          <img src={imgB} alt="" className="obj__imgB" aria-hidden="true" />
        </div>
        <div className="obj__right">
          <div ref={rightRef} className="obj__right-inner fade-up-obj">
            <h2 className="obj__title">{title}</h2>
            {renderSubtitleHTML(subtitle)}
          </div>
        </div>
      </div>
    </section>
  );
}
