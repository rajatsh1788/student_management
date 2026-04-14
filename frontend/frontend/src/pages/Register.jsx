import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    course: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post("/register", form);
      alert(res.data.msg || "Registered Successfully");

      navigate("/login"); // ✅ FIXED
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

return (
  <div className="container mt-5">
    <h2 className="text-center">🌙 Register</h2>

    <input name="name" placeholder="Name" className="form-control" onChange={handleChange} />
    <input name="email" placeholder="Email" className="form-control" onChange={handleChange} />
    <input name="password" type="password" placeholder="Password" className="form-control" onChange={handleChange} />
    <input name="course" placeholder="Course" className="form-control" onChange={handleChange} />

    <button className="btn btn-primary w-100" onClick={handleSubmit}>
      Register
    </button>
  </div>
);
}

export default Register;