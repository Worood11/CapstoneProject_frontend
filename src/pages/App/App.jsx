import { Route, Routes, Navigate } from "react-router";
import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";
import HomePage from "../HomePage/HomePage";
import BookstoreIndexPage from "../BookstoreIndexPage/BookstoreIndexPage";
import BookstoreDetailPage from "../BookstoreDetailPage/BookstoreDetailPage";
import BookstoreFormPage from "../BookstoreFormPage/BookstoreFormPage";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import EventFormPage from "../EventFormPage/EventFormPage";
import EventsListPage from "../EventsListPage/EventsListPage";

//API

import * as usersAPI from "../../utilities/users-api";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      const foundUser = await usersAPI.getUser();
      setUser(foundUser);
    }
    checkUser();
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <main>
        <Routes>
          {user ? (
            <>
              <Route path="/home" element={<HomePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/bookstores" element={<BookstoreIndexPage />} />
              <Route
                path="/bookstores/:id"
                element={<BookstoreDetailPage user={user} />}
              />
              <Route path="/events" element={<EventsListPage user={user} />} />

              {user.role === "admin" ? (
                <>
                  <Route
                    path="/bookstores/new"
                    element={<BookstoreFormPage createBookstore={true} />}
                  />
                  <Route path="/events/new" element={<EventFormPage />} />
                  <Route path="/events/:id/edit" element={<EventFormPage />} />
                  <Route
                    path="/bookstores/edit/:id"
                    element={<BookstoreFormPage editeBookstore={true} />}
                  />
                  <Route
                    path="/bookstores/confirm_delete/:id"
                    element={<BookstoreFormPage deleteBookstore={true} />}
                  />
                </>
              ) : (
                <>
                  <Route
                    path="/bookstores/new"
                    element={<Navigate to="/bookstores" />}
                  />
                  <Route
                    path="/events/new"
                    element={<Navigate to="/events" />}
                  />

                  <Route
                    path="/bookstores/edit/:id"
                    element={<Navigate to="/bookstores" />}
                  />
                  <Route
                    path="/bookstores/confirm_delete/:id"
                    element={<Navigate to="/bookstores" />}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <Route path="/home" element={<HomePage />} />
              <Route path="/" element={<HomePage />} />
              <Route
                path="/login"
                element={<LoginPage user={user} setUser={setUser} />}
              />
              <Route
                path="/signup"
                element={<SignupPage user={user} setUser={setUser} />}
              />
            </>
          )}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
