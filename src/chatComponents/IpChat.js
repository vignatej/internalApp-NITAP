import { useRef } from "react";
import { connectToSocket } from "../store/chat-actions";
const IpChat = (props) => {
  const chatref = useRef();
  const handleKeyDown = (event) => {
    if (event.key !== "Enter") {
      return;
    }
    const msg = chatref.current.value;
    if(msg===""){
        return "";
    }
    console.log(msg);
    props.sndmsg(msg);
    chatref.current.value = "";
  };

  return (
    <>
      <input
        type="text"
        className="w-full h-10 bg-cardCol border-solid border-2 border-sky-500 rounded-sm mb-5 text-right"
        onKeyDown={handleKeyDown}
        ref={chatref}
      />
    </>
  );
};
export default IpChat;
