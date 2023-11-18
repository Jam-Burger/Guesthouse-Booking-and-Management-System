import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import RegisterationPage from "./pages/RegisterationPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import HotelListPage from "./pages/HotelListPage";
import StartPage from "./pages/StartPage";
import DummyPayPage from "./pages/DummyPayPage";
import LoginPage2 from "./pages/LoginPage2";
import SignUp from "./pages/SignUpPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/booking" element={<BookingPage />}></Route>
      <Route path="/register" element={<RegisterationPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/hotels" element={<HotelListPage />}></Route>
      <Route path="/start" element={<StartPage />}></Route>
      <Route path="/pay" element={<DummyPayPage />}></Route>
      <Route path="/login2" element={<LoginPage2 />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
    </Routes>
  </BrowserRouter>
);

export default App;
