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

  return (
    <div className="min-h-screen bg-[#FBF6EE]">
      {/* Hero */}
      <section className="bg-[#7A1526] px-6 py-16 sm:py-24 text-center">
        <p className="text-[#C89B3C] text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">
          Rooted in Tradition
        </p>
        <h1
          className="text-white text-4xl sm:text-6xl mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Pumiroots
        </h1>
        <div className="w-16 h-[2px] bg-[#C89B3C] mx-auto mb-4" />
        <p className="text-[#EADFCB] max-w-xl mx-auto text-sm sm:text-base">
          Handcrafted puja essentials, sacred gifts, and everyday pieces that
          carry the soul of Indian tradition.
        </p>
      </section>

      {/* Products */}
      <section className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2
            className="text-2xl sm:text-3xl text-[#2A1815] mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Collection
          </h2>
          <div className="w-10 h-[2px] bg-[#C89B3C] mx-auto" />
        </div>

        {loading && (
          <p className="text-center text-[#8B7355]">Loading products...</p>
        )}

        {error && (
          <p className="text-center text-red-700">{error}</p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-center text-[#8B7355]">No products found.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg border border-[#EADFCB] p-5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <h3
                  className="text-lg text-[#2A1815] mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {product.name}
                </h3>
                <p className="text-[#8B7355] text-sm mb-3 min-h-[2.5rem]">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#C89B3C] text-xl font-semibold">
                    ₹{product.price}
                  </span>
                  <span className="text-xs text-[#8B7355]">
                    Stock: {product.stock}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-[#7A1526] text-white py-2.5 rounded-md text-sm tracking-wide hover:bg-[#5E0F1D] transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Products;