import { useEffect } from "react";

const ChatUserSingle = (props) => {
  return (
    <div className="bg-cardCol px-3 py-3 mb-3 mr-4 rounded-lg" onClick={()=>props.onPress(props.item.id, props.item)} key={props.item.id}>
      <div className="flex items-center">
        <img
          alt="prof"
          src={`http://127.0.0.1:8000${props.item.profilePhoto}`}
          className="w-10 h-10 rounded-full"
        ></img>
        <div className="pl-3">
          <p className="" style={{ display: "inline" }}>
            {props.item.name}
          </p>
          <p>{props.item.tagline}</p>
        </div>
      </div>
    </div>
  );
};
export default ChatUserSingle;
