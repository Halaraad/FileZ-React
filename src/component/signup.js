import React from "react";
import { toaster,Pane } from "evergreen-ui";
import axios from "axios";
import Cookies from "universal-cookie";
import Context from "./context.js";
import MyFiles from "./myFiles";
const cookies = new Cookies();

var host="http://localhost:5000/"
class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      Email: "",
      Name: "",
      Password: ""
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  Register(event) {
    event.preventDefault();
    axios.post(host+`api/user/register`, {
        email: this.state.Email,
        password: this.state.Password,
        name: this.state.Name
      })
      .then(function(response) {
        cookies.set("token", response.data, {
          path: "/",
          expires: new Date(Date.now() + 604800000)
        });
        window.location.href = "/files";
      })
      .catch(function(error) {
        if (error.response.data.code == 11000) {
          toaster.danger("The email is already in use");
        } else if (error.response.data.details[0].message) {
          toaster.danger(error.response.data.details[0].message);
        } else {
          // console.log(error)
        }
      });
  }

  render() {
    return (
      <Context.Consumer>
        {ctx => {
          if (ctx.value.isLogin == "login") {
            return (
              <MyFiles/>
            );
          } else if (ctx.value.isLogin == "notLogin") {
            return (
              <div className="authmain">
                  <div className="authDiv">
                    <React.Fragment>
                      <div className="mainSignIn">
                        <div className="leftside">
                          <div className="logoSignin">
                            <img width="350" src="/assets/images/home.png" />
                          </div>
                          <div className="namelogo">Filez</div>
                          <img className="line" src="/assets/images/line.png" alt="" />
                          <div className="desclogo">Keep your files online.</div>
                          <div className="icons-container">
                          </div>
                        </div>
                        <div className="auth">
                          <div className="Authenticate">Create Account</div>
                          <form className="authform">
                            <div className="username">
                              <input type="text" placeholder="User Name" name="Name"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.Name}
                              />
                            </div>
                            <div className="email">
                              <input type="text" placeholder="Email" name="Email"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.Email}
                              />
                            </div>
                            <div className="password">
                              <input type="password" placeholder="Password" name="Password"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.Password}
                              />
                            </div>
                            <button className="btnauth"
                              onClick={this.Register.bind(this)}
                            >
                              Register
                            </button>
                          </form>
                          <div className="linkSignUp on-signup">
                            <span>Already a member? &nbsp;</span>
                              <a href="/signin"> Sign In</a>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  </div>
              </div>
            );
          } else{
            return (
              <Pane id="DivSpinner" display="flex" alignItems="center" justifyContent="center">
                <img src="/assets/images/loading.gif" />
              </Pane>
            );
          }


        }}
      </Context.Consumer>
    );
  }
}
export default SignUp;