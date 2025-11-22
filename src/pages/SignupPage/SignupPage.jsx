import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translate/translations";
// APIs
import * as usersAPI from "../../utilities/users-api.js";

export default function SignupPage({ setUser }) {
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();

  const initialState = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const disabledSubmitBtn =
    Object.values(errors).every((val) => val === "") &&
    Object.values(formData).every((val) => val !== "")
      ? false
      : true;

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    checkErrors(evt);
  }

  function checkErrors({ target }) {
    const updateErrors = { ...errors };

    // Username
    if (target.name === "username") {
      updateErrors.username =
        target.value.length < 3
          ? "Your username must be at least three characters long."
          : "";
    }

    // Email
    if (target.name === "email") {
      updateErrors.email = !target.value.includes("@")
        ? "Your email must include the '@' symbol."
        : "";
    }

    // Password (strong validation)
    if (target.name === "password") {
      const val = target.value;
      let msg = "";
      if (val.length < 8) msg = "Password must be at least 8 characters long.";
      else if (!/[A-Z]/.test(val))
        msg = "Password must contain at least one uppercase letter.";
      else if (!/[0-9]/.test(val))
        msg = "Password must contain at least one number.";
      else if (!/[!@#$%^&*(),.?":{}|<>]/.test(val))
        msg = "Password must contain at least one special character.";
      updateErrors.password = msg;
    }

    // Confirm password
    if (target.name === "confirmPassword") {
      updateErrors.confirmPassword =
        target.value !== formData.password
          ? "Your passwords must match."
          : "";
    }

    setErrors(updateErrors);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const newUser = await usersAPI.signup(formData);
      setUser(newUser);
      setFormData(initialState);
      navigate("/bookstores");
    } catch (err) {
      console.log(err);

      // Show backend validation errors (if any)
      if (err?.response?.data) {
        const backendErrors = err.response.data;
        const updateErrors = { ...errors };

        if (backendErrors.password) {
          updateErrors.password = backendErrors.password.join(" ");
        }
        if (backendErrors.username) {
          updateErrors.username = backendErrors.username.join(" ");
        }
        if (backendErrors.email) {
          updateErrors.email = backendErrors.email.join(" ");
        }

        setErrors(updateErrors);
      }

      setUser(null);
    }
  }

  return (
    <>
      <div className="page-header">
        <h1>{translations[lang].signup}</h1>
      </div>

      <section>
        <form onSubmit={handleSubmit} className="form-container signup">
          <p>
            <label htmlFor="id_username">{translations[lang].username}:</label>
            <input
              type="text"
              value={formData.username}
              name="username"
              id="id_username"
              required
              minLength={3}
              maxLength={150}
              onChange={handleChange}
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </p>

          <p>
            <label htmlFor="id_email">{translations[lang].email}:</label>
            <input
              type="email"
              value={formData.email}
              name="email"
              id="id_email"
              required
              onChange={handleChange}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </p>

          <p>
            <label htmlFor="id_password1">{translations[lang].password}:</label>
            <input
              type="password"
              value={formData.password}
              name="password"
              id="id_password1"
              required
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </p>

          <p>
            <label htmlFor="id_password2">
              {translations[lang].confirmPassword}:
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              name="confirmPassword"
              id="id_password2"
              required
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </p>

          <button
            type="submit"
            disabled={disabledSubmitBtn}
            className="btn submit"
          >
            {translations[lang].signup}
          </button>
        </form>
      </section>
    </>
  );
}
