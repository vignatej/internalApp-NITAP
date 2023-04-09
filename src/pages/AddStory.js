import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStories } from "../store/story-actions";
const AddStory=()=>{
    const storyRef= useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const storySubmitHandler = async (event)=>{
        event.preventDefault();
        const story = storyRef.current.value;
        if (story === ""){
            return;
        }
        console.log(story);
        const resp = await fetch('http://127.0.0.1:8000/addStory',{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
            body:JSON.stringify({"story": story})
        });
        if(!resp.ok){
            const r = await resp.json();
            console.log(r)
            throw new Error('cant add story');
        }
        console.log('sucessfully added');
        dispatch(getStories());
        navigate(-1);

    }
    return <div className="mx-10 ">
        <p className="my-3 text-left text-2xl font-semibold">ADD A STORY</p>
        <form onSubmit={storySubmitHandler}>
            <textarea ref={storyRef} className="my-2 w-full h-96 text-txtCol bg-cardCol border-solid border-2 text-lg border-white rounded focus:border-blue-500 "/>
            <p><button className=" bg-cardCol text-white text-2xl border-solid border-2 border-white rounded px-5 my-1 py-2" value="submit" type="submit" >SUBMIT</button></p>
        </form>
        
    </div>
}
export default AddStory;