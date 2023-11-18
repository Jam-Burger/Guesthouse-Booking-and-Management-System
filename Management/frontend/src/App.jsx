import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReservationPage from "./pages/ReservationPage";
import LoginPage from "./pages/LoginPage";
import StaffManagementPage from "./pages/StaffManagementPage";
import BookingHistoryPage from "./pages/BookingHistoryPage";
import ProfilePage from "./pages/ProfilePage";
import InventoryPage from "./pages/InventoryPage";
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/reservation" element={<ReservationPage />}></Route>
      <Route path="/home" element={<HomePage />}></Route>
      <Route path="/staff" element={<StaffManagementPage />}></Route>
      <Route path="/booking" element={<BookingHistoryPage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/inventory" element={<InventoryPage />}></Route>
    </Routes>
  </BrowserRouter>
);

export default App;
