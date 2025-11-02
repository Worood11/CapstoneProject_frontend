import { Route, Routes, Navigate } from "react-router";
import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import HomePage from "../HomePage/HomePage";
import BookstoreIndexPage from "../BookstoreIndexPage/BookstoreIndexPage";
import BookstoreDetailPage from "../BookstoreDetailPage/BookstoreDetailPage";
import BookstoreFormPage from "../BookstoreFormPage/BookstoreFormPage";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <main>
        <Routes>
          {user ? (
            <>
              <Route path="/home" element={<HomePage />} />
              <Route path="/*" element={<HomePage />} />
              <Route path="/bookstores" element={<BookstoreIndexPage />} />
              <Route path="/bookstores/:id" element={<BookstoreDetailPage />} />
              <Route
                path="/bookstores/new"
                element={<BookstoreFormPage createBookstore={true} />}
              />
              <Route
                path="/bookstores/edit/:id"
                element={<BookstoreFormPage editeBookstore={true} />}
              />
              <Route
                path="/bookstores/confirm_delete/:id"
                element={<BookstoreFormPage deleteBookstore={true} />}
              />{" "}
            </>
          ) : (
            <>
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
              <Route
                path="/signup"
                element={<SignupPage user={user} setUser={setUser} />}
              />
              <Route path="/*" element={<Navigate to="/home" />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
