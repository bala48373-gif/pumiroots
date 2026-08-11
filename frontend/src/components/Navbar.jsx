import keycloak from "../services/keycloak";

function Navbar({ authenticated }) {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-orange-700">Pumiroots</h1>

      <div className="flex items-center gap-4">
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