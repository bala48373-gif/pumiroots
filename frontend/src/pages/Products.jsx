import { useEffect, useState } from "react";
import api from "../services/api";
import useCartStore from "../store/cartStore";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    api
      .get("/products/")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading products...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Our Products
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow p-4 border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                {product.description}
              </p>
              <p className="text-orange-700 font-bold mt-2">
                ₹{product.price}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Stock: {product.stock}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;