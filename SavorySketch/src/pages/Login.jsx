import React from "react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo.token) {
          localStorage.setItem("token", JSON.stringify(authInfo));
          navigate("/recipes");
        } else {
          existDialog.current.showModal();
        }
      });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={(e) => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <section>
          <h1 className="text-4xl mt-7 mb-3 font-bold text-white text-center">Savory Sketch</h1>
          <h2 className="text-xl mb-10 font-bold text-white text-center">Please sign in</h2>
        <form className="form--login flex justify-center" onSubmit={handleLogin}>
          <div className="form-area text-center bg-blue-300 p-10  border-blue-500 border-solid border-2 w-[350px]">
            <fieldset className="mb-4">
            <label htmlFor="inputusername"> UserName </label>
            <input
              type="username"
              id="inputusername"
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
              className="form-control"
              placeholder="username"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputPassword"> Password </label>
            <input
              type="password"
              id="inputPassword"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              className="form-control"
              placeholder="Password"
            />
          </fieldset>
          <fieldset>
            <button
              type="submit"
              className="button p-3 rounded-md bg-blue-800 text-blue-100"
            >
              Sign in
            </button>
          </fieldset><div className="loginLinks">
        <section className="link--register">
          <Link
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            to="/register"
          >
            Not a member yet?
          </Link>
        </section>
      </div>
          </div>
          
        </form>
      </section>
      
    </main>
  );
};