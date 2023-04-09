import { NavLink } from "react-router-dom";

const Description = (props) => {
  return (
    <>
      <div className="ql-snow">
        <h3 className="text-3xl">DESCRIPTION</h3>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: props.classRoom.description }}
        ></div>
      </div>
      <div>
        <div className="text-center">
          <button className="bg-thirdCol rounded-lg px-6 py-3 my-6 text-center">
            <NavLink to={"changeDescription"}>Change the Description</NavLink>
          </button>
        </div>
      </div>
    </>
  );
};
export default Description;
