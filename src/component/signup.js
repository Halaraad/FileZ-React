import React from "react";
import { NavLink } from "react-router-dom";
import { toaster } from 'evergreen-ui';
import axios from  'axios';
import Cookies from 'universal-cookie';
import Context from "./context.js";

const cookies = new Cookies();

class SignUp extends React.Component {

  constructor(){
      super()
      this.state = { 
        Email:'',
        Name:"",
        Password:'',
    }
  }

  handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
      })
  }

  Register(){

    axios.post('/api/user/register', {
      email: this.state.Email,
      password: this.state.Password,
      name:this.state.Name
    })
    .then(function (response) {
      cookies.set('token', response.data, {
        path: '/',
        expires: new Date(Date.now() + 604800000)
      });

      window.location.href = '/files'
    })
    .catch(function (error) {
      if (error.response.data.code==11000) {
              toaster.danger('The email is already in use')
      } else if ( error.response.data.details[0].message) {
        toaster.danger(
          error.response.data.details[0].message
        )
      } else {
        // console.log(error)
      }
    });
  }

  render() {
  return (
    <Context.Consumer>
      {ctx => {
        return (
          <div className="authmain">
          <NavLink activeClassName="NavLink-auth" exact to ="/signup">
             <div className="authDiv">
            <React.Fragment>
         
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
                        >Register</button>
                      </form>
                      
                      <div className="linkSignUp on-signup">
                        <span>Already a member? &nbsp;</span>
                        <NavLink exact to="/signin">
                          <a href="/signin"> Sign In</a>
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
  );
};
}
export default SignUp;
