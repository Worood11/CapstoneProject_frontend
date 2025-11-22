import "./styles.css";
import { Link } from "react-router";
export default function BookstoreCard({ bookstore }) {
  if (!bookstore) return null;

  const avg = bookstore.avg_rating || 0;
  const fullStars = "★".repeat(Math.floor(avg));
  const emptyStars = "☆".repeat(5 - Math.floor(avg));

  return (
    <div className="bookstore-card">
      <Link to={`/bookstores/${bookstore.id}`} className="bookstore-link">
        <img
          src={bookstore?.image || "/placeholder.png"}
          alt={bookstore?.name || "Bookstore"}
        />
        <div className="bookstore-card-content">
          <div className="name-row">
            <h2 className="bookstore-name">{bookstore.name}</h2>

            <p className="avg-rating-inline">
              {avg.toFixed(1)}
              <span className="star"> ⭐</span>
            </p>
          </div>

          <p className="bookstore-description">
            <small>{bookstore.description || "No description available"}</small>
          </p>
          <p className="meta">
            <strong>City:</strong> {bookstore.city || "Unknown"}
          </p>
        </div>
      </Link>
    </div>
  );
}
