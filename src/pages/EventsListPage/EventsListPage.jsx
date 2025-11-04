import "./styles.css";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translate/translations";

// APIs
import * as eventsAPI from "../../utilities/events-api";

export default function EventsListPage({ user }) {
  const { lang } = useContext(LanguageContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookstore, setSelectedBookstore] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await eventsAPI.index();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) {
    return <p>{translations[lang].loading || "Loading events..."}</p>;
  }

  const bookstoreNames = [
    ...new Set(events.map((event) => event.bookstore_name)),
  ];

  const filteredEvents = selectedBookstore
    ? events.filter((event) => event.bookstore_name === selectedBookstore)
    : events;

  return (
    <section className="events-list-container">
      <h1>{translations[lang].events}</h1>

      <div className="filters">
        <select
          value={selectedBookstore}
          onChange={(e) => setSelectedBookstore(e.target.value)}
          className="city-filter"
        >
          <option value="">{translations[lang].allBookstores}</option>
          {bookstoreNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {filteredEvents.length === 0 ? (
        <p>{translations[lang].noEvents}</p>
      ) : (
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p>
                <strong>
                  {new Date(event.date).toLocaleDateString()}{" "}
                  {event.time && `• ${event.time.slice(0, 5)}`}
                </strong>
              </p>
              <p>📚 {event.bookstore_name}</p>

              <div className="event-card-footer">
                {user?.role === "admin" && (
                  <>
                    <Link to={`/events/${event.id}/edit`} className="edit-btn">
                      ✏️ {translations[lang].edit}
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={async () => {
                        try {
                          await eventsAPI.deleteEvent(event.id);
                          setEvents(events.filter((e) => e.id !== event.id));
                        } catch (err) {
                          console.error("Error deleting event:", err);
                        }
                      }}
                    >
                      &times;
                    </button>
                  </>
                )}

                <Link
                  to={`/bookstores/${event.bookstore}/`}
                  className="view-btn"
                >
                  {translations[lang].viewBookstore}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
