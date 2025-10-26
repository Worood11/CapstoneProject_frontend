import "./App.css";
import { Route, Routes, Link } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import HomePage from "../HomePage/HomePage";
import AboutPage from "../AboutPage/AboutPage";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/*" element={<HomePage/>} />
          <Route path="/about" element={<AboutPage/>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
