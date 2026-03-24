import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm px-6 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-blue-600 cursor-pointer"
      >
        LMS
      </h1>

      {/* Links */}
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-blue-600 transition">
          Home
        </Link>

        {!user ? (
          <>
            <Link to="/login" className="hover:text-blue-600">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="text-gray-700 font-medium">
              👋 {user.name}
            </span>

            <button
              onClick={() =>
                navigate(user.role === "student" ? "/student" : "/instructor")
              }
              className="bg-indigo-600 text-white px-4 py-1 rounded-lg"
            >
              Dashboard
            </button>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded-lg"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}