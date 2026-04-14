import { useState } from "react";
import API from "../utils/api";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("student", JSON.stringify(res.data.student));

      alert("Login Successful");
      const navigate = useNavigate();
navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <input name="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" className="form-control mb-2" placeholder="Password" onChange={handleChange} />

      <button className="btn btn-success" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;