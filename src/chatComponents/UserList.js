import { useState, useEffect, useCallback } from "react";
import { baseUrl } from "../fixed";
import ChatUserSingle from "./ChatUserSingle";
import { useSelector } from "react-redux";
const UserList = () => {
  const curr_user_id = useSelector((state) => state.auth.authDetails.profileId);
  const [usersList, setUsersList] = useState([]);
  const [currFocusProfileId, setCurrFocusProfileId] = useState(null);

  const fetchData = useCallback(async () => {
    const response = await fetch(`${baseUrl}users/getAllProfiles/`);
    if (!response.ok) {
      console.log("can fetch all profiles");
    }
    const list = await response.json();
    console.log(list);
    setUsersList(list);
  }, []);

  // useEffect(() => {
  //   fetchData();
  //   const webUrl = ``
  // }, [fetchData]);

  const onPressHandler = (id) => {
    console.log(id);
    setCurrFocusProfileId(id);
  };

  return (
    <div className="flex flex-row mx-10">
      <div className="basis-1/4 h-max">
        {usersList.map((item) => {
          return (
            // <ChatUserSingle
            //   item={item}
            //   key={item.id}
            //   onPress={onPressHandler}
            //   currUserId={curr_user_id}
            // />
            <p></p>
          );
        })}
      </div>
      <div className="basis-3/4 rounded-xl h-max border-black border-2">
        <p>{currFocusProfileId}</p>
      </div>
    </div>
  );
};
export default UserList;
