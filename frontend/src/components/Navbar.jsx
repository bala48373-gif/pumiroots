import { Link } from "react-router-dom";
import keycloak from "../services/keycloak";
import useCartStore from "../store/cartStore";

function Navbar({ authenticated }) {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-orange-700">Pumiroots</h1>

      <div className="flex items-center gap-4">
        <Link to="/cart" className="relative text-gray-700">
          🛒 Cart
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>

        {authenticated && (
          <Link to="/my-orders" className="text-gray-700 hover:text-orange-700">
            My Orders
          </Link>
        )}

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
          <>
            <button
              onClick={() => keycloak.login()}
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              Login
            </button>
            <button
              onClick={() => keycloak.register()}
              className="bg-white text-orange-600 border border-orange-600 px-4 py-2 rounded hover:bg-orange-50"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;