import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RoomsPage from "./pages/RoomsPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/booking" element={<BookingPage />}></Route>
      <Route path="/register" element={<RegistrationPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/hotels/:id" element={<RoomsPage />}></Route>
    </Routes>
  </BrowserRouter>
);

export default App;
