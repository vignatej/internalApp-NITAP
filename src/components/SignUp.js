import { useDispatch } from "react-redux";
import TextInput from "../components/TextInput";
import { useRef, useState } from "react";
import { userSignUp } from "../store/auth-actions";
const SignUp = (props) => {
  const username_input_ref = useRef();
  const email_input_ref = useRef();
  const password_ref = useRef();
  const branch_ref = useRef();
  const startYear_ref = useRef();
  const tagline_ref = useRef();
  const [image, setImage] = useState();

  const dispatch = useDispatch();
  const [submitting,setSubmitting] = useState(false);
  const fileInputhandler = (event) => {
    setImage(event.target.files[0]);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const details = new FormData();
    const username=username_input_ref.current.value;
    const password=password_ref.current.value;
    details.append("username", username);
    details.append("email", email_input_ref.current.value);
    details.append("password", password);
    details.append("branch", branch_ref.current.value);
    details.append("startYear", startYear_ref.current.value);
    details.append("tagline", tagline_ref.current.value);
    details.append("image", image);
    
    dispatch(
      userSignUp(
        details,
        username,
        password
      )
    );
    setSubmitting(false);
  };

  return (
    <div className="px-8 text-lg mx-32">
      <p className="text-3xl pb-7 pt-5 font-bold">SignUp Form</p>
      <form onSubmit={formSubmitHandler}>
        <TextInput name="username" type="text" ref={username_input_ref} />
        <TextInput name="email" type="email" ref={email_input_ref} />
        <TextInput name="password" type="passoword" ref={password_ref} />
        <TextInput name="branch" type="text" ref={branch_ref} />
        <TextInput name="startYear" type="number" ref={startYear_ref} />
        <TextInput name="tagline" type="text" ref={tagline_ref} />
        <p>profile picture</p>
        <input onChange={fileInputhandler} type="file" required />
        <p className="pb-7"></p>
        <button name="submit" value="submit" className="px-6 my-5 py-2 font-bold text-xl rounded-md bg-slate-600" >
          {submitting ? "wait submitting":"submit"}
        </button>
      </form>
      <button className="" onClick={props.change}>already have an account! LOGIN</button>
    </div>
  );
};
export default SignUp;
