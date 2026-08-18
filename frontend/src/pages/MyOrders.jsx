import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/orders/")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load orders");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-[#FBF6EE] flex items-center justify-center">
        <p className="text-[#8B7355]">Loading orders...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#FBF6EE] flex items-center justify-center">
        <p className="text-[#A83246]">{error}</p>
      </div>
    );

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#FBF6EE] flex items-center justify-center px-6">
        <div className="text-center">
          <h2
            className="text-2xl text-[#2A1815] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            No orders yet
          </h2>
          <Link
            to="/"
            className="inline-block bg-[#7A1526] text-white px-6 py-2.5 rounded-md text-sm tracking-wide hover:bg-[#5E0F1D] transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF6EE] px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2
            className="text-3xl text-[#2A1815] mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            My Orders
          </h2>
          <div className="w-10 h-[2px] bg-[#C89B3C] mx-auto" />
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-[#EADFCB] rounded-lg p-5"
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className="text-[#2A1815]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Order #{order.id}
                </span>
                <span className="text-xs px-3 py-1 bg-[#FBF6EE] text-[#7A1526] rounded-full capitalize border border-[#EADFCB]">
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-[#8B7355] mb-3">
                {new Date(order.created_at).toLocaleString()}
              </p>
              <div className="space-y-1 mb-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-[#2A1815]"
                  >
                    <span>
                      {item.product_name} x {item.quantity}
                    </span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#EADFCB] pt-3 flex justify-between items-center">
                <span className="text-[#2A1815] font-medium">Total</span>
                <span className="text-[#C89B3C] font-semibold">
                  ₹{order.total_amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;