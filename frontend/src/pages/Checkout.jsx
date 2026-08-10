import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import useCartStore from "../store/cartStore";

function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
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
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

      <div className="space-y-3 border rounded-lg p-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t pt-3 flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{getTotalPrice().toFixed(2)}</span>
        </div>
      </div>

      {error && (
        <p className="text-red-600 text-sm mb-4">{error}</p>
      )}

      <button
        onClick={handlePlaceOrder}
        disabled={placing}
        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {placing ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}

export default Checkout;