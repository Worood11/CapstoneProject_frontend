import "./styles.css";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translate/translations";

// APIs
import * as eventAPI from "../../utilities/events-api";
import * as bookstoreAPI from "../../utilities/bookstore-api";

export default function EventFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const { lang } = useContext(LanguageContext);

  const [formData, setFormData] = useState({
    bookstore: "",
    name: "",
    description: "",
    date: "",
    time: "",
  });

  const [bookstores, setBookstores] = useState([]);

  
  useEffect(() => {
    async function fetchBookstores() {
      try {
        const data = await bookstoreAPI.index();
        setBookstores(data);
      } catch (err) {
        console.error("Error fetching bookstores:", err);
      }
    }
    fetchBookstores();
  }, []);


  useEffect(() => {
    if (isEditing) {
      async function fetchEvent() {
        try {
          const event = await eventAPI.getEvent(id);
          setFormData({
            bookstore: event.bookstore || "",
            name: event.name || "",
            description: event.description || "",
            date: event.date ? event.date.slice(0, 10) : "",
            time: event.time || "",
          });
        } catch (err) {
          console.error("Error fetching event:", err);
        }
      }
      fetchEvent();
    }
  }, [id, isEditing]);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await eventAPI.updateEvent(id, formData);
      } else {
        await eventAPI.createEvent(formData.bookstore, formData);
      }
      navigate("/events");
    } catch (err) {
      console.error("Error saving event:", err);
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>
          {isEditing
            ? translations[lang].editEvent || "Edit Event"
            : translations[lang].addEvent}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <table>
          <tbody>
            <tr>
              <th>
                <label htmlFor="id_bookstore">
                  {translations[lang].selectBookstore}:
                </label>
              </th>
              <td>
                <select
                  id="id_bookstore"
                  name="bookstore"
                  value={formData.bookstore}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    -- {translations[lang].select} --
                  </option>
                  {bookstores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="id_name">
                  {translations[lang].name}:
                </label>
              </th>
              <td>
                <input
                  id="id_name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="id_description">
                  {translations[lang].description}:
                </label>
              </th>
              <td>
                <textarea
                  id="id_description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={500}
                />
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="id_date">
                  {translations[lang].date}:
                </label>
              </th>
              <td>
                <input
                  id="id_date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="id_time">
                  {translations[lang].time}:
                </label>
              </th>
              <td>
                <input
                  id="id_time"
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit" className="btn end submit">
          {isEditing
            ? translations[lang].saveChanges || "Save Changes"
            : translations[lang].btnSubmit}
        </button>
      </form>
    </>
  );
}
