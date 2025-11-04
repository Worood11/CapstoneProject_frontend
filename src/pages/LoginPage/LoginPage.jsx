import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translate/translations";
// APIs
import * as usersAPI from "../../utilities/users-api";

export default function LoginPage({ user, setUser }) {
  const { lang, toggleLang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const initialState = { username: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  async function handleLogin(evt) {
    evt.preventDefault();
    try {
      const loggedInUser = await usersAPI.login(formData);
      setUser(loggedInUser);

      setTimeout(() => {
        navigate("/bookstores");
      }, 0);
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid username or password");
      setUser(null);
    }
  }

  return (
    <>
        <div className="page-header">
           <h1>{translations[lang].login}</h1>
        </div>
    

      {!user && (
        <section>
          <form onSubmit={handleLogin} className="form-container login">
           
            {error && <p className="error-message">{error}</p>}

            <p>
              <label htmlFor="id_username">
                {translations[lang].username}:
              </label>
              <input
                value={formData.username}
                type="text"
                name="username"
                maxLength="150"
                required
                id="id_username"
                onChange={handleChange}
              />
            </p>

            <p>
              <label htmlFor="id_password">
                {translations[lang].password}:
              </label>
              <input
                value={formData.password}
                type="password"
                name="password"
                required
                id="id_password"
                onChange={handleChange}
              />
            </p>

            <button type="submit" className="btn submit">
              {translations[lang].login}
            </button>
          </form>
        </section>
      )}
    </>
  );
}
