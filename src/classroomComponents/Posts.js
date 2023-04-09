import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import "react-quill/dist/quill.snow.css";

const Posts = () => {
  const classId = useParams().id;
  const [posts, SetPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`http://127.0.0.1:8000/classroom/getPosts`, {
        method: "POST",
        body: JSON.stringify({ classId: classId }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("cat fetch posts");
      }
      const resp = await res.json();
      SetPosts(resp);
      console.log(resp);
    };
    fetchPosts();
  }, [classId]);
  const fileAndExt = (filePath) => {
    const a = filePath.split("/")[filePath.split("/").length - 1];
    let d = a;
    if (a.includes("_")) {
      const b = a.split("_")[0];
      const c = a.split(".")[1];
      d = b +"."+ c;
    }
    return d;
  };
  const Timing = (str) => {
    const d = new Date(str);
    let res = "";
    res += d.getDate() + " ";
    const mon = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "july",
      "aug",
      "sept",
      "oct",
      "nov",
      "dec",
    ];
    res += mon[d.getMonth()] + " ";
    res += d.getFullYear() + " - ";
    res += d.getHours()%13 + ":" + d.getMinutes();
    if(d.getHours()>12){
        res += " PM"
    }else{
        res+=" AM"
    }
    return res;
  };
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <p className="text-3xl font-black">POSTS</p>
        <NavLink to="addPost">
          <button className="bg-thirdCol rounded-lg px-3 py-2 text-center">
            Add a Post
          </button>
        </NavLink>
      </div>
      <div>
        {posts.map((item) => (
          <div
            key={item.id}
            className="my-10 px-2 max-w-full mx-auto py-5 border-8 border-thirdCol rounded-xl"
          >
            <div className="ql-snow">
              {/* post owner details */}
              <div className="px-3">
                <div className="flex flex-row items-center">
                  <img
                    src={`http://127.0.0.1:8000${item.created_by.profilePhoto}`}
                    alt=".."
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="px-6">
                    <div className="text-2xl capitalize">
                      <p>{item.created_by.name}</p>
                    </div>
                    <div>
                      <p>{Timing(item.created_time)}</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="mt-4" />
              {/* post details */}
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></div>
              {/* all bucket items in post */}
              {item.files.length !== 0 && (
                <>
                  <hr className="" />
                  <div className="flex flex-row flex-wrap">
                    {item.files.map((file) => {
                      return (
                        <div key={file.id}>
                          <a
                            href={`http://127.0.0.1:8000${file.file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className="bg-thirdCol rounded-lg px-3 py-2 text-center text-txtCol mx-5 my-3">
                              {fileAndExt(file.file)}
                            </button>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Posts;
