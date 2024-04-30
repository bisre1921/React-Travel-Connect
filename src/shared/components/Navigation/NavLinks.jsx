import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import { useContext } from "react";
import  AuthContext  from "../../Context/AuthContext";

const NavLinks = (props) => {
    const auth = useContext(AuthContext);

  return (
    <div>
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>Users</NavLink>
            </li>
            {auth.isLoggedIn && (
                <li>
                    <NavLink to={`/${auth.userId}/places`}>My Places</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/places/new">New Place</NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/auth">Authenticate</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <button onClick={auth.logout}>
                        LOGOUT
                    </button>
                </li>
            )}
            
        </ul>
    </div>
  )
}

export default NavLinks