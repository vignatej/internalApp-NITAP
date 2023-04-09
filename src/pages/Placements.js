import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import Tiles from "../components/Tiles";
import { Route, Routes } from "react-router-dom";
import AddStory from "./AddStory";
import Story from "../components/Story";
import { useSelector } from "react-redux";
const Placements = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              {isAuthenticated && <div className="text-center">
              <button className="bg-thirdCol rounded-lg px-6 py-3 my-6 text-center">
                <NavLink to={"/placements/addStory"}>Add a new Story</NavLink>
              </button>
              </div>}
              <div className="grid lg:grid-cols-3 md:grid-cols-2 md:px-24">
                <Tiles />
              </div>
            </>
          }
        ></Route>
        <Route path="/addStory" element={<AddStory />}></Route>
        <Route path="/story/:id" element={<Story />}></Route>
      </Routes>
    </>
  );
};
export default Placements;
