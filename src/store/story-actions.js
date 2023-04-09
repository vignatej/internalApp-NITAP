import { storiesActions } from "./story-slice";
import { baseUrl } from "../fixed";

export const getStories = () => {
  return async (dispatch) => {
    console.log("getting Stories");
    const response = await fetch(`${baseUrl}`);
    if (!response.ok) {
      console.log("not fetched stories");
      throw new Error("cant fetch stories");
    }
    const res = await response.json();
    console.log(res);
    dispatch(storiesActions.addStories(res));
  };
};

export const getStory = (id) => {
  return async (dispatch) => {
    console.log("getting story" + id);
    const resp = await fetch(`${baseUrl}story/${id}`);
    if (!resp.ok) {
      throw new Error("err occured while fetching story");
    }
    const response = await resp.json();
    console.log(response);
    dispatch(storiesActions.addStory({"id":id,"value":response}));
  };
};
