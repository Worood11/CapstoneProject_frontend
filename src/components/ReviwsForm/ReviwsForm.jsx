import { useState } from "react";
import "./styles.css";
import * as reviewsAPI from "../../utilities/reviews-api";

export default function ReviewForm({ bookstoreDetail, reviews, setReviews }) {
  const initialState = {
    title: "",
    rating: 5,
    body: "",
    bookstore: bookstoreDetail.id,
  };
  const [formData, setFormData] = useState(initialState);

  function handleChange(evt) {
    const updatedData = { ...formData, [evt.target.name]: evt.target.value };
    setFormData(updatedData);
  }

  async function handleSubmit(evt) {
    try {
      evt.preventDefault();
      const updatedReviews = await reviewsAPI.create(
        formData,
        bookstoreDetail.id
      );
      setReviews(updatedReviews);
      setFormData(initialState);
    } catch (err) {
      console.log(err);
      setReviews([...reviews]);
    }
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <p>
        <label htmlFor="id_title">Title:</label>
        <input
          value={formData.title}
          type="text"
          name="title"
          placeholder="Review title"
          onChange={handleChange}
          required
        />
      </p>
      <p>
        <label htmlFor="id_rating">Rating:</label>
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
        <label htmlFor="id_body">Review:</label>
        <textarea
          value={formData.body}
          name="body"
          placeholder="Write your review..."
          onChange={handleChange}
          required
        />
      </p>
      <button type="submit" className="btn submit">
        Add Review
      </button>
    </form>
  );
}
