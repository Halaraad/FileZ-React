import React from "react";
import Context from "./context.js";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  return (
    <Context.Consumer>
      {ctx => {
        return (
            <React.Fragment>
              <div className="mainSignIn">
                <div>
                  <div className="logoSignin" />
                  <div className="namelogo">Filez</div>
                  <img
                    className="line"
                    src={require("../assets/line.png")}
                    alt=""
                  />
                  <div className="desclogo">Keep your files online.</div>
                  <img
                    className="info"
                    src={require("../assets/info.png")}
                    alt=""
                  />
                  <img
                    className="msg"
                    src={require("../assets/msg.png")}
                    alt=""
                  />
                  <img
                    className="linev"
                    src={require("../assets/Linev.png")}
                    alt=""
                  />
                </div>
                <div className="auth">
                  <div className="Authenticate">Create Account</div>

                  <form>
                    <div className="username">
                      <i class="material-icons">account_circle</i>
                      <input type="text" placeholder="User Name" />
                    </div>
                    <div className="email">
                      <i class="material-icons">email</i>
                      <input type="text" placeholder="Email" />
                    </div>
                    <div className="password">
                      <i class="material-icons">lock</i>
                      <input type="text" placeholder="Password" />
                    </div>
                    <button className="btnauth">Register</button>
                  </form>
                </div>
              </div>
            </React.Fragment>
        );
      }}
    </Context.Consumer>
  );
};

export default SignUp;
