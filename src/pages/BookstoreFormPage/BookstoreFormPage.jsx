import "./styles.css";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translate/translations";
// APIs
import * as bookstoreAPI from "../../utilities/bookstore-api";

export default function BookstoreFormPage({
  createBookstore,
  editeBookstore,
  deleteBookstore,
}) {
  const { id } = useParams();
  const { lang, toggleLang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [CurrBookstore, setCurrBookstore] = useState(null);

  const initialState = {
    name: "",
    city: "",
    description: "",
    image: "",
    map_url: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    async function getAndSetDetail() {
      try {
        const bookstore = await bookstoreAPI.show(id);
        setCurrBookstore(bookstore);
        setFormData(bookstore);
      } catch (err) {
        console.log(err);
        setCurrBookstore(null);
        setFormData(initialState);
      }
    }

    if ((editeBookstore || deleteBookstore) && id) getAndSetDetail();
  }, [id, editeBookstore, deleteBookstore]);

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      let result;
      if (editeBookstore && CurrBookstore) {
        result = await bookstoreAPI.update(CurrBookstore.id, formData);
      } else if (createBookstore) {
        result = await bookstoreAPI.create(formData);
      }

      setFormData(initialState);
      navigate(`/bookstores/${result.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(evt) {
    evt.preventDefault();
    try {
      const response = await bookstoreAPI.deleteBookstore(CurrBookstore.id);
      if (response.success) {
        setFormData(initialState);
        navigate("/bookstores");
      }
    } catch (err) {
      console.log(err);
    }
  }

  if ((deleteBookstore || editeBookstore) && !CurrBookstore)
    return <h1>Loading...</h1>;

  if (deleteBookstore && CurrBookstore)
    return (
      <div className="delete-container">
        <div className="form-container">
          <div className="page-header">
            <h1>{translations[lang].deleteBS}</h1>
          </div>
          <h2>
            {translations[lang].areYouSure}{" "}
            <span style={{ color: "var(--primary-dark)" }}>
              {CurrBookstore.name}
            </span>
            {translations[lang].qMark}
          </h2>
          <form onSubmit={handleDelete}>
            <Link to={`/bookstores/${CurrBookstore.id}`} className="btn cancel">
              {translations[lang].btnCancel}
            </Link>
            <button type="submit" className="btn danger">
              {translations[lang].btndeletey}
            </button>
          </form>
        </div>
      </div>
    );

  if (createBookstore || editeBookstore)
    return (
      <>
        <div className="page-header">
          {editeBookstore ? (
            <h1>Edit {CurrBookstore.name}'s Info</h1>
          ) : (
            <h1>{translations[lang].addBookstore}</h1>
          )}
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <table>
            <tbody>
              {!editeBookstore && (
                <tr>
                  <th>
                    <label htmlFor="id_name">
                      {translations[lang].bStoreName}
                    </label>
                  </th>
                  <td>
                    <input
                      value={formData.name}
                      type="text"
                      name="name"
                      maxLength="100"
                      required
                      id="id_name"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              )}
              <tr>
                <th>
                  <label htmlFor="id_city">
                    {translations[lang].bStoreCity}
                  </label>
                </th>
                <td>
                  <input
                    value={formData.city}
                    type="text"
                    name="city"
                    maxLength="100"
                    required
                    id="id_city"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="id_description">
                    {translations[lang].bStoreDesc}
                  </label>
                </th>
                <td>
                  <input
                    value={formData.description}
                    type="text"
                    name="description"
                    maxLength="300"
                    required
                    id="id_description"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="id_image">
                    {translations[lang].bStoreImg}
                  </label>
                </th>
                <td>
                  <input
                    value={formData.image}
                    type="url"
                    name="image"
                    id="id_image"
                    placeholder="https://example.com/image.jpg"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="id_map_url">
                    {translations[lang].bStoreMap}
                  </label>
                </th>
                <td>
                  <input
                    value={formData.map_url}
                    type="url"
                    name="map_url"
                    id="id_map_url"
                    placeholder="https://maps.google.com/..."
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="btn end submit">
            {translations[lang].btnSubmit}
          </button>
        </form>
      </>
    );

  return null;
}
