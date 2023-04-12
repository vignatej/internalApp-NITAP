import Jitsi from "./Jitsi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Conferencing = (props) => {  
    const userDetails = useSelector((state) => state.auth.authDetails);
    const id = useParams().id;
    return <Jitsi classId={id} username={userDetails["username"]}/>
};
export default Conferencing;
