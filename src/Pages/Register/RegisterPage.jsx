import React, { useRef, useState, useContext } from "react";
import { signup } from "../../services/auth-api";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../services/firebase";
import Add from "../../assets/images/addAvatar.png";
import style from "./RegisterStyle.module.scss";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    setLoading(true);
    try {
      const res = await signup(inputData);
      if (photo) {
        try {
          const photoName = Date.now() + photo.name;
          const storageRef = ref(storage, `/chat/personalImages/${photoName}`);
          const uploadedPhoto = await uploadBytesResumable(storageRef, photo);
          const photoUrl = await getDownloadURL(uploadedPhoto.ref);
          inputData.photoUrl = photoUrl;
        } catch (e) {
          setError(e);
          setLoading(false);
          console.log(e);
        }
      }

      // create user
      await setDoc(doc(db, "users", res.localId), {
        name: inputData.name,
        email: inputData.email,
        photoURL: inputData.photoUrl,
        uid: res.localId,
      });

      //create user chats
      await setDoc(doc(db, "userChats", res.localId), {});
      auth.handleLogin(res);
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
          <span className={style.title}>Register</span>
          <input ref={nameRef} type="text" placeholder="Your name" />
          <input ref={emailRef} type="email" placeholder="Your email" />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Your password"
          />
          <input
            onChange={(event) => setPhoto(event.target.files[0])}
            style={{ display: "none" }}
            type="file"
            id="avatar"
          />
          <label htmlFor="avatar">
            <img src={Add} alt="avatar" />
            <span>Add your avatar</span>
          </label>
          <button>{loading ? "Loading..." : "Sign up"}</button>
          <p>
            Do you have an account ? <Link to="/login">Login</Link>
          </p>
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
