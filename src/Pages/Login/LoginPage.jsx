import React, { useContext, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/auth-api";
import AuthContext from "../../store/AuthContext";
import style from "./LoginStyle.module.scss";

const LoginPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    setLoading(true);
    try {
      const res = await login(inputData);
      await auth.handleLogin(res);
      navigate("/");
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <div className={style.formContainer}>
      <div className={style.formWrapper}>
        <form onSubmit={handleSubmit} className={style.formWrapper}>
          <span className={style.logo}>Chat app</span>
          <span className={style.title}>Login</span>
          <input ref={emailRef} type="email" placeholder="Your email" />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Your password"
          />
          <button>{loading ? "Loading..." : "Login"}</button>
          <p onClick={() => navigate("/register")}>
            You don't have an account ? <Link to="/register">Register</Link>
          </p>
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
