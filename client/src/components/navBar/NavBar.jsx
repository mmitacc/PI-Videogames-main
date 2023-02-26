import "./NavBAr.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="containerNB">
      <NavLink to="/videogames" className="textLink">
        VideoGames
      </NavLink>
      <NavLink to="/create" className="textLink">
        Create
      </NavLink>
    </div>
  );
};

export default NavBar;
