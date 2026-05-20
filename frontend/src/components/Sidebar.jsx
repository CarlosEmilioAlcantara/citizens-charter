import AuthContext from "../context/AuthContext";
import { useState, useContext } from "react";
import { navItems } from "../stores/navItems";
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
  const [links, _] = useState({...navItems});

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
          className="hidden p-2 text-2xl transition-all duration-500 md:block"
        >
        </div>
      </div>

      <div 
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
          transition-all
          duration-500
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
                    className={`
                      flex 
                      gap-3 
                      justify-end
                      items-center 
                      p-2
                      cursor-pointer
                      transition-all
                      duration-300
                    hover:bg-active
                    hover:text-confirm-hover
                    focus:bg-active
                    focus:text-confirm-hover
                    active:bg-active
                    active:text-confirm-hover
                      ${window.location.pathname === value.link && (
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
                    className={`
                      flex 
                      gap-3 
                      justify-end
                      items-center 
                      p-2
                      cursor-pointer
                      transition-all
                      duration-300
                    hover:bg-active
                    hover:text-confirm-hover
                    focus:bg-active
                    focus:text-confirm-hover
                    active:bg-active
                    active:text-confirm-hover
                      ${window.location.pathname === value.link && (
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
                    className={`
                      flex 
                      gap-3 
                      justify-end
                      items-center 
                      p-2
                      cursor-pointer
                      transition-all
                      duration-300
                    hover:bg-active
                    hover:text-confirm-hover
                    focus:bg-active
                    focus:text-confirm-hover
                    active:bg-active
                    active:text-confirm-hover
                      ${window.location.pathname === value.link && (
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
                className="
                  flex 
                  gap-3 
                  justify-end
                  items-center 
                  p-2
                  cursor-pointer
                  transition-all
                  duration-300
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
          transition-all
          duration-500
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
                className={`
                  flex
                  flex-col 
                  justify-center
                  items-center
                  font-bold 
                  text-center
                  tracking-wider 
                  text-nowrap
                  transition-all
                  duration-500
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
                      className={`
                        flex 
                        gap-3 
                        items-center 
                        px-4 
                        py-2
                        cursor-pointer
                        transition-all
                        duration-300
                      hover:bg-active
                      hover:text-confirm-hover
                      focus:bg-active
                      focus:text-confirm-hover
                      active:bg-active
                      active:text-confirm-hover
                        ${window.location.pathname === value.link && (
                          'bg-active text-confirm-hover'
                        )}
                    `}>
                      <i>{value.icon}</i>
                      <p 
                        className={`
                          text-xl 
                          transition-all
                          duration-500
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
                      className={`
                        flex 
                        gap-3 
                        items-center 
                        px-4 
                        py-2
                        cursor-pointer
                        transition-all
                        duration-300
                      hover:bg-active
                      hover:text-confirm-hover
                      focus:bg-active
                      focus:text-confirm-hover
                      active:bg-active
                      active:text-confirm-hover
                        ${window.location.pathname === value.link && (
                          'bg-active text-confirm-hover'
                        )}
                    `}>
                      <i>{value.icon}</i>
                      <p 
                        className={`
                          text-xl 
                          transition-all
                          duration-500
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
                      className={`
                        flex 
                        gap-3 
                        items-center 
                        px-4 
                        py-2
                        cursor-pointer
                        transition-all
                        duration-300
                      hover:bg-active
                      hover:text-confirm-hover
                      focus:bg-active
                      focus:text-confirm-hover
                      active:bg-active
                      active:text-confirm-hover
                        ${window.location.pathname === value.link && (
                          'bg-active text-confirm-hover'
                        )}
                    `}>
                      <i>{value.icon}</i>
                      <p 
                        className={`
                          text-xl 
                          transition-all
                          duration-500
                          ${state ? 'opacity-100' : 'opacity-0'}
                      `}>
                        {key}
                      </p>
                    </Link>
                  </li>
              )))}

              <i 
                onClick={toggle} 
                className="
                  cursor-pointer 
                  px-4 
                  py-2 
                  transition-all
                  duration-300
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
                    className="transition-all duration-500"
                  />
                ) : (
                  <FaChevronLeft 
                    size={24} 
                    className="scale-x-[-1] transition-all duration-500"
                  />
                )}
              </i>
            </ul>
          </div>

          <div className="flex flex-col bg-accent text-background">
            <Link to="/logout"
              onClick={logoutUser} 
              className="
                hidden  
                px-4 
                py-2
                gap-3 
                items-center 
                cursor-pointer
                transition-all
                duration-300
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
                className={`
                  text-xl 
                  transition-all
                  duration-500
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
                className={`
                  transition-all
                  duration-500
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