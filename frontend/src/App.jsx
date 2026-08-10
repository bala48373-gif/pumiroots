import Navbar from "./components/Navbar";

function App({ authenticated }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar authenticated={authenticated} />

      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome to Pumiroots
        </h2>
        <p className="text-gray-600 mt-2">
          {authenticated
            ? "You are logged in!"
            : "Please login to continue shopping."}
        </p>
      </div>
    </div>
  );
}

export default App;