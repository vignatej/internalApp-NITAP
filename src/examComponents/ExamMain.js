import { Route, Routes } from "react-router-dom";
import { useRef } from "react";
import { baseUrl } from "../fixed";
const ExamMain = () => {
  const name_ref = useRef();
  const password_ref = useRef();
  const roll_ref = useRef();
  const btnSubmitHandler = (event) => {
    event.preventDefault();
    const form = new FormData();
    console.log(name_ref.current.value);
    form.append("name", name_ref.current.value);
    form.append("password",password_ref.current.value);
    form.append("roll", roll_ref.current.value);
    const signup = async()=>{
        const res = await fetch(`${baseUrl}/exam/createUser`,{
            method: "POST",
            body: form,
        });
        const resp = await res.json();
        console.log(resp);
    };
    signup();
  };




  return (
    <>
      <p>register as user</p>
      <p>name: </p>
      <input type="text" ref={name_ref} />
      <p>password</p>
      <input type="password" ref={password_ref} />
      <p>roll no: </p>
      <input className={{ border: "1px solid red" }} ref ={roll_ref} />
      <button onClick={btnSubmitHandler}> submit </button>
      
    </>
  );
};
export default ExamMain;
