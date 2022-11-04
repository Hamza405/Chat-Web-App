import React, { useRef } from "react";
import { signup } from "../../services/auth-api";
import Add from "../../assets/images/addAvatar.png";
import style from "./RegisterStyle.module.scss";

const RegisterPage = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputData = {
      email: emailRef.current.value,
      passwordRef: passwordRef.current.value,
    };
  };
  return (
    <div className={style.formContainer}>
      <div className={style.formWrapper}>
        <form onSubmit={handleSubmit} className={style.formWrapper}>
          <span className={style.logo}>Chat app</span>
          <span className={style.title}>Register</span>
          <input ref={nameRef} type="text" placeholder="Your name" />
          <input ref={emailRef} type="email" placeholder="Your email" />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Your password"
          />
          <input style={{ display: "none" }} type="file" id="avatar" />
          <label htmlFor="avatar">
            <img src={Add} alt="avatar" />
            <span>Add your avatar</span>
          </label>
          <button>Sign up</button>
          <p>Do you have an account ? login</p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
