import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../fixed";
import ReactQuill from "react-quill";
const AddPost = () => {
  const classId = useParams().id;
  const navigate = useNavigate()
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
  const [description, setDescription] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  }
  const sendPostHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    const desc = description;
    if(desc===""){
      return;
    }
    formData.append("description", desc);
    formData.append("classId", classId);
    console.log(formData);
    selectedFiles.forEach((file) => formData.append(`${Math.random()}`, file));
    const sendPost = async () => {
      const res = await fetch(`${baseUrl}/classroom/addPost`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      if (!res.ok) {
        throw new Error("cant send a post");
      }
      const resp = await res.json();
      console.log(resp);
      navigate(-1);
    };
    sendPost();
  };
  return (
    <>
      <div className="mx-5 sm:mx-15">
        <div className="my-10 px-2 max-w-2xl mx-auto py-5 border-8 border-thirdCol">
          <p className="text-xl mb-10"> Enter description of the POST</p>
          <div className="m-10">
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={modules}
            />
          </div>
          <div>
            <input type="file" multiple onChange={handleFileSelect} />
          </div>
          <div className="text-center pt-10">
            <button
              onClick={sendPostHandler}
              className="bg-thirdCol rounded-lg px-3 py-2 text-center"
            >
              Add a Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddPost;
