import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userDetails = useSelector((state) => state.auth.authDetails);

  return (
    <>
      <div
        id="home-navbar"
        className="sticky top-0 flex justify-between items-center mb-5 bg-background py-3"
      >
        <p className=" font-bold uppercase p-4 ml-6 py-2">
          INTERNAL APP - NIT AP
        </p>
        {isAuthenticated && (
          <img
            src={`http://127.0.0.1:8000${userDetails["profilePhoto"]}`}
            alt=".."
            className="rounded-full w-9 h-9 mr-6"
          />
        )}
        {!isAuthenticated && (
          <NavLink to={"/auth"}>
            <p className="bg-thirdCol rounded-xl px-3 m-3 mx-6 py-2 text-fifthCol">
              Login/SignUp
            </p>
          </NavLink>
        )}
      </div>
    </>
  );
};
export default Header;
