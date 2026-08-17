import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";

function Cart() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getTotal = useCartStore((state) => state.getTotal);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FBF6EE] flex items-center justify-center px-6">
        <div className="text-center">
          <h2
            className="text-2xl text-[#2A1815] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your Cart is Empty
          </h2>
          <p className="text-[#8B7355] text-sm mb-6">
            Discover handcrafted pieces rooted in tradition.
          </p>
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

  return (
    <div className="min-h-screen bg-[#FBF6EE] px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2
            className="text-3xl text-[#2A1815] mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your Cart
          </h2>
          <div className="w-10 h-[2px] bg-[#C89B3C] mx-auto" />
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-[#EADFCB] p-5 flex items-center justify-between"
            >
              <div>
                <h3
                  className="text-[#2A1815]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.name}
                </h3>
                <p className="text-[#C89B3C] font-semibold mt-1">
                  ₹{item.price}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 border border-[#EADFCB] rounded-md text-[#7A1526] hover:bg-[#FBF6EE] transition-colors"
                >
                  -
                </button>
                <span className="w-6 text-center text-[#2A1815]">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 border border-[#EADFCB] rounded-md text-[#7A1526] hover:bg-[#FBF6EE] transition-colors"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-[#A83246] hover:text-[#7A1526] ml-3 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white rounded-lg border border-[#EADFCB] p-5 flex justify-between items-center">
          <span className="text-lg text-[#2A1815]">
            Total:{" "}
            <span className="text-[#C89B3C] font-semibold">
              ₹{getTotal().toFixed(2)}
            </span>
          </span>
          <Link
            to="/checkout"
            className="bg-[#7A1526] text-white px-6 py-2.5 rounded-md text-sm tracking-wide hover:bg-[#5E0F1D] transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;