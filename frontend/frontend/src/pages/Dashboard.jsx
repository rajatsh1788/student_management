import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

function Dashboard() {
  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem("student"));

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [course, setCourse] = useState(student?.course || "");

  // 🔐 Update Password
  const updatePassword = async () => {
    try {
      await API.put("/update-password", {
        oldPassword,
        newPassword
      });

      alert("Password updated");
    } catch (err) {
      alert(err.response?.data?.msg || "Error updating password");
    }
  };

  // 📚 Update Course
  const updateCourse = async () => {
    try {
      const res = await API.put("/update-course", { course });

      localStorage.setItem("student", JSON.stringify(res.data));
      alert("Course updated");
    } catch (err) {
      alert(err.response?.data?.msg || "Error updating course");
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student");

    navigate("/login"); // ✅ FIXED
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>

      <p><b>Name:</b> {student?.name}</p>
      <p><b>Email:</b> {student?.email}</p>
      <p><b>Course:</b> {student?.course}</p>

      <hr />

      <h4>Update Password</h4>
      <input
        type="password"
        placeholder="Old Password"
        className="form-control mb-2"
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        className="form-control mb-2"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button className="btn btn-warning" onClick={updatePassword}>
        Update Password
      </button>

      <hr />

      <h4>Update Course</h4>
      <input
        value={course}
        className="form-control mb-2"
        onChange={(e) => setCourse(e.target.value)}
      />
      <button className="btn btn-info" onClick={updateCourse}>
        Update Course
      </button>

      <hr />

      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;