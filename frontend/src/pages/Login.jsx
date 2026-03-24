import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await API.post("/auth/login", form);
    login(res.data);
    alert("Logged in successfully");

    if (res.data.user.role === "student") navigate("/student");
    else navigate("/instructor");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          placeholder="Email"
          className="w-full mb-2 p-2 border"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select className="w-full mb-4 p-2 border"
          onChange={(e)=>setForm({...form,role:e.target.value})}>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <p className="text-sm mt-4 text-center">
  Don't have an account?{" "}
  <Link to="/signup" className="text-blue-600 font-semibold">
    Signup
  </Link>
</p>
      </div>
    </div>
  );
}