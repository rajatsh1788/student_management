import { useState } from "react";
import API from "../utils/api";

function Dashboard() {
  const token = localStorage.getItem("token");
  const student = JSON.parse(localStorage.getItem("student"));

  const [course, setCourse] = useState("");
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const config = {
    headers: { Authorization: token }
  };

  const updatePassword = async () => {
    try {
      await API.put("/update-password", password, config);
      alert("Password Updated");
    } catch (err) {
      alert(err.response?.data?.msg);
    }
  };

  const updateCourse = async () => {
    try {
      const res = await API.put("/update-course", { course }, config);
      localStorage.setItem("student", JSON.stringify(res.data));
      alert("Course Updated");
    } catch {
      alert("Error");
    }
  };

  const logout = () => {
    localStorage.clear();
    const navigate = useNavigate();
navigate("/login");
  };

  if (!token) { const navigate = useNavigate();
navigate("/login");}

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="text-center">Dashboard</h2>

        <div className="mt-3">
          <p><b>Name:</b> {student?.name}</p>
          <p><b>Email:</b> {student?.email}</p>
          <p><b>Course:</b> {student?.course}</p>
        </div>

        <hr />

        <h4>Update Password</h4>
        <input className="form-control mb-2" placeholder="Old Password"
          onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })} />
        <input className="form-control mb-2" placeholder="New Password"
          onChange={(e) => setPassword({ ...password, newPassword: e.target.value })} />
        <button className="btn btn-warning mb-3" onClick={updatePassword}>
          Update Password
        </button>

        <h4>Change Course</h4>
        <input className="form-control mb-2" placeholder="New Course"
          onChange={(e) => setCourse(e.target.value)} />
        <button className="btn btn-info mb-3" onClick={updateCourse}>
          Update Course
        </button>

        <button className="btn btn-danger w-100" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;