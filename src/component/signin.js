import React from "react";
import Context from "./context.js";
import { NavLink } from "react-router-dom";
import { toaster } from 'evergreen-ui';

import axios from  'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class SignIn extends React.Component {

  constructor(){
      super()
      this.state = { 
        Email:'',
        Password:'',
    }
  }


  onChangeEmail(value){
    this.setState({
      Email: value
    })
  }
  onChangePassword(value){
    this.setState({
      Password: value
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

          toaster.danger(
            'please check your email address and password and try again '
          )


        }
      });

  }

  render() {
  return (
    <Context.Consumer>
      {ctx => {
        return (
          <NavLink activeClassName="NavLink-auth"  exact to="/signin">
            <React.Fragment>
              <div className="mainSignIn">
                <div className="leftside">
                  <div className="logoSignin"><img width="350" src={require("../assets/home.png")} /></div>
                  <div className="namelogo">Filez</div>
                  <img
                    className="line"
                    src={require("../assets/line.png")}
                    alt=""
                  />
                  <div className="desclogo">Keep your files online.</div>
                  <div className="icons-container">
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
                  </div>
                  {/* <img
                    className="linev"
                    src={require("../assets/Linev.png")}
                    alt=""
                  /> */}
                </div>
                <div className="auth">
                  <div className="Authenticate">Authenticate</div>

                  <form>
                    <div className="username">
                      <i class="material-icons icons">mail</i>
                      <input type="email" placeholder="Email" 
                        onChange={(event)=>{
                        this.onChangeEmail(event.target.value)
                      }}/>
                    </div>
                    <div className="password">
                      <i class="material-icons icons">lock</i>
                      <input type="password" placeholder="Password" 
                        onChange={(event)=>{
                        this.onChangePassword(event.target.value)
                      }}/>
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
          </NavLink>
        );
      }}
    </Context.Consumer>
  )
}
}

export default SignIn;
