import { useEffect, useState } from "react";
import BookstoreCard from "../../components/BookstoreCard/BookstoreCard";

// APIs
import * as bookstoreAPI from "../../utilities/bookstore-api";

export default function BookstoreIndexPage() {
  const [allBookstores, setAllBookstores] = useState([]);

  useEffect(() => {
    async function getAllBookstores() {
      try {
        const bookstoreData = await bookstoreAPI.index();
        console.log(bookstoreData);
        setAllBookstores(bookstoreData);
      } catch (err) {
        console.log(err);
      }
    }

    if (allBookstores.length === 0) getAllBookstores();
  }, []);

  return (
    <section className="card-container">
      {allBookstores.map((store) => (
        <BookstoreCard key={store.id} bookstore={store} />
      ))}
    </section>
  );
}
