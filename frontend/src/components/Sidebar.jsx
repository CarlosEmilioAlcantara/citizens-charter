import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Sidebar({show}) {
  const { user } = useContext(AuthContext);

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
      
        <GiHamburgerMenu size={24} className="text-background"/>
      </div>

      <div className="bg-accent">
        <ul>
          <li>link</li>
          <li>link</li>
          <li>link</li>
          <li>link</li>
          <li>link</li>
        </ul>
      </div>
    </div>
  );
}