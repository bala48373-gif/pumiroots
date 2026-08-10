import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h2 className="text-2xl font-semibold text-green-700 mb-2">
        Order Placed Successfully!
      </h2>
      {order && (
        <p className="text-gray-600 mb-4">
          Order #{order.id} — Total: ₹{order.total_amount}
        </p>
      )}
      <Link to="/" className="text-green-600 underline">
        Continue shopping
      </Link>
    </div>
  );
}

export default OrderSuccess;