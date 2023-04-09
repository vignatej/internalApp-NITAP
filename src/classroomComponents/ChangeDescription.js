import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
const ChangeDescription = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const [description, SetDescription] = useState("");
  const modules = {
    toolbar: [
      [{ size: [] }],
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold"],
      ["italic"],
      ["underline"],
      ["strike"],
      ["blockquote"],
      ["code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  function handleChange(value) {
    SetDescription(value);
  }
  function SubmitHandler() {
    const sub = async () => {
      const res = await fetch(
        "http://127.0.0.1:8000/classroom/changeDescription",
        {
          method: "POST",
          body: JSON.stringify({ classId: id, description: description }),
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
        }
      );if(!res.ok){throw new Error("not changed desc");}
      const resp=await res.json();
      if(resp=="success"){
        console.log("success");
        navigate(-1);
      }
    };sub();
  }
  useEffect(() => {
    const fetchDetails = async () => {
      const resp = await fetch(`http://127.0.0.1:8000/classroom/getAClass`, {
        method: "POST",
        body: JSON.stringify({ classID: id }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        throw new Error("err happened");
      }
      const res = await resp.json();
      SetDescription(res.description);
      console.log(res.description);
      console.log("setted");
    };
    fetchDetails();
  }, [id]);
  return (
    <>
      <div className="mx-5 sm:mx-15">
        <div className="my-10 px-2 max-w-2xl mx-auto py-5 border-8 border-thirdCol">
          <p className="text-xl mb-10"> Enter description of the POST</p>
          <div className="m-10">
            <ReactQuill
              theme="snow"
              value={description}
              onChange={handleChange}
              modules={modules}
            />
          </div>
          <div className="text-center pt-10">
            <button onClick={SubmitHandler} className="bg-thirdCol rounded-lg px-3 py-2 text-center">
              Change Description
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChangeDescription;
