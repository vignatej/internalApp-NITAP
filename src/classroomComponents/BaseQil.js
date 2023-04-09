import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BaseQil = () => {
  const [val, setVal] = useState("");
  const modules = {
    toolbar: [
      [{ size: [] }],[{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold"], ["italic"], ["underline"], ["strike"], ["blockquote"], ["code-block"],
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
  return (
    <div className="m-10">
      <ReactQuill
        theme="snow"
        value={val}
        onChange={setVal}
        modules={modules}
      />
    </div>
  );
};
export default BaseQil;
