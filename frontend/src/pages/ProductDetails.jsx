import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import useCartStore from "../store/cartStore";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const addToCart = useCartStore((state) => state.addToCart);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        api
            .get(`/products/${id}`)
            .then((res) => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load product");
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FBF6EE] flex items-center justify-center">
                <p className="text-[#8B7355]">Loading product...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-[#FBF6EE] flex flex-col items-center justify-center px-6">
                <p className="text-[#A83246] mb-4">
                    {error || "Product not found"}
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="bg-[#7A1526] text-white px-6 py-2.5 rounded-md"
                >
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FBF6EE]">
            <section className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
                <button
                    onClick={() => navigate(-1)}
                    className="text-[#7A1526] text-sm mb-8 hover:underline"
                >
                    ← Back
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

                    {/* Product Image */}
                    <div className="bg-white rounded-lg border border-[#EADFCB] p-6 min-h-[400px] flex items-center justify-center">
                        <img
                            src={product.image_url || "/diya-set.png"}
                            alt={product.name}
                            className="max-h-[450px] w-full object-contain"
                        />
                    </div>

                    {/* Product Information */}
                    <div>
                        <p className="text-[#C89B3C] text-xs tracking-[0.3em] uppercase mb-3">
                            Pumiroots Collection
                        </p>

                        <h1
                            className="text-3xl sm:text-4xl text-[#2A1815] mb-4"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            {product.name}
                        </h1>

                        <div className="w-12 h-[2px] bg-[#C89B3C] mb-6" />

                        <p className="text-[#8B7355] leading-7 mb-6">
                            {product.description}
                        </p>

                        <div className="text-[#C89B3C] text-3xl font-semibold mb-4">
                            ₹{product.price}
                        </div>

                        <p className="text-sm text-[#8B7355] mb-6">
                            Stock available: {product.stock}
                        </p>

                        {/* Quantity */}
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-sm text-[#2A1815]">
                                Quantity
                            </span>

                            <div className="flex items-center border border-[#EADFCB] rounded-md bg-white">
                                <button
                                    onClick={() =>
                                        setQuantity((q) => Math.max(1, q - 1))
                                    }
                                    className="px-4 py-2 text-[#7A1526]"
                                >
                                    −
                                </button>

                                <span className="px-4 py-2 border-x border-[#EADFCB]">
                                    {quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        setQuantity((q) =>
                                            Math.min(product.stock, q + 1)
                                        )
                                    }
                                    className="px-4 py-2 text-[#7A1526]"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            disabled={!product.stock}
                            className="w-full bg-[#7A1526] text-white py-3 rounded-md hover:bg-[#5E0F1D] transition-colors disabled:bg-gray-400"
                        >
                            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductDetails;