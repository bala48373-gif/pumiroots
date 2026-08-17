import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="min-h-screen bg-[#FBF6EE] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-[#7A1526] text-[#C89B3C] flex items-center justify-center mx-auto mb-6 text-2xl">
          ✓
        </div>

        <h2
          className="text-3xl text-[#2A1815] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Order Placed Successfully
        </h2>
        <div className="w-10 h-[2px] bg-[#C89B3C] mx-auto my-4" />

        {order && (
          <p className="text-[#8B7355] text-sm mb-6">
            Order #{order.id} — Total{" "}
            <span className="text-[#C89B3C] font-semibold">
              ₹{order.total_amount}
            </span>
          </p>
        )}

        <Link
          to="/"
          className="inline-block bg-[#7A1526] text-white px-6 py-2.5 rounded-md text-sm tracking-wide hover:bg-[#5E0F1D] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;