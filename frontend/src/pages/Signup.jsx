import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ role: "student" });

  const handleSubmit = async () => {
    await API.post("/auth/register", form);
    alert("Registered successfully");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Signup</h2>

        <input placeholder="Name" className="w-full mb-2 p-2 border"
          onChange={(e)=>setForm({...form,name:e.target.value})} />

        <input placeholder="Email" className="w-full mb-2 p-2 border"
          onChange={(e)=>setForm({...form,email:e.target.value})} />

        <input type="password" placeholder="Password"
          className="w-full mb-2 p-2 border"
          onChange={(e)=>setForm({...form,password:e.target.value})} />

        <select className="w-full mb-4 p-2 border"
          onChange={(e)=>setForm({...form,role:e.target.value})}>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>

        <button onClick={handleSubmit}
          className="w-full bg-green-600 text-white p-2 rounded">
          Signup
        </button>
         <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}