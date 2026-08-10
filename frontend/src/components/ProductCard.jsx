import useCartStore from '../store/cartStore';

function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
    });
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">₹{product.price}</p>
      <button
        onClick={handleAddToCart}
        className="mt-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;