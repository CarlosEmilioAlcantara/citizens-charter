import { 
  FaHome, 
  FaChartBar, 
  FaAddressBook, 
  FaUsers, 
  FaDatabase,
} from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6"
import { IoDocumentTextSharp } from "react-icons/io5";
import { HiBuildingOffice, HiBuildingOffice2 } from "react-icons/hi2";
import { ImBooks } from "react-icons/im";
import { TbWritingFilled } from "react-icons/tb";

export const navItems = {
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
    "superuser": false,
  },
  "Offices": {
    "link": "/offices",
    "icon": <HiBuildingOffice />,
    "staff": true,
    "superuser": false,
  },
  "Positions": {
    "link": "/positions",
    "icon": <FaAddressBook />,
    "staff": true,
    "superuser": false,
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
    "superuser": false,
  },
  "Admin Audit": {
    "link": "/admin-audit",
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
}