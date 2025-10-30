import "./styles.css";
import { useContext, useEffect } from "react";
import { Link } from "react-router";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translate/translations";

export default function Navbar() {
  const { lang,dir, toggleLang } = useContext(LanguageContext);

  return (
    <nav className={`navbar ${dir}`}>
      <div className="logo">{translations[lang].logo}</div>

      <input type="checkbox" id="check" className="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fas fa-bars"></i>
      </label>

      <ul className="nav-links">
        <li>
          <Link to="/">{translations[lang].home}</Link>
        </li>
        <li>
          <Link to="/bookstores">{translations[lang].bookstores}</Link>
        </li>
        <li>
          <Link to="/bookstores/new">{translations[lang].addBookstore}</Link>
        </li>
        <li>
          <Link to="/about">{translations[lang].about}</Link>
        </li>
      </ul>

      <button className="lang-btn" onClick={toggleLang}>
        {translations[lang].toggle}
      </button>
    </nav>
  );
}