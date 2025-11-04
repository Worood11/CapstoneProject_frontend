import "./styles.css";
import { Link } from "react-router";
export default function BookstoreCard({ bookstore }) {
  if (!bookstore) return null;
  return (
    <div className="bookstore-card">
      <Link to={`/bookstores/${bookstore.id}`} className="bookstore-link">
        <img
          src={bookstore?.image || "/placeholder.png"}
          alt={bookstore?.name || "Bookstore"}
        />
        <div className="bookstore-card-content">
          <h2 className="bookstore-name">{bookstore.name}</h2>
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
