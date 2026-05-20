import { Link } from "react-router-dom"
import { FaXmark } from "react-icons/fa6"
import { RiLogoutBoxRFill } from "react-icons/ri";

export default function NavbarMobile({ 
  state, 
  toggle, 
  links, 
  user, 
  logoutUser,
}) {
  return(
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
  );
}