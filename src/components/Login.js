import { useDispatch } from "react-redux";
import TextInput from "../components/TextInput";
import { useRef } from "react";
import { userLogin } from "../store/auth-actions";
const Login = (props) => {
  const username_input_ref = useRef();
  const password_ref = useRef();
  const dispatch=useDispatch();
  const formSubmitHandler = (event) => {
    event.preventDefault();
    event.preventDefault();
    const details = {
      username: username_input_ref.current.value,
      password: password_ref.current.value,
    };
    dispatch(userLogin(username_input_ref.current.value, password_ref.current.value));
    console.log(details);
  };
  return (
    <div className="px-8 text-lg mx-32">
        <p className="text-3xl pb-7 pt-5 font-bold">Login Form</p>
      <form onSubmit={formSubmitHandler}>
        <TextInput name="username" ref={username_input_ref} type="text"/>
        <TextInput name="password" ref={password_ref} type="password"/>
        <button name="submit" className="px-6 my-5 py-2 font-bold text-xl rounded-md bg-slate-600">submit</button>
      </form>
      <button onClick={props.change}>Dont have an account, SignUp</button>
    </div>
  );
};
export default Login;