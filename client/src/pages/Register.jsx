import { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    if (form.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/users",
          {
            name: form.name,
            email: form.email,
            password: form.password,
          }
        );

        alert("Registration Successful!");

        console.log(res.data);

        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        alert(
          error.response?.data?.message ||
            "Registration Failed"
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
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        <p className="error">
          {errors.name}
        </p>

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

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <p className="error">
          {errors.confirmPassword}
        </p>

        <button
          type="submit"
          className="form-btn"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;