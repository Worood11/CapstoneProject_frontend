import "./styles.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import ReviewForm from "../../components/ReviwsForm/ReviwsForm";

// APIs
import * as bookstoreAPI from "../../utilities/bookstore-api";
import * as reviewsAPI from "../../utilities/reviews-api";

export default function BookstoreDetailPage() {
  const [bookstoreDetail, setBookstoreDetail] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getAndSetDetail() {
      try {
        const bookstore = await bookstoreAPI.show(id);
        setBookstoreDetail(bookstore);
        const reviewsData = await reviewsAPI.getByBookstore(id);
        setReviews(reviewsData);
      } catch (err) {
        console.log(err);
        setBookstoreDetail(null);
      }
    }
    if (id) getAndSetDetail();
  }, [id]);

  if (!bookstoreDetail)
    return <h3>Your bookstore details will display soon</h3>;

  return (
    <section className="detail-bookstore-container">
      <div className="bookstore-details">
        <h2>{bookstoreDetail.name}</h2>
        <img
          src={bookstoreDetail.image || "/placeholder.png"}
          alt={bookstoreDetail.name || "Bookstore"}
        />

        <p>
          <strong>Description: </strong>
          {bookstoreDetail.description || "No description available"}
        </p>
        <p>
          <strong>City:</strong> {bookstoreDetail.city || "Unknown"}
        </p>
        <p className="location">
          <strong>Location:</strong>{" "}
          {bookstoreDetail.map_url ? (
            <a
              href={bookstoreDetail.map_url}
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              Open Map
            </a>
          ) : (
            "Unknown"
          )}
        </p>
      </div>
      <div className="reviews-section">
        <h3>Reviews</h3>

        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to write one!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <h4>{review.title}</h4>
              <p>
                <strong>Rating:</strong>{" "}
                <span style={{ color: "#FFD700" }}>
                  {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                </span>
              </p>
              <p>{review.body}</p>
              <small>
                Posted on: {new Date(review.created_at).toLocaleDateString()}
              </small>

              <button
                className="btn danger"
                onClick={async () => {
                  try {
                    await reviewsAPI.remove(review.id);
                    setReviews(reviews.filter((r) => r.id !== review.id));
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}

        <ReviewForm
          bookstoreDetail={bookstoreDetail}
          reviews={reviews}
          setReviews={setReviews}
        />
      </div>

      <div className="bookstore-actions">
        <Link
          to={`/bookstores/edit/${bookstoreDetail.id}`}
          className="btn primary"
        >
          Edit
        </Link>
        <Link
          to={`/bookstores/confirm_delete/${bookstoreDetail.id}`}
          className="btn danger"
        >
          Delete
        </Link>
      </div>
    </section>
  );
}
