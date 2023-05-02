import {  useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Questions from "./Questions";
import AddQuestion from "./AddQuestion";
import { useDispatch, useSelector } from "react-redux";
import { getStory } from "../store/story-actions";
import { baseUrl } from "../fixed";
const Story = () => {
  const par = useParams();
  const dispatch = useDispatch();
  const [start, setStart] = useState(true);
  // const fetchFiles = useCallback(async () => {
  //   try {
  //     const resp = await fetch(`${baseUrl}/story/${par.id}`);
  //     if (!resp.ok) {
  //       throw new Error("err occured while fetching story");
  //     }
  //     const response = await resp.json();
  //     console.log(response);
  //     setStory(response);

  //     setStart(false);
  //   } catch (e) {
  //     setStory({});
  //   }
  // }, [par.id, dispatch]);

  // useEffect(() => {
  //   fetchFiles();
  // }, [fetchFiles]);
  useEffect(() => {
    dispatch(getStory(par.id));
  }, [dispatch, par.id]);
  const story = useSelector((state) => (state.stories.story[par.id] ? state.stories.story[par.id]:{}));
  console.log(story);
  console.log("story11");
  const haveSameData = function (obj1, obj2) {
    const obj1Length = Object.keys(obj1).length;
    const obj2Length = Object.keys(obj2).length;

    if (obj1Length === obj2Length) {
      return Object.keys(obj1).every(
        (key) => obj2.hasOwnProperty(key) && obj2[key] === obj1[key]
      );
    }
    return false;
  };
  if (haveSameData(story,{})) {
    return <p>please wait retrieving information</p>;
  }
  return (
    <>
      <div className="px-10">
        <div>
          <div className="flex flex-row items-center">
            <img
              src={`${baseUrl}${story.user.profilePhoto}`}
              alt=".."
              className="w-16 h-16 rounded-full"
            />
            <div className="px-6">
              <div className="text-2xl capitalize">
                <p>{story.user.name}</p>
              </div>
              <div>
                <p>{story.user.tagline}</p>
              </div>
            </div>
          </div>
          <div>
            <br />
            <p style={{ whiteSpace: "pre-wrap" }}>{story.Text}</p>
          </div>
        </div>
        <div className="mt-12">
          <Questions questions={story.questions} />
        </div>
        <div>
          <AddQuestion id={par.id} />
        </div>
      </div>
    </>
  );
};
export default Story;
