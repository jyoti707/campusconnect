import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!form.password.trim()) {
      newErrors.password =
        "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/users/login",
          form
        );

        alert("Login Successful");

        // Token save
        localStorage.setItem(
          "token",
          res.data.token
        );

        // User save (optional)
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        // Dashboard par bhejo
        navigate("/dashboard");
      } catch (error) {
        alert(
          error.response?.data?.message ||
            "Login Failed"
        );
      }
    }
  };

  return (
    <div className="form-container">
      <form
        className="form-box"
        onSubmit={handleSubmit}
      >
        <h2>Student Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />
        <p className="error">
          {errors.email}
        </p>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <p className="error">
          {errors.password}
        </p>

        <button
          type="submit"
          className="form-btn"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;