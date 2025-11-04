import { useState, useContext } from "react";
import "./styles.css";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translate/translations";
// APIs
import * as reviewsAPI from "../../utilities/reviews-api";

export default function ReviewForm({
  user,
  bookstoreDetail,
  reviews,
  setReviews,
}) {
  const { lang, toggleLang } = useContext(LanguageContext);
  const initialState = {
    title: "",
    rating: 5,
    body: "",
    bookstore: bookstoreDetail.id,
  };

  const [formData, setFormData] = useState(initialState);
  const [showForm, setShowForm] = useState(false);

  function handleChange(evt) {
    const updatedData = { ...formData, [evt.target.name]: evt.target.value };
    setFormData(updatedData);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const updatedReviews = await reviewsAPI.create(
        formData,
        bookstoreDetail.id
      );
      setReviews(updatedReviews);
      setFormData(initialState);
      setShowForm(false);
    } catch (err) {
      console.log(err);
      setReviews([...reviews]);
    }
  }

  if (user?.role === "admin") {
    return <p className="no-review-msg">{translations[lang].adminNoReview}</p>;
  }
  return (
    <div className="review-form-section">
      {!showForm ? (
        <button
          className="btn add-review-btn"
          onClick={() => setShowForm(true)}
        >
          ➕ {translations[lang].addreview}
        </button>
      ) : (
        <form className="form-container" onSubmit={handleSubmit}>
          <p>
            <label htmlFor="id_title">{translations[lang].title}:</label>
            <input
              value={formData.title}
              type="text"
              name="title"
              placeholder={translations[lang].titlePlaceholder}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <label htmlFor="id_rating">{translations[lang].rating}:</label>
            <select
              value={formData.rating}
              name="rating"
              id="id_rating"
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} ⭐
                </option>
              ))}
            </select>
          </p>
          <p>
            <label htmlFor="id_body">{translations[lang].review}:</label>
            <textarea
              value={formData.body}
              name="body"
              placeholder={translations[lang].reviewPlaceholder}
              onChange={handleChange}
              required
            />
          </p>
          <div className="form-buttons">
            <button type="submit" className="btn submit">
              {translations[lang].btnSubmit}
            </button>
            <button
              type="button"
              className="btn cancel"
              onClick={() => setShowForm(false)}
            >
              {translations[lang].btnCancel}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
