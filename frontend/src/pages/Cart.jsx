import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";

function Cart() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getTotal = useCartStore((state) => state.getTotal);

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Your Cart is Empty
        </h2>
        <Link
          to="/"
          className="inline-block bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Cart</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-orange-700 font-bold">₹{item.price}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 ml-3"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-4 flex justify-between items-center">
        <span className="text-lg font-semibold">
          Total: ₹{getTotal().toFixed(2)}
        </span>
        <Link
          to="/checkout"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;