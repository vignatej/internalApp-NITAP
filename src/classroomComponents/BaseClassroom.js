import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const BaseClassroom = () => {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const fetchClassRooms = async () => {
      const resp = await fetch(
        "http://127.0.0.1:8000/classroom/getAllClasses",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      const allClasses = await resp.json();
      setClassrooms(allClasses);
      console.log(allClasses);
    };
    fetchClassRooms();
  }, []);

  return (
    <>
      <div>
        {classrooms.map((item) => {
          return (
            <div className="m-10 p-5 bg-cardCol rounded-xl " key={item.id}>
              <NavLink to={`${item.id}`}>
                <p className="text-3xl uppercase">{item.name}</p>
                <p>
                  <span className="">{item.code}</span> - {item.teacher_name}
                </p>
                <p>
                  {item.year}-{item.sem} semister
                </p>
              </NavLink>
            </div>
          );
        })}
      </div>
      <NavLink to={`addClass`}>
        <div className="text-center">
          <button className="bg-thirdCol rounded-lg px-6 py-3 my-6 text-center">
            <p className="mx-auto">Add Class</p>
          </button> 
        </div>
      </NavLink>
    </>
  );
};
export default BaseClassroom;
