import { useState, useContext, useEffect, Suspense } from "react";
import AuthContext from "../context/AuthContext";
import Overlay from "../components/Overlay";
import Input from "../components/Input";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import useTimeout from "../utils/useTimeout";

export default function Login() {
  const [value, setValue] = useState({
    name: '',
    password: '',
  })
  const { loginUser } = useContext(AuthContext);
  const [toast, setToast] = useState(null);
  const [data, setData] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      name: value.name,
      password: value.password,
    };
    const [data, res] = await loginUser(loginData);
    setToast({ success: res.ok, message: "Login Unsuccessful" });
    setData(data);
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
            warning={Object.keys(data).includes("name") && data.name}
            type="text" 
            placeholder="Username..."
            name="name"
            value={value.name}
            setValue={setValue}
          />

          <Input 
            label="Password" 
            warning={Object.keys(data).includes("password") && data.password}
            type="password" 
            placeholder="Password..."
            name="password"
            value={value.password}
            setValue={setValue}
          />
        </div>

        <button 
          style={{ transition: "all 0.3s ease, all 0.3s ease" }} 
          className="
            w-auto
            p-2
            rounded-sm
            bg-accent 
            text-md
            text-background 
            cursor-pointer
            md:text-xl
            hover:bg-confirm-hover
            focus:bg-confirm-hover
            active:bg-confirm-hover
          ">
            Pumasok
          </button>
      </form>
      <Footer/>

      {toast && (
        <Alert 
          success={toast.success} 
          message={toast.message} 
          timeout={3000} 
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
