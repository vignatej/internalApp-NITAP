import { createSlice, current } from "@reduxjs/toolkit";
const dgf = (ga)=>{
  console.log(ga);
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState: { connected: false, messages: [], allOtherUsers: [] },
  reducers: {
    removeAllMessages(state) {
      state.messages = [];
    },
    change(state, action) {
      state.connected = action.payload;
    },
    addMessage(state, action) {
      const msg = [...state.messages, action.payload];
      msg.sort(function (a, b) {
        return b.id - a.id;
      });
      state.messages = msg;
    },
    addUser(state, action) {
      const st = current(state);
      const users = [...st.allOtherUsers];
      const newUser = action.payload;
      let l=users.length-1;
      dgf(newUser.id)
      while(l>=0){
        if (newUser.id == users[l].id){
          users.splice(l,1);
          break;
        }
        l=l-1;
      };
      users.unshift(newUser);
      dgf(users);
      state.allOtherUsers = users;
    },
    addStartMessages(state, action){
      state.messages = action.payload;
    },
    addStartUsers(state, action){
      state.allOtherUsers = action.payload;
    }
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice;
