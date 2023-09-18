import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import BookingPage from "./pages/BookingPage";
import Navbar from "./components/Navbar";

const App = () => (
  <>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/search" element={<SearchResultsPage />}></Route>
        <Route path="/booking" element={<BookingPage />}></Route>
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
