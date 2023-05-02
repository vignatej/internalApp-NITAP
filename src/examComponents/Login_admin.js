import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../fixed";
const Login_admin = ()=>{
    const nav = useNavigate();
    const name_ref = useRef();
    const password_ref = useRef();
    const roll_ref = useRef();
    const btnSubmitHandler = (event) => {
      event.preventDefault();
      const form = new FormData();
      if(name_ref.current.value=="" || password_ref.current.value=="" || roll_ref.current.value==""){
        throw new Error("enter all")
      }
      form.append("name", name_ref.current.value);
      form.append("password",password_ref.current.value);
      form.append("roll", roll_ref.current.value);
      const signup = async()=>{
          const res = await fetch(`${baseUrl}/exam/createAdmin`,{
              method: "POST",
              body: form,
          });
          if(!res.ok){
            throw new Error("Failed to create");
          }
          const resp = await res.json();
          if(resp == "cant create admin"){
            alert("failed");
            throw new Error("Failed to create");  
          }
          console.log(resp);
          console.log(resp["name"]);
          localStorage.setItem("name", resp["name"]);
          localStorage.setItem("password", resp["password"]);
          localStorage.setItem("roll", resp["roll"]);
          localStorage.setItem("admin_id", resp["id"]);
          alert("sucessful");
          nav(-1);
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
};export default Login_admin;