import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getStory } from "../store/story-actions";
const AddQuestion = (props) => {
  const quesRef = useRef();
  // useEffect(()=>{
  //   const storedPosition = sessionStorage.getItem('scrollPosition');
  //   if(storedPosition){
  //     window.scrollTo(0, storedPosition);
  //     sessionStorage.removeItem('scrollPosition');
  //   }
  // },[])
  const par = useParams();
  const id=par.id;
  console.log("id is: "+id);
  const dispatch = useDispatch();
  const handleKeyDown = async (event) => {
    if (event.key !== "Enter") {
      return;
    }
    const question = quesRef.current.value;
    if (question === "") {
      return;
    }
    quesRef.current.value = "";
    const details = new FormData();
    details.append("id", props.id);
    details.append("question", question);
    const response = await fetch("http://127.0.0.1:8000/addQuestion", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: details,
    });
    if (!response.ok) {
      console.log("cant add ques");
      return;
    }
    const resp = await response.json();
    if (resp === "ok addd a new ques") {
      console.log("question added sucessfullt");
    };
    dispatch(getStory(id));
    // sessionStorage.setItem('scrollPosition',window.pageYOffset+100);
    // window.location.reload();
    
  };
  const blurHandler = ()=>{
    quesRef.current.value = "";
  }
  return (
    <div>
      <p className="text-2xl font-black mb-3">Add a question</p>
      <input
        type="text"
        onKeyDown={handleKeyDown}
        onBlur={blurHandler}
        className="text-lg w-full h-10 bg-cardCol rounded mb-16"
        placeholder="  Enter Your Question"
        ref={quesRef}
      ></input>
    </div>
  );
};
export default AddQuestion;
