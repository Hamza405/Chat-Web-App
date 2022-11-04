import React from "react";
import Attach from "../../assets/images/attach.png";
import Img from "../../assets/images/img.png";
import style from "./InputStyle.module.scss";

const Input = () => {
  return (
    <div className={style.input}>
      <input type="text" placeholder="type Something..." />
      <div className={style.send}>
        <img src={Attach} alt="attach" />
        <input style={{ display: "none" }} type="file" id="avatar" />
        <label htmlFor="avatar">
          <img src={Img} alt="img" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
