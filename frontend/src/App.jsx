import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

function App({ authenticated }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar authenticated={authenticated} />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;