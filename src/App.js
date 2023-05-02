import { Route, Routes} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Placements from "./pages/Placements";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { startAppLogin } from "./store/auth-actions";
import Chat from "./pages/Chat";
import Events from "./pages/Events";
import Classroom from "./pages/Classroom";
import Main from "./examComponents/Main";
import Login_user from "./examComponents/Login_user";
import Login_admin from "./examComponents/Login_admin";
import CreateElection from "./examComponents/CreateElection";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    document.body.classList.add("bg-background", "text-txtCol");
    dispatch(startAppLogin());
  }, [dispatch]);
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path="/auth" element={<Auth />} />
      <Route exact path="/placements/*" element={<Placements />} />
      <Route exact path="/chat" element={<Chat />} />
      <Route exact path="/events" element={<Events />} />
      <Route exact path="/classroom/*" element={<Classroom />} />
    </Routes>
    // <Routes>
    //   <Route path="/*" element={<Main />} />
    //   <Route path="/userSignup" element={<Login_user />} />
    //   <Route path="/adminSignup" element={<Login_admin />} />
    //   <Route path="/createElection" element={<CreateElection />} />
      
    // </Routes>
  );
}

export default App;
