import { NavLink } from "react-router-dom"
const Main = ()=>{
    return <>
        <p><NavLink to="/userSignup" >user signup</NavLink></p>
        <p><NavLink to="/adminSignup" >admin signup</NavLink></p>
        <p><NavLink to="createElection" > create election</NavLink></p> 
    </>
};export default Main;
