import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import useCartStore from "../store/cartStore";

function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);

  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState(null);

  const handlePlaceOrder = async () => {
    setPlacing(true);
    setError(null);

    try {
      const payload = {
        items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      const res = await api.post("/orders/", payload);

      clearCart();
      navigate("/order-success", { state: { order: res.data } });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || "Failed to place order. Please try again."
      );
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FBF6EE] flex items-center justify-center px-6">
        <h2
          className="text-2xl text-[#2A1815]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Your cart is empty
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF6EE] px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2
            className="text-3xl text-[#2A1815] mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Checkout
          </h2>
          <div className="w-10 h-[2px] bg-[#C89B3C] mx-auto" />
        </div>

        <div className="space-y-3 bg-white border border-[#EADFCB] rounded-lg p-5 mb-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-sm text-[#2A1815]"
            >
              <span>
                {item.name} x {item.quantity}
              </span>
              <span className="text-[#C89B3C] font-medium">
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="border-t border-[#EADFCB] pt-3 flex justify-between items-center">
            <span className="text-[#2A1815] font-medium">Total</span>
            <span className="text-[#C89B3C] text-lg font-semibold">
              ₹{getTotalPrice().toFixed(2)}
            </span>
          </div>
        </div>

        {error && (
          <p className="text-[#A83246] text-sm mb-4 text-center">{error}</p>
        )}

        <button
          onClick={handlePlaceOrder}
          disabled={placing}
          className="w-full bg-[#7A1526] text-white py-3 rounded-md text-sm tracking-wide hover:bg-[#5E0F1D] transition-colors disabled:opacity-50"
        >
          {placing ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}

export default Checkout;