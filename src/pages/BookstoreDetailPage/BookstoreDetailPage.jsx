import "./styles.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";

// APIs
import * as bookstoreAPI from "../../utilities/bookstore-api";

export default function BookstoreDetailPage() {
  const [bookstoreDetail, setBookstoreDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getAndSetDetail() {
      try {
        console.log("Fetching bookstore with ID:", id);
        const bookstore = await bookstoreAPI.show(id);
        setBookstoreDetail(bookstore);
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
