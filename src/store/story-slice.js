import { createSlice } from "@reduxjs/toolkit";

const initialState = { stories: [], story: {} };

const storiesSlice = createSlice({
  name: "placement stories",
  initialState: initialState,
  reducers: {
    addStories(state, action) {
      state.stories = action.payload;
      const story = {};
      for (const i in action.payload) {
        story[action.payload[i].id] = {};
    }
      state.story = story;
    },
    addStory(state, action) {
      state.story[action.payload["id"]] = action.payload["value"];
    },
  },
});

export const storiesActions = storiesSlice.actions;
export default storiesSlice;
