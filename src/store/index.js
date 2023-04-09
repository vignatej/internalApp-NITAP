import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import chatSlice from "./chat-slice";
import storiesSlice from "./story-slice";

const store = configureStore({
  reducer: { 
    auth: authSlice.reducer, 
    stories: storiesSlice.reducer,
    chat: chatSlice.reducer,
},
});
export default store;
