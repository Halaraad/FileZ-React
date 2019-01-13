import React, { Component } from "react";
import Context from "./component/context.js";
import Trash from "./component/trash";
import Admin from "./component/admin";
import MyFiles from "./component/myFile";
import signin from "./component/signin";
import signup from "./component/signup";
import Home from "./component/home";
import { BrowserRouter, Route } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
class App extends Component {
  constructor() {
    super();
    this.state = {
      Session: [],
      isLogin:'',
      FolderIdCheck: "",
      Packagefree: "",
      packageSize: ""
    };
  }

  componentDidMount() {
    fetch(`/api/user/checklogin/`, {
      credentials: "same-origin",
      headers: {
        token: cookies.get("token")
      }
    })
      .then(response => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then(data => {
        if (data) {
          if (data[1]) {
            //calculate limit for
            let packageSize;
            var limit = data[1].sesson.limit;
            if (data[1].sesson.package == "free") {
              packageSize = 100000000;
            } else if (data[1].sesson.package == "economic") {
              packageSize = 1000000000;
            } else if (data[1].session.package == "standard") {
              packageSize = 10000000000;
            } else if (data[1].session.package == "business") {
              packageSize = 100000000000;
            }
  
            var free = packageSize - limit;
            var rate = free / packageSize;
            var packagefree = rate * 100;
  
            this.setState({
              isLogin: data[0].auth,
              Session: data[1].sesson,
              Packagefree: packagefree,
              PackageSize: packageSize
            });
  
          }else{
            this.setState({
              isLogin: data.auth,
            });
         
          }
      console.log(this.state.isLogin) 
        } 
       
      });
  }

  render() {
    return (
      <BrowserRouter>
        <Context.Provider value={{ value: this.state, actions: {} }}>
          {/* <Show /> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/files" component={MyFiles} />
          <Route exact path="/Trash" component={Trash} />
          <Route exact path="/admin"  component={Admin} />
          <Route exact path="/signup"  component={signup} />
          <Route exact path="/signin"  component={signin} />
          
        </Context.Provider>
      </BrowserRouter>
    );
  }
}
export default App;
