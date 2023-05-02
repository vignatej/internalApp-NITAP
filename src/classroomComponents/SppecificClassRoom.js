import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Description from "./Description.js";
import Posts from "./Posts.js";
import Bucket from "./Bucket.js";
import { baseUrl } from "../fixed.js";

const SppecificClassRoom = () => {
  const id = useParams().id;
  const [classRoom, setDet] = useState({});
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const fetchDetails = async () => {
      const resp = await fetch(`${baseUrl}/classroom/getAClass`, {
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
      console.log(res);
      setDet(res);
    };
    fetchDetails();
  }, [id]);
  const setDESC = (event) => {
    event.preventDefault();
    setIndex(0);
  };
  const setPosts = (event) => {
    event.preventDefault();
    setIndex(1);
  };
  const setBucket = (event) => {
    event.preventDefault();
    setIndex(2);
  };
  const goToConFerencing = (event)=>{
    event.preventDefault(); 
  }
  return (
    <div className="m-10">
      <div className="mb-10 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-3xl font-bold mr-5 ">{classRoom.name}</h1>
        <div className="my-6">
          <button
            onClick={setDESC}
            className="bg-thirdCol rounded-lg px-3 py-2 text-center mr-3"
          >
            DESCRIPTION
          </button>
          <button
            onClick={setPosts}
            className="bg-thirdCol rounded-lg px-3 py-2 text-center mr-3"
          >
            POSTS
          </button>
          <button
            onClick={setBucket}
            className="bg-thirdCol rounded-lg px-3 py-2 text-center mr-3"
          >
            BUCKET
          </button>
          
          <button
            onClick={goToConFerencing}
            className="bg-thirdCol rounded-lg px-3 my-2 py-2 text-center"
          >
            <NavLink to="conferencing">CONFERENCING</NavLink>
          </button>
          
        </div>
      </div>
      {index===0 && <Description classRoom={classRoom} />}
      {index===1 && <Posts />}
      {index===2 && <Bucket />}
      {/* <div>
        <h3 className="text-3xl">DESCRIPTION</h3>
        <div dangerouslySetInnerHTML={{ __html: classRoom.description }}></div>
      </div> */}
    </div>
  );
};
export default SppecificClassRoom;
