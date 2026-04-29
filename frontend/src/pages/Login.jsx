import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

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
          bg-background 
          w-[30%] 
          h-[40%] 
          rounded-sm 
          z-10
        ">
        <div>
          <p className="font-bold text-accent">Login</p>

          <div>
            <label>Username</label>
            <input
              type="text"
              placeholder="Username..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
