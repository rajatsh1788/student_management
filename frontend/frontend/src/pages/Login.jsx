import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("student", JSON.stringify(res.data.student));

      alert("Login Successful");

      navigate("/dashboard"); // ✅ FIXED
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <input name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" className="form-control mb-2" onChange={handleChange} />

      <button className="btn btn-success" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;