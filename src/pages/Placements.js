import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getStories } from "../store/story-actions";
import { useSelector } from "react-redux";

import Header from "../components/Header";
import Tiles from "../components/Tiles";
import { Route, Routes } from "react-router-dom";
import AddStory from "./AddStory";
import Story from "../components/Story";
var fir = 0;
const Placements = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const tilesList = useSelector((state) => state.stories.stories);
  console.log(tilesList);
  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);


  const searchRef = useRef();
  const [til, setTil] = useState(tilesList);
  
  const handleKeyDown = async (event) => {
    if (event.key !== "Enter") {
      return;
    }
    const searchQuery = searchRef.current.value;
    if(searchQuery === ""){
      setTil(tilesList);
      return;
    }setTil([]);
    for(const i in tilesList){
      if ( tilesList[i].user.branch === searchQuery ){
        setTil((prev)=>{
          return [...prev, tilesList[i]]
        })
      }
    }

  };
  return (
    <>
      <Header />
      <Routes>
        <Route exact
          path="/"
          element={
            <>
              {isAuthenticated && (
                <div className="flex justify-around items-center flex-wrap mb-10">
                  <button className="bg-thirdCol rounded-lg px-6 py-3 my-6 text-center">
                    <NavLink to={"/placements/addStory"}>
                      Add a new Story
                    </NavLink>
                  </button>
                  {/* <input
                    ref={searchRef}
                    onKeyDown={handleKeyDown}
                    className="bg-cardCol h-10 rounded-lg w-64"
                    placeholder="   🔍  Search by Branch"
                  /> */}
                </div>
              )}
              <div className="grid lg:grid-cols-3 gap-8 md:grid-cols-2 md:px-24 mx-5">
                <Tiles tiles={tilesList} />
              </div>
              <div className="h-8"></div>
            </>
          }
        ></Route>
        <Route exact path="/addStory" element={<AddStory />}></Route>
        <Route exact path="/story/:id" element={<Story />}></Route>
      </Routes>
    </>
  );
};
export default Placements;
