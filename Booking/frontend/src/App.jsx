import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import BookingPage from "./pages/BookingPage";
import RegisterationPage from "./pages/RegisterationPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/search" element={<SearchResultsPage />}></Route>
      <Route path="/booking" element={<BookingPage />}></Route>
      <Route path="/register" element={<RegisterationPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
    </Routes>
  </BrowserRouter>
);

export default App;
