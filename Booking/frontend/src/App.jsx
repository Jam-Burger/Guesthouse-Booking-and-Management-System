import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import ProfilePage from "./pages/ProfilePage";
import HotelsListPage from "./pages/HotelsListPage";
import RoomsListPage from "./pages/RoomsListPage";
import DummyPayPage from "./pages/DummyPayPage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import PageNotFound from "./pages/PageNotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/bookings/:id" element={<BookingPage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/hotels" element={<HotelsListPage />}></Route>
      <Route path="/hotels/:id" element={<RoomsListPage />}></Route>
      <Route path="/pay" element={<DummyPayPage />}></Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
  </BrowserRouter>
);

export default App;
