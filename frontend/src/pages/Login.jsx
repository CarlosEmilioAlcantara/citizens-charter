import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Footer from "../components/Footer";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(AuthContext);

  const handleLogin = async () => {
    const loginData = {
      name: name,
      password: password,
    };
    loginUser(loginData);
  };

  return (
    <div
      className="
        flex
        justify-center
        items-center
        w-screen
        h-screen
        bg-[url(./assets/static/municipal-hall.jpg)] 
        bg-cover 
        bg-center
      ">
      <div
        className="
        fixed
        inset-0
        w-screen 
        h-screen 
        bg-black/60
      ">
      </div>

      <div 
        className="
          flex 
          flex-col 
          items-center
          gap-9
          w-10/12
          p-4
          rounded-sm 
          bg-background 
          shadow-2xl/95
          z-10
          md:w-2/3
          md:h-[45%]
          md:p-8
          lg:w-2/5 
        ">
        <div className="flex flex-col items-start w-full gap-5">
          <p className="text-2xl font-bold text-accent md:text-4xl">Login</p>

          <div 
            className="
              flex 
              flex-col 
              w-full
              p-2
              border 
              border-foreground 
              rounded-sm
            ">
            <label className="text-[8px] md:text-[10px]">Username</label>
            <input
              type="text"
              placeholder="Username..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-md focus:outline-none md:text-xl"
            />
          </div>

          <div 
            className="
              flex 
              flex-col 
              w-full
              p-2
              border 
              border-foreground 
              rounded-sm
            ">
            <label className="text-[8px] md:text-[10px]">Password</label>
            <input
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-md focus:outline-none md:text-xl"
            />
          </div>
        </div>

        <button 
          onClick={handleLogin}
          className="
            w-1/3
            p-2
            rounded-sm
            bg-accent 
            text-md
            hover:bg-confirm-hover
            text-background 
            md:w-1/4
            md:text-xl
          ">
            Pumasok
          </button>
      </div>
      <Footer/>
    </div>
  );
}
