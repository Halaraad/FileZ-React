import React from "react";
import { NavLink } from "react-router-dom";
import { toaster } from 'evergreen-ui';
import axios from  'axios';
import Cookies from 'universal-cookie';
import Context from "./context.js";

const cookies = new Cookies();

class SignIn extends React.Component {

  constructor(){
      super()
      this.state = { 
        Email:'',
        Password:'',
    }
  }

  handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
      })
  }

  Login() {

    axios.post('/api/user/login', {
        email: this.state.Email,
        password: this.state.Password
      })
      .then(function (response) {
        cookies.set('token', response.data, {
          path: '/',
          expires: new Date(Date.now() + 604800000)
        });
        window.location.href = '/files'
      })
      .catch(function (error) {
        if (error.response) {
          toaster.danger('Please check your email and password then try again')
        }
      });
  }

  render() {
  return (
    <Context.Consumer>
      {ctx => {
        return (
          <div className="authmain">
          <NavLink activeClassName="NavLink-auth" exact to ="/signin">
          <div className="authDiv">
            <React.Fragment >
              <div className="mainSignIn">
                <div className="leftside">
                <div className="logoSignin"><img width="350" src="/assets/images/home.png" /></div>
                  <div className="namelogo">Filez</div>
                  <img
                    className="line"
                    src="/assets/images/line.png"
                    alt=""
                  />
                  <div className="desclogo">Keep your files online.</div>
                  <div className="icons-container">
                    {/* <img
                      className="info"
                      src="/assets/images/facebook.png"
                      alt="facebook"
                    />
                    <img
                      className="msg"
                      src="/assets/images/email.png"
                      alt="email"
                    /> */}
                  </div>
                </div>
                <div className="auth">
                  <div className="Authenticate">Authenticate</div>

                  <form className="authform"> 
                    <div className="email">
                      <input type="email" placeholder="Email" name="Email"
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
                    onClick={this.Login.bind(this)}
                    >Authenticate</button>
                  </form>

                  <div className="linkSignUp">
                    <span>Don’t have an account? &nbsp;</span>
                    <NavLink exact to="/signup">
                      <a href="/signup"> Sign Up</a>
                    </NavLink>
                  </div>
                </div>
              </div>
            </React.Fragment>
            </div>
          </NavLink>
          </div>
        );
      }}
    </Context.Consumer>
  )
}
}

export default SignIn;