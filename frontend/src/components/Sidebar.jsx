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
import { TbWritingFilled } from "react-icons/tb";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Overlay from "./Overlay";

export default function Sidebar() {
  const { user, logoutUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState("");

  const showToggle = () => {show ? setShow(false) : setShow(true)};

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
      <Overlay show={show} />
      <div 
        style={{ transition: "all 0.5s ease, all 0.5s ease" }} 
        className={`
          fixed
          top-0
          w-screen 
        text-accent
          bg-background 
          border-accent
          border-b
          overflow-hidden
          transform 
          transition-transform
          md:left-0
          md:flex
          md:flex-col
          md:justify-between
          md:items-start
          md:border-b-0
          md:border-r
          ${show ? 'md:w-55' : 'md:w-15'}
          md:h-screen
      `}>
        <div className={`
          flex 
          justify-between 
          items-center 
          p-2 
          md:flex-col 
          md:gap-5 
          md:hidden
          ${show && ('-z-10')}
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
      
          <i onClick={showToggle} className="cursor-pointer">
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
            ${show ? 'right-0' : 'right-[-55%]'}
            flex
            flex-col
            justify-between
            w-[55%]
            h-screen 
            pt-1
            bg-accent 
            text-xl
            transform 
            transition-transform
            ${show ? 'opacity-100' : 'opacity-0'}
            md:hidden
          `}
        >
          <div className="p-2">
            <div className="flex flex-col items-end">
              <span
                onClick={showToggle}
                className="mb-3 text-3xl cursor-pointer"
              >
                <i><FaXmark /></i>
              </span>
              <hr className="w-full h-0.5 mb-2 rounded-[0.1px] bg-background"/>
            </div>

            <ul className="flex flex-col items-end gap-4">
              {Object.entries(links).map(([key, value]) => (
                !value.staff && !value.superuser && (
                  <li key={key} className="flex gap-2">
                    <span><Link to={value.link}>{key}</Link></span>
                    <span><i>{value.icon}</i></span>
                  </li>
              )))}

              {Object.entries(links).map(([key, value]) => (
                (user.is_staff && user.is_superuser) && 
                (!user.is_superuser && !value.superuser) && (
                  <li key={key} className="flex gap-2">
                    <span><Link to={value.link}>{key}</Link></span>
                    <span><i>{value.icon}</i></span>
                  </li>
              )))}

              {Object.entries(links).map(([key, value]) => (
                (user.is_staff && user.is_superuser) && 
                (user.is_superuser && value.superuser) && (
                  <li key={key} className="flex gap-2">
                    <span><Link to={value.link}>{key}</Link></span>
                    <span><i>{value.icon}</i></span>
                  </li>
              )))}

              <li onClick={logoutUser} className="flex gap-2">
                <span>Logout</span>
                <span><i className="text-2xl"><RiLogoutBoxRFill /></i></span>
              </li>
            </ul>
          </div>

          <p 
            className="text-[8px] text-right p-2 md:text-left"
          >
            Brought to you by CMO - MISO
          </p>
        </div>

        {/* TODO: Add name of system */}
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
                  ${show ? 'opacity-100' : 'opacity-0'}
              `}>
                <p className="text-sm">Citizen's Charter <br />System</p>
                <p className="text-[10px]">Lungsod ng San Pablo</p>
              </div>
            </div>

            <center>
              <hr 
                style={{ transition: "all 0.5s ease, all 0.5s ease" }} 
                className={`
                  ${show ? 'w-[95%]' : 'w-[70%]'}
                  h-0.5 
                  my-4
                  rounded-[0.1px] 
                  bg-background
                  transform 
                  transition-transform
              `}/>
            </center>

            <ul className={`
              flex
              flex-col
              text-nowrap
            `}>
              {Object.entries(links).map(([key, value]) => (
                !value.staff && !value.superuser && (
                  <li key={key}>
                    <Link to={value.link}>
                      <span 
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
                            ${show ? 'opacity-100' : 'opacity-0'}
                        `}>
                          {key}
                        </p>
                      </span>
                    </Link>
                  </li>
              )))}

              {Object.entries(links).map(([key, value]) => (
                (user.is_staff && user.is_superuser) && 
                (!user.is_superuser && !value.superuser) && (
                  <li key={key}>
                    <Link to={value.link}>
                      <span 
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
                          ${location === value.link && ('text-warning')}
                      `}>
                        <i>{value.icon}</i>
                        <p 
                          style={{ transition: "all 0.5s ease, all 0.5s ease" }} 
                          className={`
                            text-xl 
                            transform 
                            transition-transform
                            ${show ? 'opacity-100' : 'opacity-0'}
                        `}>
                          {key}
                        </p>
                      </span>
                    </Link>
                  </li>
              )))}

              {Object.entries(links).map(([key, value]) => (
                (user.is_staff && user.is_superuser) && 
                (user.is_superuser && value.superuser) && (
                  <li key={key}>
                    <Link to={value.link}>
                      <span 
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
                          ${location === value.link && ('text-warning')}
                      `}>
                        <i>{value.icon}</i>
                        <p 
                          style={{ transition: "all 0.5s ease, all 0.5s ease" }} 
                          className={`
                            text-xl 
                            transform 
                            transition-transform
                            ${show ? 'opacity-100' : 'opacity-0'}
                        `}>
                          {key}
                        </p>
                      </span>
                    </Link>
                  </li>
              )))}

              <i 
                onClick={showToggle} 
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
                {show ? (
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
            <Link to="/logout">
              <span 
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
                    ${show ? 'opacity-100' : 'opacity-0'}
                `}>
                  Logout
                </p>
              </span>
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
                  ${show ? 'opacity-100' : 'opacity-0'}
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