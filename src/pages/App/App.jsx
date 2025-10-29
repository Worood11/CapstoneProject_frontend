import { Route, Routes } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import HomePage from "../HomePage/HomePage";
import AboutPage from "../AboutPage/AboutPage";
import BookstoreIndexPage from "../BookstoreIndexPage/BookstoreIndexPage";
import BookstoreDetailPage from "../BookstoreDetailPage/BookstoreDetailPage";
import BookstoreFormPage from "../BookstoreFormPage/BookstoreFormPage";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/*" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/bookstores" element={<BookstoreIndexPage />} />
          <Route path="/bookstores/:id" element={<BookstoreDetailPage />} />
          <Route path="/bookstores/new" element={<BookstoreFormPage createBookstore={true}  />} />
          <Route path="/bookstores/edit/:id" element={<BookstoreFormPage editeBookstore={true}  />} />
          <Route path="/bookstores/confirm_delete/:id" element={<BookstoreFormPage deleteBookstore={true}  />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
