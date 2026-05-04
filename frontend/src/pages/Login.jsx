import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Overlay from "../components/Overlay";
import Input from "../components/Input";
import Footer from "../components/Footer";

export default function Login() {
  const [value, setValue] = useState({
    name: '',
    password: '',
  })
  const { loginUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      name: value.name,
      password: value.password,
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
      <Overlay show={true} />

      <form
        onSubmit={handleLogin}
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

          <Input 
            label="Username" 
            type="text" 
            placeholder="Username..."
            name="name"
            value={value.name}
            setValue={setValue}
          />

          <Input 
            label="Password" 
            type="password" 
            placeholder="Password..."
            name="password"
            value={value.password}
            setValue={setValue}
          />
        </div>

        <button 
          className="
            w-auto
            p-2
            rounded-sm
            bg-accent 
            text-md
            hover:bg-confirm-hover
            text-background 
            cursor-pointer
            md:text-xl
          ">
            Pumasok
          </button>
      </form>
      <Footer/>
    </div>
  );
}
