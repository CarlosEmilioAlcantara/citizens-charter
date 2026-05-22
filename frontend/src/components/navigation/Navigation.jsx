import AuthContext from "../../context/AuthContext";
import { useState, useContext } from "react";
import { navItems } from "../../stores/navItems";
import Overlay from "../reusables/Overlay";
import Topbar from "../layout/Topbar";
import NavbarMobile from "./NavbarMobile";
import NavbarDesktop from "./NavbarDesktop";
import useToggle from "../../utils/useToggle";
import useWindowWidth from "../../utils/useWindowWidth";
import { isNotMobile } from "../../utils/isNotMobile";

export default function Navigation() {
  const { user, logoutUser } = useContext(AuthContext);
  const [state, toggle] = useToggle(false);
  const [windowWidth] = useWindowWidth();
  const [links, _] = useState({...navItems});

  return(
    <>
      <Overlay show={state} toggle={toggle} zIndex={30}/>

      {!isNotMobile(windowWidth) && (
        <Topbar state={state} toggle={toggle} />
      )}

      {!isNotMobile(windowWidth) && (
        <NavbarMobile 
          state={state} 
          toggle={toggle} 
          links={links} 
          user={user}
          logoutUser={logoutUser}
        />
      )}

      {isNotMobile(windowWidth) && (
        <NavbarDesktop 
          state={state} 
          toggle={toggle} 
          links={links} 
          user={user}
          logoutUser={logoutUser}
        />
      )}
    </>
  );
}