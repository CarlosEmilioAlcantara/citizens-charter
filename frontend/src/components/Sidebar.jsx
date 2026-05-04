import { useState, useContext } from "react";
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
import Overlay from "./Overlay";

export default function Sidebar() {
  const { user, logoutUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);

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

  return(
    <>
      <Overlay show={show} />
      <div className={`
        w-screen 
      text-background
        bg-accent 
        md:fixed
        md:left-0
        md:flex
        md:flex-col
        md:justify-between
        ${show ? 'md:items-start' : 'md:items-center'}
        ${show ? 'md:w-1/4' : 'md:w-1/12'}
        md:h-screen
        ${show && ('md:z-10')}
      `}>
        <div className="
          flex 
          justify-between 
          items-center 
          p-2 
          md:flex-col 
          md:gap-5 
          md:hidden
        ">
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
      
          <i 
            onClick={showToggle}
            className="cursor-pointer"
          >
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
            <div className="flex flex-col items-end md:items-start">
              <span
                onClick={showToggle}
                className="mb-3 text-3xl cursor-pointer"
              >
                <i><FaXmark /></i>
              </span>
              <hr className="w-full h-0.5 mb-2 rounded-[0.1px] bg-background"/>
            </div>

            <ul className="flex flex-col items-end gap-4 md:items-start">
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

        <div className="flex flex-col p-2 text-2xl">
          <ul className="flex flex-col items-end gap-4 md:items-start">
            {Object.entries(links).map(([key, value]) => (
              !value.staff && !value.superuser && (
                <li key={key}>
                  <span className="flex gap-2">
                    <i>{value.icon}</i>
                    <p className="hidden text-xl md:block">{key}</p>
                  </span>
                </li>
            )))}

            {Object.entries(links).map(([key, value]) => (
              (user.is_staff && user.is_superuser) && 
              (!user.is_superuser && !value.superuser) && (
                <li key={key}>
                  <span className="flex gap-2">
                    <i>{value.icon}</i>
                    <p className="hidden text-xl md:block">{key}</p>
                  </span>
                </li>
            )))}

            {Object.entries(links).map(([key, value]) => (
              (user.is_staff && user.is_superuser) && 
              (user.is_superuser && value.superuser) && (
                <li key={key}>
                  <span className="flex gap-2">
                    <i>{value.icon}</i>
                    <p className="hidden text-xl md:block">{key}</p>
                  </span>
                </li>
            )))}
          </ul>
        </div>
        <span onClick={logoutUser} className="hidden p-2 md:block">
          <i className="text-2xl"><RiLogoutBoxRFill /></i>
        </span>
      </div>
    </>
  );
}