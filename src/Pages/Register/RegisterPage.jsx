import React, { useRef, useState } from "react";
import { signup } from "../../services/auth-api";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../services/firebase";
import Add from "../../assets/images/addAvatar.png";
import style from "./RegisterStyle.module.scss";

const RegisterPage = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

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
          console.log(e);
        }
      }

      await setDoc(doc(db, "users", res.localId), {
        name: inputData.name,
        email: inputData.email,
        photoURL: inputData.photoUrl,
      });
    } catch (e) {
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
          <button>Sign up</button>
          <p>Do you have an account ? login</p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
