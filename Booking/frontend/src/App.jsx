import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import HotelsListPage from "./pages/HotelsListPage";
import RoomsListPage from "./pages/RoomsListPage";
import DummyPayPage from "./pages/DummyPayPage";
import LoginPage2 from "./pages/LoginPage2";
import SignUp from "./pages/SignUpPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/bookings/:id" element={<BookingPage />}></Route>
      <Route path="/register" element={<RegistrationPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/hotels" element={<HotelsListPage />}></Route>
      <Route path="/hotels/:id" element={<RoomsListPage />}></Route>
      <Route path="/pay" element={<DummyPayPage />}></Route>
      <Route path="/login2" element={<LoginPage2 />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
    </Routes>
  </BrowserRouter>
);

export default App;
