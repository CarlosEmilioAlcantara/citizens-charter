import { Link } from "react-router-dom"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";

export default function NavbarDesktop({ 
  state, 
  toggle, 
  links, 
  user, 
  logoutUser 
}) {
  return(
    <div 
      className={`
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
        ${state ? 'md:w-55' : 'md:w-15'}
        z-30
    `}>
      <div 
        className="
          flex 
          flex-col 
          w-full
          text-2xl 
          justify-between 
          h-screen 
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
  );
}