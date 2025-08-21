import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";
import "../styles/contact.css";
import contactImg from "../assets/content/fondo-cont-min.png";

export default function ContactSection() {
  const { language } = useLanguage();
  const t = translations[language].contact;

  const formRef = useRef<HTMLFormElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string>("");
  const [show, setShow] = useState(false);

  const setHidden = (name: string, value: string) => {
    if (!formRef.current) return;
    const el = formRef.current.querySelector(
      `input[name="${name}"]`
    ) as HTMLInputElement | null;
    if (el) el.value = value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const now = new Date();
    const locale = language === "es" ? "es-AR" : "en-US";

    const timestamp = now.toLocaleString(locale, {
      dateStyle: "short",
      timeStyle: "short",
    });

    const fromEmailInput = formRef.current.querySelector(
      'input[name="from_email"]'
    ) as HTMLInputElement | null;
    const fromEmail = fromEmailInput?.value ?? "";

    setHidden("timestamp", timestamp);
    setHidden("year", String(now.getFullYear()));
    setHidden("reply_to", fromEmail);

    setIsSending(true);
    setError("");

    try {
      const res = await emailjs.sendForm(
        "service_besko",
        "template_besko_corp",
        formRef.current,
        "iNV8CwZKp8Tl58D8C"
      );

      if (res.status === 200) {
        formRef.current.reset();
        alert(t.success);
      } else {
        setError(t.error);
      }
    } catch (err) {
      console.error(err);
      setError(t.error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShow(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    if (boxRef.current) observer.observe(boxRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="contact" aria-label={t.title} id="contact">
      <div className="contact__left">
        <div
          ref={boxRef}
          className={`contact__box contact-anim-left ${
            show ? "contact-anim-left--show" : ""
          }`}
        >
          <h2 className="contact__title">{t.title}</h2>
          <p className="contact__lead">{t.lead}</p>

          {error && <p className="contact__error">{error}</p>}

          <form ref={formRef} className="contact__form" onSubmit={handleSubmit}>
            <input
              className="contact__input"
              type="text"
              name="from_name"
              placeholder={t.name}
              required
            />
            <input
              className="contact__input"
              type="email"
              name="from_email"
              placeholder={t.email}
              required
            />
            <textarea
              className="contact__textarea"
              name="message"
              placeholder={t.message}
              rows={5}
              required
            />
            <input type="hidden" name="timestamp" />
            <input type="hidden" name="year" />
            <input type="hidden" name="reply_to" />
            <button
              className="contact__submit"
              type="submit"
              disabled={isSending}
            >
              {isSending ? t.sending : t.submit}
            </button>
          </form>

          <div className="contact__social">
            <a
              href="https://www.linkedin.com/company/beskocorp/"
              aria-label="LinkedIn"
              className="contact__social-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.facebook.com/beskocorp"
              aria-label="Facebook"
              className="contact__social-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/beskocorp/"
              aria-label="Instagram"
              className="contact__social-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="contact__right">
        <img
          src={contactImg}
          alt=""
          className="contact__img"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
