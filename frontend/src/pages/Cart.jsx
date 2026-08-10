import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';

function Cart() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-green-600 underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center border rounded-lg p-4 gap-4">
            {item.image && (
  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
)}

            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 border rounded"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 border rounded"
              >
                +
              </button>
            </div>

            <p className="w-20 text-right font-semibold">
              ₹{(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <span className="text-xl font-semibold">
          Total: ₹{getTotalPrice().toFixed(2)}
        </span>
        <Link
          to="/checkout"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;