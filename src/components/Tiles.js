import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getStories } from "../store/story-actions";
import { useSelector } from "react-redux";
import { baseUrl } from "../fixed";
const Tiles = (props) => {
  // const dispatch = useDispatch();
  // const tilesList = useSelector((state)=>state.stories.stories);
  // useEffect(()=>{
  //   dispatch(getStories());
  // },[dispatch]);
  const tilesList = props.tiles;
  return (
    <>
      {tilesList.map((tile) => {
        return (
          <NavLink to={`/Placements/Story/${tile.id}`} key={tile.id}>
           
            <div className="rounded-xl bg-cardCol p-6 h-full">
              <div className="flex flex-row items-center">
                <img
                  src={`${baseUrl}${tile.user.profilePhoto}`}
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
