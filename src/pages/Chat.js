import Header from "../components/Header";
import IpChat from "../chatComponents/IpChat";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ChatUserSingle from "../chatComponents/ChatUserSingle";
import { onNewMsg } from "../store/chat-actions";
import { baseUrl } from "../fixed";
import { wsurl } from "../fixe1";
const Chat = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const connected = useSelector((state)=>state.chat.connected);
  const msg = useSelector((state) => state.chat.messages);
  const allusers = useSelector((state) => state.chat.allOtherUsers);
  const authUserId = useSelector((state) => state.auth.authDetails.profileId);
  const dispatch = useDispatch();
  const [currUser, setCurrUser] = useState(null);
  const [currUserName, setCurrUserName] = useState(null);
  const [websocket, setWebsocket] = useState(null);
  useEffect(() => {
    const socketUrl = `${wsurl}/oneonechat/${localStorage.getItem(
      "profileId"
    )}/`;
    const socket = new WebSocket(socketUrl);
    socket.onopen = function (event) {
      console.log("WebSocket opened");
      setWebsocket(socket);
    };

    socket.onclose = function (event) {
      console.log("websocket closed");
      setWebsocket(null);
    };
  }, []);

  if (!isAuthenticated) {
    return <p>you are not authenticated</p>;
  }
  if (websocket) {
    websocket.onmessage = function (event) {
      const msg = JSON.parse(event.data);
      console.log(msg);
      dispatch(onNewMsg(msg));
    };
  }

  const userOnPress = (id, details = null) => {
    setCurrUser(id);
    setCurrUserName(details);
    console.log(id);
  };
  const sendWebSocketmsg = (msg) => {
    websocket.send(JSON.stringify({ message: msg, reciever_id: currUser }));
  };
  return (
    <>
      <Header />
      <div className="flex mx-10">
        <div className="w-1/4 h-full">
          {allusers.map((item) => {
            if (authUserId === item.id) {
              return;
            }
            return (
              <div key={item.id}><ChatUserSingle item={item} onPress={userOnPress} key={item.id} /></div>
            );
          })}
        </div>
        <div className="w-3/4 px-5">
          <div>
            {currUserName && (
              <div className="flex items-center mb-5">
                <img
                  alt="prof"
                  src={`${baseUrl}${currUserName.profilePhoto}`}
                  className="w-10 h-10 rounded-full"
                ></img>
                <div className="pl-3">
                  <p className="" style={{ display: "inline" }}>
                    {currUserName.name}
                  </p>
                  <p>{currUserName.tagline}</p>
                </div>
              </div>
            )}
          </div>
          {currUser && <IpChat curr_id={currUser} sndmsg={sendWebSocketmsg} />}
          {/* <div className="h-screen overflow-y-scroll "> */}
          <div className="">
            {msg.map((message) => {
              if (
                message.sender.id === currUser ||
                message.reciever.id === currUser
              ) {
                return (
                  <div key={message.id} className="my-2">
                    {message.sender.id != localStorage.getItem("profileId") ? (
                      <div className="w-full flex">
                        {/* sent by other person */}
                        <div className="basis-2/3 bg-cardCol rounded">
                          <p className="p-3 whitespace-normal break-words">
                            {message.text}
                          </p>
                        </div>
                        <div className="basis-1/3"></div>
                      </div>
                    ) : (
                      <div className="w-full flex">
                        {/* sent by you */}

                        <div className="basis-1/3"></div>
                        <div className="basis-2/3 text-right bg-cardCol rounded mr-3">
                          <p className="p-3 whitespace-normal break-words">
                            {message.text}
                          </p>
                        </div>
                      </div>
                    )}
                    {/* <p key={message.id}>
                      {message.text}-{message.sender.name}-{message.sender.id}
                      {message.reciever.name}
                    </p> */}
                  </div>
                );
              } else {
                return <div key={Math.random()}></div>;
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Chat;
