import { Context } from "../context";
import { useRouter } from "next/router";
import { useContext } from "react";
import axios from "axios";

export default function Login() {
  const { username, setUsername, password, setPassword, userLocation } =
    useContext(Context);
  const router = useRouter();
  function onSubmit(e) {
    e.preventDefault();
    if (username.length === 0 || password.length === 0) return;
    router.push("/chat");
  }
  return (
    <div>
      <div className="fixed top-1/3 left-1/3 bg-slate-700 h-1/3 w-1/3 text-center text-white rounded-2xl space-y-3 p-5">
        <h1 className="text-2xl font-bold">NextJS Chat App</h1>
        <form
          className="space-y-5 justify-center items-center"
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="">
            <input
              className="bg-slate-700 border-0 border-b-2 border-purple-500"
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              className="bg-slate-700 border-0 border-b-2 border-purple-500"
              placeholder="Password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button type="submit" className="bg-purple-500 p-2 rounded">
            Login / Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
