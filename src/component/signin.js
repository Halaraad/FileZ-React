import React from "react";
import Context from "./context.js";
import { NavLink } from "react-router-dom";

const SignIn = () => {
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
                  <div className="Authenticate">Authenticate</div>

                  <form>
                    <div className="username">
                      <i class="material-icons">account_circle</i>
                      <input type="text" placeholder="User Name" />
                    </div>
                    <div className="password">
                      <i class="material-icons">lock</i>
                      <input type="text" placeholder="Password" />
                    </div>
                    <button className="btnauth">Authenticate</button>
                  </form>

                  <div className="linkSignUp">
                    <span>Don’t have an account? </span>

                      <a href="/signup"> Sign Up</a>

                  </div>
                </div>
              </div>
            </React.Fragment>

        );
      }}
    </Context.Consumer>
  );
};

export default SignIn;
