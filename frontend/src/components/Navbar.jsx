import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import keycloak from "../services/keycloak";
import useCartStore from "../store/cartStore";

function Navbar({ authenticated }) {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link to="/">
        <h1 className="text-xl font-bold text-orange-700">Pumiroots</h1>
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/cart" className="relative">
          <ShoppingCart size={24} className="text-gray-700" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

        {authenticated ? (
          <>
            <span className="text-gray-700">
              Hi, {keycloak.tokenParsed?.preferred_username}
            </span>
            <button
              onClick={() => keycloak.logout()}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => keycloak.login()}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;