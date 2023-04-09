import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import BaseQil from "./BaseQil";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddClass = () => {
  const classroom_ref = useRef();
  const code_ref = useRef();
  const year_ref = useRef();
  const sem_ref = useRef();
  const teacher_ref = useRef();

  const [DESCval, setVal] = useState("");
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

  const navigate = useNavigate();

  const SubmitHandler = (event) => {
    event.preventDefault();

    const form = new FormData();
    const classname = classroom_ref.current.value;
    const code = code_ref.current.value;
    const year = year_ref.current.value;
    const sem = sem_ref.current.value;
    const teacher = teacher_ref.current.value;
    const desc = DESCval;
    // console.log(classname, code, year, sem, teacher);
    form.append("name", classname);
    form.append("code", code);
    form.append("year", year);
    form.append("sem", sem);
    form.append("teacher_name", teacher);
    form.append("description", desc);
    const startSubmit = async (form) => {
      const resp = await fetch("http://127.0.0.1:8000/classroom/addClassroom", {
        method: "POST",
        body: form,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      if (!resp.ok) {
        throw new Error("error at submit");
      }
      const res = await resp.json();
      console.log(res);
      console.log("classroom created");
    };
    console.log(DESCval);
    startSubmit(form);
    navigate(-1);
  };

  return (
    <div className="mx-5 sm:mx-15">
      <div className="my-10 px-2 max-w-2xl mx-auto py-5 border-8 border-thirdCol">
        <p className="text-xl"> 1. Classroom Name</p>
        <input
          type="text"
          className="bg-cardCol h-10 w-full"
          placeholder=" enter name of the ClassRoom"
          ref={classroom_ref}
        />
        <div className="p-5"></div>
        <p className="text-xl"> 2. Classroom Code</p>
        <input
          type="text"
          className="bg-cardCol h-10 w-full"
          placeholder=" code of the ClassRoom"
          ref={code_ref}
        />
        <div className="p-5"></div>
        <p className="text-xl"> 3. Year</p>
        <input
          type="text"
          className="bg-cardCol h-10 w-full"
          placeholder=" Academic Year of the ClassRoom"
          ref={year_ref}
        />
        <div className="p-5"></div>
        <p className="text-xl"> 4. Semister</p>
        <input
          type="text"
          className="bg-cardCol h-10 w-full"
          placeholder=" Even / Odd Semister "
          ref={sem_ref}
        />
        <div className="p-5"></div>
        <p className="text-xl"> 5. Teacher Name</p>
        <input
          type="text"
          className="bg-cardCol h-10 w-full"
          placeholder=" Name of course Instructor "
          ref={teacher_ref}
        />

        <div className="p-5"></div>
        <p className="text-xl"> 6. Description</p>
        <div className="m-10">
          <ReactQuill
            theme="snow"
            value={DESCval}
            onChange={setVal}
            modules={modules}
          />
        </div>

        <div className="text-center">
          <button
            onClick={SubmitHandler}
            className="bg-thirdCol rounded-lg px-6 py-3 mt-6 text-center"
          >
            <p className="mx-auto">Add Class</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddClass;
