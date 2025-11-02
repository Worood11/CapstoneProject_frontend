import { useState } from "react";
import { useNavigate } from "react-router";

// APIs
import * as usersAPI from "../../utilities/users-api";

export default function LoginPage({ user, setUser }) {
  const navigate = useNavigate();
  const initialState = { username: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  // Handle typing in inputs
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
      <section className="logo-container">
        <div className="home-bookstore-container"></div>
      </section>

      {!user && (
        <section>
          <form onSubmit={handleLogin} className="form-container login">
            <h1>Login</h1>

            {error && <p className="error-message">{error}</p>}

            <p>
              <label htmlFor="id_username">Username:</label>
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
              <label htmlFor="id_password">Password:</label>
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
              Login
            </button>
          </form>
        </section>
      )}
    </>
  );
}
