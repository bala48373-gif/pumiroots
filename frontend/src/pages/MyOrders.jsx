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

  if (loading) return <p className="p-6">Loading orders...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">No orders yet</h2>
        <Link to="/" className="text-green-600 underline">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Order #{order.id}</span>
              <span className="text-sm px-2 py-1 bg-gray-100 rounded capitalize">
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              {new Date(order.created_at).toLocaleString()}
            </p>
            <div className="space-y-1 mb-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-700">
                  <span>Product #{item.product_id} x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{order.total_amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;