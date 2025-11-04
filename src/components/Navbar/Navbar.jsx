import "./styles.css";
import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translate/translations";
// APIs
import * as usersAPI from "../../utilities/users-api";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const { lang, dir, toggleLang } = useContext(LanguageContext);

  function handleLogout(e) {
    e.preventDefault();
    usersAPI.logout();
    setUser(null);
    navigate("/");
  }

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

        {user ? (
          <>
            <li>
              <Link to="/bookstores">{translations[lang].bookstores}</Link>
            </li>

            {user.role === "admin" && (
              <>
                <li>
                  <Link to="/bookstores/new">
                    {translations[lang].addBookstore}
                  </Link>
                </li>
                <li>
                  <Link to="/events/new">
                    {translations[lang].addEvent}
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/events">{translations[lang].events}</Link>
            </li>

            <form id="logout-form" onSubmit={handleLogout}>
              <button type="submit">{translations[lang].logout}</button>
            </form>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">{translations[lang].login}</Link>
            </li>
            <li>
              <Link to="/signup">{translations[lang].signup}</Link>
            </li>
          </>
        )}
      </ul>

      <button className="lang-btn" onClick={toggleLang}>
        {translations[lang].toggle}
      </button>
    </nav>
  );
}
