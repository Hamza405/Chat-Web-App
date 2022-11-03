import React from "react";
import Add from "../../assets/images/addAvatar.png";
import style from "./RegisterStyle.module.scss";

const RegisterPage = () => {
  return (
    <div className={style.formContainer}>
      <div className={style.formWrapper}>
        <form className={style.formWrapper}>
          <span className={style.logo}>Chat app</span>
          <span className={style.title}>Register</span>
          <input type="text" placeholder="Your name" />
          <input type="email" placeholder="Your email" />
          <input type="password" placeholder="Your password" />
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
