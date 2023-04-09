import { chatActions } from "./chat-slice";
var soc;
export const connectToSocket = (id, CorS = 0, data = {}) => {
  const socket = new WebSocket(`ws://127.0.0.1:8000/oneonechat/${id}/`);
  soc = socket;
  if (CorS === 0) {
    return (dispatch) => {
      console.log("inside disp in chat-act");
      socket.onopen = () => {
        dispatch(chatActions.change(true));
        console.log("Connected to websocket server");
      };
      socket.onclose = function (event) {
        console.log("webSocket Disconnected");
        dispatch(chatActions.change(false));
      };
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        dispatch(chatActions.addMessage(data));
        dispatch(chatActions.addUser(data.reciever));
        dispatch(chatActions.addUser(data.sender));
      };
    };
  }
  // else if (CorS === 1) {
  //   return (dispatch) => {
  //     console.log(data);
  //     socket.send(JSON.stringify(data));
  //   };
  // }
};
export default soc;

export const getInitialMsg = () => {
  return async (dispatch) => {
    const res = await fetch("http://127.0.0.1:8000/chat/room/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (!res.ok) {
      throw new Error("cant get initial messages");
    }
    const [messages, users] = await res.json();
    console.log(messages);
    console.log(users);
    dispatch(chatActions.addStartMessages(messages));
    dispatch(chatActions.addStartUsers(users));
  };
};

export const onNewMsg = (msg) => {
  return (dispatch) => {
    dispatch(chatActions.addMessage(msg));
    dispatch(chatActions.addUser(msg.sender));
    dispatch(chatActions.addUser(msg.reciever));
  };
};
