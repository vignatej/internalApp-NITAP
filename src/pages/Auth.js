import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
const Auth = () => {
  const [curr, setCurr] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  const navigate = useNavigate();
  // const goBack = () => {
  //   navigate(-1);
  // };
  if (isAuthenticated){
    navigate(-1);
  };

  const change = () => {
    setCurr((prev) => !prev);
  };
  return (
    <div className="text-white border-solid border-2 border-sky-500">
      {curr ? <SignUp change={change} /> : <Login change={change} />}
      {/* <p onClick={goBack}>go back</p> */}
    </div>
  );
};
export default Auth;
