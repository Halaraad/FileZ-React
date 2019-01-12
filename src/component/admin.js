import React from "react";
import Context from "./context.js";
import { Table, IconButton, Dialog ,Badge,Pane,Heading,toaster} from "evergreen-ui";
import usericon from '../assets/user.svg';
import Cookies from 'universal-cookie';
import Component from "@reactions/component";
import axios from "axios";
import Storge from '../assets/database.svg';
import FilesIcon from '../assets/report.svg';
import UsersIcon from '../assets/team.svg';
import Show from "./show.js";

const cookies = new Cookies();

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      Users: [],
      FilesInfo:[],
      FilesNumber:'',
      NumberOfUsers:''
    };
  }

  componentDidMount(){
    fetch(`/api/user/admin/users`, {
      credentials: "same-origin",
      headers: {
          'token': cookies.get('token')
      }
  
  })
  .then((response) => {
  
      if (response.status == 200) {
          return response.json()
      }
  
  })
  .then((data) => {
  

  
    this.setState({
      Users:data,
      NumberOfUsers:data.length
    })
      


  })
  fetch(`/api/user/admin/filesinfo`, {
    credentials: "same-origin",
    headers: {
        'token': cookies.get('token')
    }

})
.then((response) => {

    if (response.status == 200) {
        return response.json()
    }

})
.then((data) => {



  this.setState({
    FilesSizeInfo:data[0].totalFilesUplodedSize,
    FilesNumber:data[0].totalFiles,
  })



})
  }

  deleteUser(value){
    var headers = {
      'Content-Type': 'application/json',
      'token': cookies.get('token')
    }
    axios({
        url: `/api/user/admin/deleteUser/` + value,
        method: "delete",
        headers: headers
      }) .then(function (response) {
        if (response.status == 200) {
          toaster.success(
            'file has been Delete Successfully'
          )
        }
      }).catch(function (error) {
        console.log(error.request)
        console.log(error.config);
      });
    this.componentDidMount()

    console.log(value)
  }



  render() {
    return (
      <React.Fragment>
        <Show />
      <Context.Consumer>
        {ctx => {
          return (
            <React.Fragment>
              <div className="admincard">
                <div className="admincard1">Total Data Size : {(this.state.FilesSizeInfo/1000000).toFixed(2)} MB
                <img id="TotalIcons"   src={Storge} alt="Paris"/></div>
                
                <div className="admincard1">Number of Files : {this.state.FilesNumber}
                <img id="TotalIcons"   src={FilesIcon} alt="Paris"/>
                </div>
                <div className="admincard1">Total Users : {this.state.NumberOfUsers}
                <img id="TotalIcons"   src={UsersIcon} alt="Paris"/>
                
                </div>
              </div>
              <div className="admincontiner">
                <Table className="tablebody">
                  <Table.Head>
                    <Table.TextCell
                      flexBasis={65}
                      flexShrink={0}
                      flexGrow={0}
                    />
                    <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>join At</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Remaining Storage</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Package</Table.TextHeaderCell>
                    <Table.TextCell
                      flexBasis={110}
                      flexShrink={0}
                      flexGrow={0}
                    />
                  </Table.Head>
                  <Table.Body className="tablebody">
                    {this.state.Users.map(user => (
                      <Table.Row
                        key={user._id}
                      >
                        <Table.TextCell
                          flexBasis={65}
                          flexShrink={0}
                          flexGrow={0}
                        >
 
                      
                       <img id="img"   src={`http://localhost:5000/`+ user.porfileImg} alt="Paris" style={user.porfileImg != 'defaultUser.png' ? { } : {display: 'none' }}/>
                        
                        <img id="img"   src={usericon} alt="Paris" style={user.porfileImg == 'defaultUser.png' ? { } : {display: 'none' }}/>
                        </Table.TextCell>
                        <Table.TextCell>{user.name}
                        <Badge style={ctx.value.Session._id == user._id ? { } : {display: 'none' }} color="green" isSolid marginLeft={53}>You</Badge>
                        <Badge style={user.role == 1 ? { } : {display: 'none' }} color="red" isSolid marginLeft={53}>Admin</Badge>
                        <Badge style={user.role == 0 ? { } : {display: 'none' }} color="blue" isSolid marginLeft={53}>Normal</Badge>
                        </Table.TextCell>
                        <Table.TextCell>{user.uptime}</Table.TextCell>
                        <Table.TextCell>{(user.limit/1000000).toFixed(3)} MB</Table.TextCell>
                        <Table.TextCell>{user.package}</Table.TextCell>
                        <Table.TextCell
                          flexBasis={55}
                          flexShrink={0}
                          flexGrow={0}
                        >
                        </Table.TextCell>
                        <Table.TextCell
                          flexBasis={55}
                          flexShrink={0}
                          flexGrow={0}
                        >
                          <Component initialState={{ isShown: false }}>
                      {({ state, setState }) => (
                        <Pane>
                          <Dialog
                            isShown={state.isShown}
                            title="Danger "
                            intent="danger"
                            onConfirm={()=>{
                              this.deleteUser(user._id)
                              setState({ isShown: false })
                            }}
                            onCloseComplete={() => setState({ isShown: false })}
                            confirmLabel="Delete"
                          >
                            <Heading size={500} >Are you sure you want to delete this user?</Heading>
                          </Dialog>
                          <IconButton icon="trash" intent="danger" onClick={() => setState({ isShown: true })} />
                        
                        </Pane>
                      )}
                    </Component>



                         
                        </Table.TextCell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </React.Fragment>
          );
        }}
      </Context.Consumer>
      </React.Fragment>
    );
  }
}
export default Admin;
