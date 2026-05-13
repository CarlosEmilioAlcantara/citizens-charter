import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import { 
  FaHome, 
  FaChartBar, 
  FaUsers, 
  FaUser, 
  FaDatabase 
} from "react-icons/fa";
import { FaXmark, FaClipboardUser } from "react-icons/fa6"
import { IoDocumentTextSharp } from "react-icons/io5";
import { HiBuildingOffice, HiBuildingOffice2 } from "react-icons/hi2";
import { ImBooks } from "react-icons/im";
import { TbWritingFilled } from "react-icons/tb";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Overlay from "./Overlay";
import useToggle from "../utils/useToggle";

export default function Sidebar() {
  const { user, logoutUser } = useContext(AuthContext);
  const [state, toggle] = useToggle(false);
  const [location, setLocation] = useState("");

  const [links, setLinks] = useState({
    "Dashboard": {
      "link": "/dashboard",
      "icon": <FaHome />,
      "staff": false,
      "superuser": false,
    },
    "Charter": {
      "link": "/charter",
      "icon": <IoDocumentTextSharp />,
      "staff": false,
      "superuser": false,
    },
    "Analytics": {
      "link": "/analytics",
      "icon": <FaChartBar />,
      "staff": true,
      "superuser": false,
    },
    "Sectors": {
      "link": "/sectors",
      "icon": <HiBuildingOffice2 />,
      "staff": true,
      "superuser": true,
    },
    "Offices": {
      "link": "/offices",
      "icon": <HiBuildingOffice />,
      "staff": true,
      "superuser": true,
    },
    "Users": {
      "link": "/users",
      "icon": <FaUsers />,
      "staff": true,
      "superuser": true,
    },
    "Charter Audit": {
      "link": "/charter-audit",
      "icon": <TbWritingFilled />,
      "staff": true,
      "superuser": true,
    },
    "Admin Audit": {
      "link": "/staff-audit",
      "icon": <FaClipboardUser />,
      "staff": true,
      "superuser": true,
    },
    "Charter PDFs": {
      "link": "/charter-pdfs",
      "icon": <ImBooks />,
      "staff": true,
      "superuser": true,
    },
    "Data Backup": {
      "link": "/data-backup",
      "icon": <FaDatabase />,
      "staff": true,
      "superuser": true,
    },
  });

  useEffect(() => {
    setLocation(window.location.pathname);
  }, []);

  return(
    <>
      <Overlay show={state} zIndex={20}/>
      <div className={`
        fixed
        top-0
        flex
        justify-between 
        items-center 
        p-2 
        border-b
        w-screen 
        bg-background 
        border-accent
      text-accent
        md:hidden
        ${state ? 'z-10' : 'z-30'}
      `}>
        <div className="flex items-center gap-2 md:flex-col">
          <img src="/spc-logo.png" className="w-10"/>
          <img src="/bagong-pilipinas.png" className="w-10"/>

          <div 
            className="
              flex 
              flex-col 
              text-[10px]
              font-bold 
              tracking-wider 
              md:hidden
          ">
            <p>Citizen's Charter System</p>
            <span className="hidden md:block">-</span> 
            <p>Lungsod ng San Pablo</p>
          </div>
        </div>
    
        <i onClick={toggle} className="cursor-pointer">
          <GiHamburgerMenu size={24}/>
        </i>

        <div
          style={{ transition: "all 0.5s ease, all 0.5s ease" }} 
          className={`
            hidden
            p-2
            text-2xl
            md:block
        `}>
        </div>
      </div>

      <div 
        style={{ transition: "all 0.5s ease, all 0.5s ease" }} 
        className={`
          fixed
          top-0
          ${state ? 'right-0' : '-right-60'}
          flex
          flex-col
          justify-between
          w-55
          h-screen 
          pt-1
          border-l
          bg-background
          border-accent
          text-xl
          text-accent
          transform 
          transition-transform
          ${state ? 'opacity-100 z-30' : 'opacity-0'}
          md:hidden 
        `}
      >
        <div>
          <div className="flex flex-col items-end">
            <span
              onClick={toggle}
              className="mb-3 text-3xl p-2 pb-0 cursor-pointer"
            >
              <i><FaXmark /></i>
            </span>
            <hr className="w-full h-0.5 mb-2 rounded-[0.1px] bg-background"/>
          </div>

          <ul className="flex flex-col">
            {Object.entries(links).map(([key, value]) => (
              !value.staff && !value.superuser && (
                <li key={key} className="w-full">
                  <Link 
                    to={value.link}
                    style={{ transition: "all 0.3s ease, all 0.3s ease" }} 
                    className={`
                      flex 
                      gap-3 
                      justify-end
                      items-center 
                      p-2
                      cursor-pointer
                    hover:bg-active
                    hover:text-confirm-hover
                    focus:bg-active
                    focus:text-confirm-hover
                    active:bg-active
                    active:text-confirm-hover
                      ${location === value.link && (
                        'bg-active text-confirm-hover'
                      )}
                  `}>
                    <p className="text-xl">{key}</p>
                    <i>{value.icon}</i>
                  </Link>
                </li>
            )))}

            {Object.entries(links).map(([key, value]) => (
              (user.is_staff && user.is_superuser) && 
              (!user.is_superuser && !value.superuser) && (
                <li key={key} className="w-full">
                  <Link 
                    to={value.link}
                    style={{ transition: "all 0.3s ease, all 0.3s ease" }} 
                    className={`
                      flex 
                      gap-3 
                      justify-end
                      items-center 
                      p-2
                      cursor-pointer
                    hover:bg-active
                    hover:text-confirm-hover
                    focus:bg-active
                    focus:text-confirm-hover
                    active:bg-active
                    active:text-confirm-hover
                      ${location === value.link && (
                        'bg-active text-confirm-hover'
                      )}
                  `}>
                    <p className="text-xl">{key}</p>
                    <i>{value.icon}</i>
                  </Link>
                </li>
            )))}

            {Object.entries(links).map(([key, value]) => (
              (user.is_staff && user.is_superuser) && 
              (user.is_superuser && value.superuser) && (
                <li key={key} className="w-full">
                  <Link 
                    to={value.link}
                    style={{ transition: "all 0.3s ease, all 0.3s ease" }} 
                    className={`
                      flex 
                      gap-3 
                      justify-end
                      items-center 
                      p-2
                      cursor-pointer
                    hover:bg-active
                    hover:text-confirm-hover
                    focus:bg-active
                    focus:text-confirm-hover
                    active:bg-active
                    active:text-confirm-hover
                      ${location === value.link && (
                        'bg-active text-confirm-hover'
                      )}
                    `}>
                      <p className="text-xl">{key}</p>
                      <i>{value.icon}</i>
                  </Link>
                </li>
            )))}

            <li onClick={logoutUser} className="w-full">
              <Link
                to="/logout"
                style={{ transition: "all 0.3s ease, all 0.3s ease" }} 
                className="
                  flex 
                  gap-3 
                  justify-end
                  items-center 
                  p-2
                  cursor-pointer
                hover:bg-active
                hover:text-confirm-hover
                focus:bg-active
                focus:text-confirm-hover
                active:bg-active
                active:text-confirm-hover
              ">
                <p>Logout</p>
                <i className="text-2xl"><RiLogoutBoxRFill /></i>
              </Link>
            </li>
          </ul>
        </div>

        <p 
          className="
            text-[8px] 
            text-right 
            p-2 
            bg-accent 
            text-background 
            md:text-left
        ">
          This software was made by CMO - MISO
        </p>
      </div>

      <div 
        style={{ transition: "all 0.5s ease, all 0.5s ease" }} 
        className={`
          hidden
          fixed
          top-0
          left-0
          flex-col
          justify-between
          items-start
          w-screen 
          h-screen
          border-b-0
          border-r
        text-accent
          bg-background 
          border-accent
          overflow-hidden
          transform 
          transition-transform
          md:flex
          ${state ? 'md:w-55' : 'md:w-15'}
          z-30
      `}>
        <div 
          className="
            hidden 
            flex-col 
            w-full
            text-2xl 
            justify-between 
            h-screen 
            md:flex
        ">
          <div className="flex flex-col">
            <div className="flex gap-3 p-2">
              <div className="flex flex-col gap-2">
                <img src="/spc-logo.png" className="max-w-10"/>
                <img src="/bagong-pilipinas.png" className="max-w-10"/>
              </div>

              <div 
                style={{ transition: "all 0.5s ease, all 0.5s ease" }} 
                className={`
                  flex
                  flex-col 
                  justify-center
                  items-center
                  font-bold 
                  text-center
                  tracking-wider 
                  text-nowrap
                  transform 
                  transition-transform
                  ${state ? 'opacity-100' : 'opacity-0'}
              `}>
                <p className="text-sm">Citizen's Charter <br />System</p>
                <p className="text-[10px]">Lungsod ng San Pablo</p>
              </div>
            </div>

            <hr className="w-full h-0.5 my-4 rounded-[0.1px] bg-background"/>

            <ul className={`
              flex
              flex-col
              text-nowrap
            `}>
              {Object.entries(links).map(([key, value]) => (
                !value.staff && !value.superuser && (
                  <li key={key}>
                    <Link 
                      to={value.link}
                      style={{ transition: "all 0.3s ease, all 0.3s ease" }} 
                      className={`
                        flex 
                        gap-3 
                        items-center 
                        px-4 
                        py-2
                        cursor-pointer
                      hover:bg-active
                      hover:text-confirm-hover
                      focus:bg-active
                      focus:text-confirm-hover
                      active:bg-active
                      active:text-confirm-hover
                        ${location === value.link && (
                          'bg-active text-confirm-hover'
                        )}
                    `}>
                      <i>{value.icon}</i>
                      <p 
                        style={{ transition: "all 0.5s ease, all 0.5s ease" }} 
                        className={`
                          text-xl 
                          transform 
                          transition-transform
                          ${state ? 'opacity-100' : 'opacity-0'}
                      `}>
                        {key}
                      </p>
                    </Link>
                  </li>
              )))}

              {Object.entries(links).map(([key, value]) => (
                (user.is_staff && user.is_superuser) && 
                (!user.is_superuser && !value.superuser) && (
                  <li key={key}>
                    <Link 
                      to={value.link}
                      style={{ transition: "all 0.3s ease, all 0.3s ease" }} 
                      className={`
                        flex 
                        gap-3 
                        items-center 
                        px-4 
                        py-2
                        cursor-pointer
                      hover:bg-active
                      hover:text-confirm-hover
                      focus:bg-active
                      focus:text-confirm-hover
                      active:bg-active
                      active:text-confirm-hover
                        ${location === value.link && (
                          'bg-active text-confirm-hover'
                        )}
                    `}>
                      <i>{value.icon}</i>
                      <p 
                        style={{ transition: "all 0.5s ease, all 0.5s ease" }} 
                        className={`
                          text-xl 
                          transform 
                          transition-transform
                          ${state ? 'opacity-100' : 'opacity-0'}
                      `}>
                        {key}
                      </p>
                    </Link>
                  </li>
              )))}

              {Object.entries(links).map(([key, value]) => (
                (user.is_staff && user.is_superuser) && 
                (user.is_superuser && value.superuser) && (
                  <li key={key}>
                    <Link 
                      to={value.link}
                      style={{ transition: "all 0.3s ease, all 0.3s ease" }} 
                      className={`
                        flex 
                        gap-3 
                        items-center 
                        px-4 
                        py-2
                        cursor-pointer
                      hover:bg-active
                      hover:text-confirm-hover
                      focus:bg-active
                      focus:text-confirm-hover
                      active:bg-active
                      active:text-confirm-hover
                        ${location === value.link && (
                          'bg-active text-confirm-hover'
                        )}
                    `}>
                      <i>{value.icon}</i>
                      <p 
                        style={{ transition: "all 0.5s ease, all 0.5s ease" }} 
                        className={`
                          text-xl 
                          transform 
                          transition-transform
                          ${state ? 'opacity-100' : 'opacity-0'}
                      `}>
                        {key}
                      </p>
                    </Link>
                  </li>
              )))}

              <i 
                onClick={toggle} 
                style={{ transition: "all 0.3s ease, all 0.3s ease" }} 
                className="
                  cursor-pointer 
                  px-4 
                  py-2 
                  hover:bg-active
                  hover:text-confirm-hover
                  focus:bg-active
                  focus:text-confirm-hover
                  active:bg-active
                  active:text-confirm-hover
              ">
                {state ? (
                  <FaChevronLeft 
                    size={24}
                    style={{ transition: "all 0.5s ease, all 0.5s ease" }} 
                    className="transform transition-transform"
                  />
                ) : (
                  <FaChevronLeft 
                    size={24} 
                    style={{ transition: "all 0.5s ease, all 0.5s ease" }} 
                    className="
                      scale-x-[-1]
                      transform 
                      transition-transform
                  "/>
                )}
              </i>
            </ul>
          </div>

          <div className="flex flex-col bg-accent text-background">
            <Link to="/logout"
              onClick={logoutUser} 
              style={{ transition: "all 0.3s ease, all 0.3s ease" }} 
              className="
                hidden  
                px-4 
                py-2
                gap-3 
                items-center 
                cursor-pointer
                md:flex
                hover:bg-active
                hover:text-confirm-hover
                focus:bg-active
                focus:text-confirm-hover
                active:bg-active
                active:text-confirm-hover
            ">
              <i className="text-2xl"><RiLogoutBoxRFill /></i>
              <p 
                style={{ transition: "all 0.5s ease, all 0.5s ease" }} 
                className={`
                  text-xl 
                  transform 
                  transition-transform
                  ${state ? 'opacity-100' : 'opacity-0'}
              `}>
                Logout
              </p>
            </Link>
            
            <p 
              className="
                text-[8px] 
                text-right 
                text-nowrap
                p-2
                ml-[10px] 
                md:text-left
            ">
              MISO <span 
                style={{ transition: "all 0.5s ease, all 0.5s ease" }} 
                className={`
                  transform 
                  transition-transform
                  ${state ? 'opacity-100' : 'opacity-0'}
                `}>
                  made software
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}