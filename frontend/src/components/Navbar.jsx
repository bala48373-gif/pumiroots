import { Link } from "react-router-dom";
import keycloak from "../services/keycloak";
import useCartStore from "../store/cartStore";

function Navbar({ authenticated }) {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <nav className="bg-[#7A1526] px-6 py-4 flex items-center justify-between">
      <h1
        className="text-2xl text-white"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Pumiroots
      </h1>

      <div className="flex items-center gap-6">
        <Link to="/cart" className="relative text-[#EADFCB] hover:text-white transition-colors">
          🛒 Cart
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-[#C89B3C] text-[#2A1815] text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>

        {authenticated && (
          <Link
            to="/my-orders"
            className="text-[#EADFCB] hover:text-white transition-colors"
          >
            My Orders
          </Link>
        )}

        {authenticated ? (
          <>
            <span className="text-[#EADFCB] text-sm">
              Hi, {keycloak.tokenParsed?.preferred_username}
            </span>
            <button
              onClick={() => keycloak.logout()}
              className="bg-[#C89B3C] text-[#2A1815] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#B8892E] transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => keycloak.login()}
              className="bg-[#C89B3C] text-[#2A1815] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#B8892E] transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => keycloak.register()}
              className="bg-transparent text-white border border-[#EADFCB] px-4 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
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