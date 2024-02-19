import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loginAsync,
  selectCount,
  secureAsync,
  message,
  registerAsync,
  logOut,
  unsecureAsync,
} from "./loginSlice";
import { jwtDecode } from "jwt-decode";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const Mymessage = useSelector(message);
  const [servMsg, setservMsg] = useState(Mymessage);
  const logged = useSelector(selectCount);
  const dispatch = useDispatch();

  useEffect(() => {
    setMsg(
      logged
        ? `welcome mr. ${
            jwtDecode(sessionStorage.getItem("access")).username
          } you logged in`
        : "please log in"
    );
  }, [logged]);

  useEffect(() => {
    setservMsg(Mymessage);
  }, [Mymessage]);

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            dispatch(loginAsync({ username: username, password: password }))
          }
        >
          Login
        </button>
        {"      "}
        <button
          type="button"
          className="btn btn-info"
          onClick={() =>
            dispatch(registerAsync({ username: username, password: password }))
          }
        >
          Register
        </button>
        {"   "}
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => dispatch(logOut())}
        >
          Log Out
        </button>
      </form>
      <h3>{msg}</h3>
      <br />
      <br />
      <div>
        <button
          className="btn btn-success"
          onClick={() => dispatch(unsecureAsync())}
          style={{ marginLeft: "7px" }}
        >
          open
        </button>
        <button
          className="btn btn-info"
          style={{ marginLeft: "7px" }}
          onClick={() => dispatch(secureAsync())}
        >
          secure
        </button>
        <br />
        <h2>{servMsg}</h2>
      </div>
    </div>
  );
}
