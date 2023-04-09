import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getStory } from "../store/story-actions";

const AddAnswer = (props) => {
  const dispatch = useDispatch();
  const par = useParams();
  const id = par.id;

  const ansRef = useRef();
  // useEffect(() => {
  //   const storedPosition = sessionStorage.getItem("scrollPosition");
  //   if (storedPosition) {
  //     window.scrollTo(0, storedPosition);
  //     sessionStorage.removeItem("scrollPosition");
  //   }
  // }, []);
  const handleKeyDown = async (event) => {
    if (event.key !== "Enter") {
      return;
    }
    const answer = ansRef.current.value;
    if (answer === "") {
      return;
    }
    ansRef.current.value = "";
    const details = new FormData();
    details.append("id", props.id);
    details.append("answer", answer);
    const response = await fetch("http://127.0.0.1:8000/addAnswer", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: details,
    });
    if (!response.ok) {
      console.log("cant add answer");
      return;
    }
    const resp = await response.json();
    if (resp === "ok addd a new ques") {
      console.log("Answer added sucessfully");
    }
    // sessionStorage.setItem("scrollPosition", window.pageYOffset + 100);
    // window.location.reload();
    dispatch(getStory(id));
  };
  const blurHandler = () => {
    ansRef.current.value = "";
  };
  return (
    <div className="mx-10">
      <p className="text-xl font-normal mb-3 mt-6">Add an answer</p>
      <input
        type="text"
        onKeyDown={handleKeyDown}
        className="w-full bg-background rounded-sm h-10"
        placeholder="  Enter your answer"
        ref={ansRef}
        onBlur={blurHandler}
      />
    </div>
  );
};
export default AddAnswer;
