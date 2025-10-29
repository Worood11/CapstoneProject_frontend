import "./styles.css";
import { Link } from "react-router";
export default function BookstoreCard({ bookstore }) {
  if (!bookstore) return null; 

  console.log(bookstore, "line 6 ")

  return (
    <div className="bookstore-card">
      <Link to = {`/bookstores/${bookstore.id}`}>
      <div className="bookstore-card-content">
        <h2>{bookstore.name}</h2>
        <img 
          src={bookstore?.image || "/placeholder.png"} 
          alt={bookstore?.name || "Bookstore"} 
        />
        <p>
          <small>{bookstore.description || "No description available"}</small>
        </p>
        <p><strong>City:</strong> {bookstore.city || "Unknown"}</p>
      </div>
      </Link>
    </div>
  );
}
