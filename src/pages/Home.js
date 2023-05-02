import pic1 from "../images/authImage.png";
import pic2 from "../images/placementsMain.png";
import pic3 from "../images/chatHome.jpg";
import pic4 from "../images/eventsHome.png";
import pic5 from "../images/classroomHome.jpg";
import { authActions } from "../store/auth-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Tabs from "../components/Tabs";
import Header from "../components/Header";

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userDetails = useSelector((state) => state.auth.authDetails);
  const dispatch = useDispatch();
  const logouthandler = () => {
    dispatch(authActions.removeAuth());
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };
  return (
    <>
      <Header/>
      <div className="text-center mt-60 mb-96">
        <p className="text-2xl text-white">Welcome to INTERNAL APP NIT AP</p>
          <p>Here u can use any of our services to get connected </p>
          <p className="text-sm">please scroll down</p>
      </div>

      <div className="mx-6 grid lg:grid-cols-3 md:grid-cols-2">
        {!isAuthenticated && (
          <Tabs
            heading="Authentication"
            subHeading="please login or signup to use all features"
            nextPage={"/auth"}
            image={pic1}
          ></Tabs>
        )}

        <Tabs
          heading="Placement Stories"
          subHeading="different placement stories of NIT AP."
          nextPage={"/placements"}
          image={pic2}
        ></Tabs>
        <Tabs
          heading="ChatApp"
          subHeading="Message any official or Student"
          nextPage={"/chat"}
          image={pic3}
        ></Tabs>
        <Tabs
          heading="Events Page"
          subHeading="All Events Happening in our College"
          nextPage={"/events"}
          image={pic4}
        ></Tabs>
        <Tabs
          heading="Classroom"
          subHeading="An app to provide classroom experience with virtual way"
          nextPage={"/classroom"}
          image={pic5}
        ></Tabs>
      </div>
      {isAuthenticated && (
        <div className="m-6 text-center pt-10 ">
          <p>Name: {userDetails["username"]},</p>
          <p>Mail: {userDetails["email"]},</p>
          <p>tagline: {userDetails["tagline"]}</p>
          <button
            className="bg-thirdCol rounded-lg px-6 py-3 my-6"
            onClick={logouthandler}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};
export default Home;
