import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getStories } from "../store/story-actions";
import { useSelector } from "react-redux";

const Tiles = () => {
  const dispatch = useDispatch();
  const tilesList = useSelector((state)=>state.stories.stories);
  useEffect(()=>{
    dispatch(getStories());
  },[dispatch]);
  return (
    <>
      {tilesList.map((tile) => {
        return (
          <NavLink to={`/Placements/Story/${tile.id}`} key={tile.id}>
            <div className="rounded-xl bg-cardCol m-4 p-6">
              <div className="flex flex-row items-center">
                <img
                  src={`http://127.0.0.1:8000${tile.user.profilePhoto}`}
                  alt=".."
                  className="w-16 h-16 rounded-full"
                />
                <div className="px-6">
                  <div className="text-2xl capitalize">
                    <p>{tile.user.name}</p>
                  </div>
                  <div>
                    <p>{tile.user.tagline}</p>
                  </div>
                </div>
              </div>
              <p className="pt-6">{tile.Text.substring(0, 285)}</p>
            </div>
          </NavLink>
        );
      })}
    </>
  );
};
export default Tiles;
