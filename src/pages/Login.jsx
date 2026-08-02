import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials, useLoginMutation } from "../features/auth/authSlice";
import "./Login.css";

export default function Login() {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(form).unwrap();
      dispatch(setCredentials({ token: res.token, user: res.user }));
    } catch (err) {
      setError(err?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login">
      <div className="login__card">
        <div className="login__logo">
          <div className="login__logo-mark">JJC</div>
          <div>
            <h1 className="login__title">JJC Systems</h1>
            <p className="login__subtitle">Admin Panel</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login__form">
          <div className="login__field">
            <label>Email address</label>
            <input
              type="email"
              className="login__input"
              placeholder="admin@jjcsystems.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="login__field">
            <label>Password</label>
            <input
              type="password"
              className="login__input"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {error && <div className="login__error">{error}</div>}

          <button type="submit" className="login__btn" disabled={isLoading}>
            {isLoading ? <span className="login__spinner" /> : null}
            {isLoading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="login__hint">
          Default: <code>admin@jjcsystems.com</code> / <code>Admin@JJC2024</code>
        </p>
      </div>
    </div>
  );
}
