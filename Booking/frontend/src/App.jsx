import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import ProfilePage from "./pages/ProfilePage";
import HotelListPage from "./pages/HotelListPage";
import StartPage from "./pages/StartPage";
import DummyPayPage from "./pages/DummyPayPage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import PageNotFound from "./pages/PageNotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/booking" element={<BookingPage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/hotels" element={<HotelListPage />}></Route>
      <Route path="/home" element={<StartPage />}></Route>
      <Route path="/pay" element={<DummyPayPage />}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
  </BrowserRouter>
);

export default App;
