import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
function Register() {
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

const navigate = useNavigate();

// inside function
navigate("/login");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      <input name="name" className="form-control mb-2" placeholder="Name" onChange={handleChange} />
      <input name="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" className="form-control mb-2" placeholder="Password" onChange={handleChange} />
      <input name="course" className="form-control mb-2" placeholder="Course" onChange={handleChange} />

      <button className="btn btn-primary" onClick={handleSubmit}>
        Register
      </button>
    </div>
  );
}

export default Register;