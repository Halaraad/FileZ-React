import React from "react";
import Context from "./context.js";
import { NavLink } from "react-router-dom";
import { toaster } from 'evergreen-ui';
import axios from  'axios';
import Cookies from 'universal-cookie';
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
  onChangeName(value){
    this.setState({
      Name: value
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
              toaster.danger(
          'The Email is Already in use'
        )
      }else if ( error.response.data.details[0].message) {
        toaster.danger(
          error.response.data.details[0].message
        )
      } else {
        console.log(error)
      }
    });
  }


  render() {
  return (
    <Context.Consumer>
      {ctx => {
        return (
          <NavLink activeClassName="NavLink-auth"  exact to="/signup">
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
                </div>
                <div className="auth">
                  <div className="Authenticate">Create Account</div>

                  <form>
                    <div className="username">
                      <i class="material-icons">account_circle</i>
                      <input type="text" placeholder="Name" 
                        onChange={(event)=>{
                        this.onChangeName(event.target.value)
                      }}/>
                    </div>
                    <div className="email">
                      <i class="material-icons">email</i>
                      <input type="text" placeholder="Email" 
                        onChange={(event)=>{
                        this.onChangeEmail(event.target.value)
                      }}/>
                    </div>
                    <div className="password">
                      <i class="material-icons">lock</i>
                      <input type="password" placeholder="Password" 
                      onChange={(event)=>{
                        this.onChangePassword(event.target.value)
                      }}/>
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
          </NavLink>
        );
      }}
    </Context.Consumer>
  );
};
}
export default SignUp;
