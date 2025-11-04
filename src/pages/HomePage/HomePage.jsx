import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "./styles.css";

export default function HomePage() {
  const { lang } = useContext(LanguageContext);

  const quotes = {
    en: [
      "“A reader lives a thousand lives before he dies.” – George R.R. Martin",
      "“Books are a uniquely portable magic.” – Stephen King",
      "“A room without books is like a body without a soul.” – Cicero",
    ],
    ar: [
      "“القارئ يعيش ألف حياة قبل أن يموت.” – جورج مارتن",
      "“الكتب سحر يمكن حمله في أي مكان.” – ستيفن كينغ",
      "“غرفة بلا كتب كجسد بلا روح.” – سيسيرو",
    ],
  };

  const intro = {
    en: "A website that helps you find bookstores near you. You can also explore upcoming events so you never miss any book-related activities.",
    ar: "موقع يساعدك في العثور على المكتبات القريبة منك، كما يمكنك استكشاف الفعاليات القادمة لتبقى على اطلاع على كل ما يتعلق بالكتب.",
  };

  const title = {
    en: "Bookstop | The Station of Books",
    ar: "محطة الكتب | حيث تبدأ الحكاية",
  };

  
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes[lang].length);
    }, 4000);
    return () => clearInterval(timer);
  }, [lang]);

  return (
    <div className="home-container">
      <div className="overlay">
        <div className="home-content" dir={lang === "ar" ? "rtl" : "ltr"}>
          <h1 className="home-title">{title[lang]}</h1>
          <p className="home-intro">{intro[lang]}</p>

          <div className="quote-box fade">
            <p className="quote-text">{quotes[lang][index]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
