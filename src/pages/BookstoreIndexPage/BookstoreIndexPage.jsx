import React, { useEffect, useState, useContext} from "react";
import BookstoreCard from "../../components/BookstoreCard/BookstoreCard";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translate/translations";
// APIs
import * as bookstoreAPI from "../../utilities/bookstore-api";

export default function BookstoreIndexPage() {
  const { lang, dir } = useContext(LanguageContext);
  const [allBookstores, setAllBookstores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    async function getAllBookstores() {
      try {
        const bookstoreData = await bookstoreAPI.index();
        setAllBookstores(bookstoreData);
      } catch (err) {
        console.log(err);
      }
    }

    getAllBookstores();
  }, []);

  
  const cities = [...new Set(allBookstores.map((store) => store.city))];

 
  const filteredBookstores = allBookstores.filter((store) => {
    const matchesSearch = store.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity ? store.city === selectedCity : true;
    return matchesSearch && matchesCity;
  });

  return (
    <section className="bookstores-page" dir={dir}>
    
      <div className="filters">
        <input
          type="text"
          placeholder={`${translations[lang].searchBy} ${translations[lang].name}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="city-filter"
        >
          <option value="">{translations[lang].allCities}</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

 
      <div className="card-container">
        {filteredBookstores.length > 0 ? (
          filteredBookstores.map((store) => (
            <BookstoreCard key={store.id} bookstore={store} />
          ))
        ) : (
          <p>{translations[lang].noResults}</p>
        )}
      </div>
    </section>
  );
}
