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
import Overlay from "./Overlay";

export default function Sidebar() {
  const { user } = useContext(AuthContext);
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
    <div className="bg-accent">
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center gap-2">
          <img src="/spc-logo.png" className="w-10"/>
          <img src="/bagong-pilipinas.png" className="w-10"/>

          <div 
            className="
              flex 
              flex-col 
              text-[10px]
              font-bold 
            text-background
              tracking-wider 
              md:flex-row
              md:text-lg
              md:gap-1
              lg:text-xl
          ">
            <p>Citizen's Charter System</p>
            <span className="hidden md:block">-</span> 
            <p>Lungsod ng San Pablo</p>
          </div>
        </div>
     
        <i 
          onClick={showToggle}
          className="text-background cursor-pointer"
        >
          <GiHamburgerMenu size={24}/>
        </i>
      </div>

      <Overlay show={show} />

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
          text-background
          transform 
          transition-transform
          ${show ? 'opacity-100' : 'opacity-0'}
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

          <ul className="flex flex-col items-end gap-4 ">
            {Object.entries(links).map(([key, value]) => (
              !value.staff && !value.superuser && (
                <li key={key} className="flex items-center gap-2">
                  <span><Link to={value.link}>{key}</Link></span>
                  <span><i>{value.icon}</i></span>
                </li>
              )
            ))}

            {Object.entries(links).map(([key, value]) => (
              (user.is_staff && user.is_superuser) && 
              (!user.is_superuser && !value.superuser) && (
                <li key={key} className="flex items-center gap-2">
                  <span><Link to={value.link}>{key}</Link></span>
                  <span><i>{value.icon}</i></span>
                </li>
              )
            ))}

            {Object.entries(links).map(([key, value]) => (
              (user.is_staff && user.is_superuser) && 
              (user.is_superuser && value.superuser) && (
                <li key={key} className="flex items-center gap-2">
                  <span><Link to={value.link}>{key}</Link></span>
                  <span><i>{value.icon}</i></span>
                </li>
              )
            ))}
          </ul>
        </div>

        <p 
          className="text-[8px] text-right p-2"
        >
          Brought to you by CMO - MISO
        </p>
      </div>
    </div>
  );
}