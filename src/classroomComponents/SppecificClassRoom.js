import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Description from "./Description.js";
import Posts from "./Posts.js";
import Bucket from "./Bucket.js";
const SppecificClassRoom = () => {
  const id = useParams().id;
  const [classRoom, setDet] = useState({});
  const [index, setIndex] = useState(0);
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
            className="bg-thirdCol rounded-lg px-3 py-2 text-center"
          >
            BUCKET
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
