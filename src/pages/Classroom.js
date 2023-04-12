import { useEffect } from "react";
import { useSelector } from "react-redux";
import BaseClassroom from "../classroomComponents/BaseClassroom";
import Header from "../classroomComponents/Header";
import { useParams } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import AddClass from "../classroomComponents/AddClass";
import SppecificClassRoom from "../classroomComponents/SppecificClassRoom";
import AddPost from "../classroomComponents/AddPost";
import ChangeDescription from "../classroomComponents/ChangeDescription";
import Conferencing from "../classroomComponents/Conferencing";
import Jitsi from "../classroomComponents/Jitsi";
const Classroom = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const id = useParams().id; 
  useEffect(() => {}, []);
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>{isAuthenticated ? <BaseClassroom /> : <p>Please login</p>}</>
          }
        ></Route>
        <Route path="/addClass" element={<AddClass />}></Route>
        <Route path="/:id" element={<SppecificClassRoom />} ></Route>
        <Route path="/:id/addPost" element={<AddPost />} ></Route>
        <Route path="/:id/changeDescription" element={<ChangeDescription />}></Route>
        <Route path="/:id/conferencing" element={<Conferencing  />}></Route>
      </Routes>
    </>
  );
};
export default Classroom;
