import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Hotel, HotelList } from "./pages";
import { Header, Navbar } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/hotels/:id" element={<Hotel />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
