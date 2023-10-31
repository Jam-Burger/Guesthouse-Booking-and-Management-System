import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
    </Routes>
  </BrowserRouter>
);

export default App;
