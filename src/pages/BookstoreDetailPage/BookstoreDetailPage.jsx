import "./styles.css";
import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router";
import ReviewForm from "../../components/ReviwsForm/ReviwsForm";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translate/translations";

// APIs
import * as bookstoreAPI from "../../utilities/bookstore-api";
import * as reviewsAPI from "../../utilities/reviews-api";
import * as eventsAPI from "../../utilities/events-api";

export default function BookstoreDetailPage({ user }) {
  const { lang } = useContext(LanguageContext);
  const [bookstoreDetail, setBookstoreDetail] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [events, setEvents] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function getAndSetDetail() {
      try {
        const bookstore = await bookstoreAPI.show(id);
        setBookstoreDetail(bookstore);

        const reviewsData = await reviewsAPI.getByBookstore(id);
        setReviews(reviewsData);

        const eventsData = await eventsAPI.getByBookstore(id);
        setEvents(eventsData);
      } catch (err) {
        console.log(err);
        setBookstoreDetail(null);
      }
    }
    if (id) getAndSetDetail();
  }, [id]);

  if (!bookstoreDetail)
    return (
      <h3>{"Loading bookstore details..."}</h3>
    );

  const visibleEvents = showAllEvents ? events : events.slice(0, 3);

  return (
    <section className="detail-bookstore-container">
      <div className="bookstore-details">
        <h2>{bookstoreDetail.name}</h2>
        <img
          src={bookstoreDetail.image || "/placeholder.png"}
          alt={bookstoreDetail.name || "Bookstore"}
        />

        <p>
          <strong>{translations[lang].description}: </strong>
          {bookstoreDetail.description || "No description available"}
        </p>
        <p>
          <strong>{translations[lang].city}:</strong>{" "}
          {bookstoreDetail.city || "Unknown"}
        </p>
        <p className="location">
          <strong>{translations[lang].location}:</strong>{" "}
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

        <div className="events-section">
          <h3>{translations[lang].events}</h3>
          {events.length === 0 ? (
            <p>{translations[lang].noEvents}</p>
          ) : (
            <>
              <div className="event-tags">
                {visibleEvents.map((event) => (
                  <div key={event.id} className="event-tag">
                    <span className="event-name">{event.name}</span>
                    <small>
                      {new Date(event.date).toLocaleDateString()}{" "}
                      {event.time && `• ${event.time.slice(0, 5)}`}
                    </small>
                  </div>
                ))}
              </div>

              {events.length > 3 && (
                <button
                  className="toggle-events-btn"
                  onClick={() => setShowAllEvents(!showAllEvents)}
                >
                  {showAllEvents
                    ? translations[lang].showLess || "Show Less"
                    : translations[lang].showMore || "Show More"}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="reviews-section">
        <h3>{translations[lang].reviews}</h3>

        <div className="reviews-layout">
          <div className="reviews-list">
            {reviews.length === 0 ? (
              <p>
                {translations[lang].noReviews ||
                  "No reviews yet. Be the first to write one!"}
              </p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <h4>{review.title}</h4>
                  <p>
                    <strong>{translations[lang].rating}:</strong>{" "}
                    <span style={{ color: "#FFD700" }}>
                      {"★".repeat(review.rating) +
                        "☆".repeat(5 - review.rating)}
                    </span>
                  </p>
                  <p>{review.body}</p>
                  <small>
                    {translations[lang].postedOn}{" "}
                    {new Date(review.created_at).toLocaleDateString()}
                  </small>
                  <button
                    className="delete-btn"
                    onClick={async () => {
                      try {
                        await reviewsAPI.remove(review.id);
                        setReviews(reviews.filter((r) => r.id !== review.id));
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                  >
                    &times;
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="review-form-side">
            <ReviewForm
              user={user}
              bookstoreDetail={bookstoreDetail}
              reviews={reviews}
              setReviews={setReviews}
            />
          </div>
        </div>
      </div>

      <div className="bookstore-actions">
        {user?.role === "admin" && (
          <Link
            to={`/bookstores/edit/${bookstoreDetail.id}`}
            className="btn primary"
          >
            {translations[lang].edit || "Edit"}
          </Link>
        )}
        {user?.role === "admin" && (
          <Link
            to={`/bookstores/confirm_delete/${bookstoreDetail.id}`}
            className="btn danger"
          >
            {translations[lang].btndelete || "Delete"}
          </Link>
        )}
      </div>
    </section>
  );
}
