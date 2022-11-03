import React from "react";
import style from "./LoginStyle.module.scss";

const LoginPage = () => {
  return (
    <div className={style.formContainer}>
      <div className={style.formWrapper}>
        <form className={style.formWrapper}>
          <span className={style.logo}>Chat app</span>
          <span className={style.title}>Login</span>
          <input type="email" placeholder="Your email" />
          <input type="password" placeholder="Your password" />
          <button>Login</button>
          <p>You don't have an account ? Sign up</p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
