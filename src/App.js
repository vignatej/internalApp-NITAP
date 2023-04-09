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
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    document.body.classList.add("bg-background", "text-txtCol");
    dispatch(startAppLogin());
  }, [dispatch]);
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/placements/*" element={<Placements />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/events" element={<Events />} />
      <Route path="/classroom/*" element={<Classroom />} />
    </Routes>
  );
}

export default App;
