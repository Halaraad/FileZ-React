import React from "react";
import Context from "./context.js";
import {
  Pane,
  Dialog,
  Button,
  Select,
  Table,
  IconButton,
  Heading,
  Popover,
  Menu,
  Position,
  Spinner,
  Radio,
  toaster,
  Autocomplete,
  TextInput,
} from "evergreen-ui";
import Component from "@reactions/component";
import "react-alice-carousel/lib/alice-carousel.css";
import styled from "styled-components";
import PDFIcon from "../assets/pdf.svg";
import FileIcon from "../assets/file.svg";
import videoIcon from "../assets/video-file.svg";
import FolderIcon from "../assets/folder (2).png";
import ItemsCarousel from "react-items-carousel";
import Cookies from "universal-cookie";
import Openfolder from "../assets/openfolder.png";
import Show from "./sideBar.js";
import axios from "axios";
import UserIcon from '../assets/user.svg';
import Login from "./signin";
import l from '../assets/d.gif';
import { Grid, Row,Col} from 'react-bootstrap';

const cookies = new Cookies();
var FolderIdCheck;
var iconbuffer;
var SelectFolderOnUpload;
var searchCheck;

let ModelPlan = styled.div`
  color: #7e87a1;
  font-family: Roboto;
  background-color: white;
  height: 400px;
  width: 530px;
`;
let ModelCard1 = styled.div`
  background-color: #f4f5fa;
  height: 160px;
  width: 200px;
  margin-left: 30px;
  margin-top: 15px;
  box-shadow: 2px 2px 10px #b3adad;
  position: absolute;
  border: 0px;
  border-radius: 10px;
`;
let ModelCard2 = styled.div`
  background-color: #f4f5fa;
  height: 160px;
  width: 200px;
  margin-left: 290px;
  margin-top: 15px;
  box-shadow: 2px 2px 10px #b3adad;
  position: absolute;
  border: 0px;
  border-radius: 10px;
`;
let ModelCard3 = styled.div`
  background-color: #f4f5fa;
  height: 160px;
  width: 200px;
  margin-left: 30px;
  margin-top: 230px;
  box-shadow: 2px 2px 10px #b3adad;
  position: absolute;
  border: 0px;
  border-radius: 10px;
`;
let ModelCard4 = styled.div`
  background-color: #f4f5fa;
  height: 160px;
  width: 200px;
  margin-left: 290px;
  margin-top: 230px;
  box-shadow: 2px 2px 10px #b3adad;
  position: absolute;
  border: 0px;
  border-radius: 10px;
`;
let ViewContent = styled.div`
  color: #7e87a1;
  font-family: Roboto;
  z-index: 9;
  background-color: #f4f5fa;
  height: 130px;
  width: 78%;
  position: absolute;
  margin-left: 250px;
  margin-top: 156px;
`;

class MyFiles extends React.Component {
  constructor() {
    super();
    this.state = {
      activeItemIndex: 0,
      children: "",
      Files: [],
      UnFilterFiles: [],
      Folders: [],
      FileNames: "",
      search: "",
    };
  }

  componentDidMount(FolderIdCheck) {
    if (!FolderIdCheck) {
      fetch(`/api/files/`, {
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
            this.setState({
              Files: data[0].data,
              UnFilterFiles: data[0].data,
            });
          }

          console.log(this.state.Files);

          let fileNames = [];
          for (let i = 0; i < this.state.Files.length; i++) {
            fileNames.push(this.state.Files[i].name);
          }
          this.setState({
            FileNames: fileNames
          });
          console.log(this.state.FileNames);
        });
    } else {
      fetch(`/api/files/folder/` + FolderIdCheck, {
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
            this.setState({
              Files: data,
              UnFilterFiles: data
            });
            FolderIdCheck = "";
          }
        });
    }

    fetch(`/api/folder/`, {
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
          this.setState({
            Folders: data
          });
        }
      });
  }
  MoveTOTrash(value) {
    var headers = {
      "Content-Type": "application/json",
      token: cookies.get("token")
    };

    axios({
      url: `/api/files/bin/add/` + value,
      method: "POST",
      headers: headers
    })
      .then(function(response) {
        if (response.status == 200) {
          toaster.success("Folder has been Move To Trash Successfully");
        }
      })
      .catch(function(error) {
        console.log(error.request);

        // if (error.response.data.details[0].message) {
        //     toaster.danger(
        //         error.response.data.details[0].message
        //     )
        // } else if (error.request) {
        //     console.log(error.request);
        // } else {

        //     console.log('Error', error.message);
        // }
        console.log(error.config);
      });
    this.componentDidMount();
  }
  filterFiles(value) {
    //sort by name
    if (value == "Name") {
      let sort = this.state.Files;
      sort.sort(function(a, b) {
        return a.name.localeCompare(b.name);
      });
      this.setState({
        Files: sort
      });
      //sort size
    } else if (value == "Size") {
      let sort = this.state.Files;
      sort.sort(function(a, b) {
        var fileA = a.size;
        var fileb = b.size;
        return fileA > fileb ? -1 : fileA < fileb ? 1 : 0;
      });
      this.setState({
        Files: sort
      });
      //filter by images
    } else if (value == "images") {
      let sort = this.state.Files;
      const result = sort.filter(sort => sort.type == "image");
      this.setState({
        Files: result
      });
      //filter by PDF
    } else if (value == "PDF") {
      let sort = this.state.Files;
      const result = sort.filter(sort => sort.type == "application/pdf");
      this.setState({
        Files: result
      });
      //filter by Videos
    } else if (value == "Videos") {
      let sort = this.state.Files;
      const result = sort.filter(sort => sort.type == "video");
      this.setState({
        Files: result
      });
      // filter other type
    } else if (value == "other_Files") {
      let sort = this.state.Files;
      const result = sort.filter(
        sort =>
          sort.type != "image" &&
          sort.type != "application/pdf" &&
          sort.type != "video"
      );
      this.setState({
        Files: result
      });
    } else if (value == "all") {
      let all = this.state.UnFilterFiles;
      this.setState({
        Files: all
      });
    } else {
      let sort = this.state.Files;
      let obj = [sort.find(o => o.name === value)];
      this.setState({
        Files: obj
      })
      console.log(value);
    }
  }

  OnFolderClicked(value) {
    this.changeFoldericon();
    document.getElementById(`${value}`).src = `${Openfolder}`;
    document.getElementById(`${value}`).id = "Openfolder";
    iconbuffer = value;
    FolderIdCheck = value;
    this.componentDidMount(FolderIdCheck);
    document.getElementById("undoFolder").style.display = "flex";
  }

  changeFoldericon() {
    if (document.getElementById("Openfolder")) {
      document.getElementById("Openfolder").src = `${FolderIcon}`;
      document.getElementById("Openfolder").id = iconbuffer;
    }
  }
  changeActiveItem = activeItemIndex => this.setState({ activeItemIndex });

  MoveTOFolder(value) {
    let formData = new FormData();
    var headers = {
      "Content-Type": "application/json",
      token: cookies.get("token")
    };
    formData.append("folder", SelectFolderOnUpload);
    axios({
      url: `/api/files/move/` + value,
      method: "POST",
      data: formData,
      headers: headers
    })
      .then(function(response) {
        if (response.status == 200) {
          toaster.success("file has been  moved Successfully");
        }
      })
      .catch(function(error) {
        console.log(error.request);

        // if (error.response.data.details[0].message) {
        //     toaster.danger(
        //         error.response.data.details[0].message
        //     )
        // } else if (error.request) {
        //     console.log(error.request);
        // } else {

        //     console.log('Error', error.message);
        // }
        console.log(error.config);
      });
    this.componentDidMount();
  }

  render() {
 
    return (
        <div>
        
      <Context.Consumer>
    
        {ctx => {
          if (ctx.value.isLogin=='login') {
            return (
              <React.Fragment>
                     <Show /> 
                <header className="header">
                  <div className="divSearch">
                    <img
                      className="imgSearch"
                      src={require("../assets/search.png")}
                      alt=""
                    />
  
                    {/* <input type="text" placeholder="Search on FileZ" /> */}
                    <Autocomplete
                    title="Search"
                    onChange={(changedItem) => {
                      this.filterFiles(changedItem)
                    }}
                    items={this.state.FileNames}
                  >
                    {(props) => {
                      const { getInputProps, getRef, inputValue } = props
                      return (
                        <TextInput
                          placeholder="Search on FileZ"
                          value={inputValue}
                          innerRef={getRef}
                          marginLeft={60}
                          {...getInputProps()}
                        />
                      )
                    }}
                  </Autocomplete>
                  <IconButton
                  id="seachUndo"
                  marginLeft={437}
                  marginTop={-40}
                  onClick={()=>{
                    this.filterFiles('all')
                    
                  }}icon="cross"
                   intent="info" />
                  </div>
                  <div className="chooseplane" id="chooseplane">
                    <Component initialState={{ isShown: false }}>
                      {({ state, setState }) => (
                        <Pane>
                          <Dialog
                            isShown={state.isShown}
                            onCloseComplete={() => setState({ isShown: false })}
                            hasFooter={true}
                            hasHeader={false}
                          >
                            <ModelPlan>
                              <form>
                                <ModelCard1>
                                  <p className="cardname">Free</p>
                                  <label className="container">
                                    <span className="MB">100 MB</span>
                                    <Radio
                                      checked
                                      name="group"
                                      label="Radio default"
                                    />
                                  </label>
                                </ModelCard1>
                                <ModelCard2>
                                  <p className="cardname">Economic</p>
                                  <label className="container">
                                    <span className="MB">1 GB</span>
                                    <Radio
                                      checked
                                      name="group"
                                      label="Radio default"
                                    />
                                  </label>
                                </ModelCard2>
                                <ModelCard3>
                                  <p className="cardname">Standard</p>
                                  <label className="container">
                                    <span className="MB">10 GB</span>
                                    <Radio
                                      checked
                                      name="group"
                                      label="Radio default"
                                    />
                                  </label>
                                </ModelCard3>
                                <ModelCard4>
                                  <p className="cardname">Business</p>
                                  <label className="container">
                                    <span className="MB">100 GB</span>
                                    <Radio
                                      checked
                                      name="group"
                                      label="Radio default"
                                    />
                                  </label>
                                </ModelCard4>
                              </form>
                            </ModelPlan>
                          </Dialog>
  
                          <Button
                            marginRight={16}
                            width={120}
                            height={30}
                            appearance="minimal"
                            iconBefore="trending-up"
                            onClick={() => setState({ isShown: true })}
                          >
                            choose Plane
                          </Button>
                        </Pane>
                      )}
                    </Component>
                  </div>
                  <div className="userimg">
                    <div class="dropdown">
                      <span>
                      <img id="profileImg" src={UserIcon} 
                       style={ctx.value.Session.porfileImg == "defaultUser.png" ||
                       ctx.value.Session.porfileImg == ""  ? {  } : {display: "none"} }/>
                        <img id="profileImg"
                       style={ctx.value.Session.porfileImg == "defaultUser.png" ||
                       ctx.value.Session.porfileImg == ""  ? { display: "none" } : {} } src={`http://localhost:5000/`+ ctx.value.Session.porfileImg}/>
                      </span>
                      <div class="dropdown-content">
                        <span>{ctx.value.Session.email}</span>
                        <span>
                          <Button
                            marginRight={10}
                            appearance="primary"
                            intent="danger"
                            onClick={()=>{
                              cookies.remove('token')
                              document.location.href = "/";
                            }}
                          
                          >
                            Logout
                          </Button>
                        </span>
                      </div>
                    </div>
                  </div>
                </header>
                <ViewContent>
                  <div className="foldersName">Folders</div>
                  <div>
                    <ItemsCarousel
                      id="arrow"
                      // Placeholder configurations
                      enablePlaceholder
                      numberOfPlaceholderItems={12}
                      minimumPlaceholderTime={1000}
                      // Carousel configurations
                      numberOfCards={8}
                      gutter={12}
                      showSlither={true}
                      firstAndLastGutter={true}
                      freeScrolling={false}
                      // Active item configurations
                      requestToChangeActive={this.changeActiveItem}
                      activeItemIndex={this.state.activeItemIndex}
                      activePosition={"center"}
                      chevronWidth={24}
                      rightChevron={">"}
                      leftChevron={"<"}
                      outsideChevron={true}
                    >
                      {this.state.Folders.map(Folder => (
                        <div key={Folder._id}>
                          <div>
                            <img
                              onClick={evnt => {
                                this.OnFolderClicked(Folder._id);
                                // console.log(Folder._id)
                              }}
                              id={Folder._id}
                              className="folderImg"
                              alt=""
                              height="75px;"
                              // style={file.type == 'video' ? { } : {display: 'none' }}
                              src={FolderIcon}
                            />
                          </div>
                          <div>
                            <span id="folderName"> {Folder.name}</span>
                          </div>
                        </div>
                      ))}
                    </ItemsCarousel>
                  </div>
                </ViewContent>
                {/* /////////////////////////// */}
                <div className="table">
                  <div className="Files">
                    <Popover
                      position={Position.BOTTOM_LEFT}
                      content={
                        <Menu>
                          <Menu.Group title="All Files ">
                            <Menu.Item
                              icon="projects"
                              onClick={() => {
                                this.filterFiles("all");
                              }}
                            >
                              all Files
                            </Menu.Item>
                          </Menu.Group>
                          <Menu.Divider />
                          <Menu.Group title="Sort By ">
                            <Menu.Item
                              icon="sort-alphabetical"
                              onClick={() => {
                                this.filterFiles("Name");
                              }}
                            >
                              Name
                            </Menu.Item>
                            <Menu.Item
                              icon="sort-asc"
                              onClick={() => {
                                this.filterFiles("Size");
                              }}
                            >
                              Size
                            </Menu.Item>
                          </Menu.Group>
                          <Menu.Divider />
                          <Menu.Group title="Filter File by">
                            <Menu.Item
                              icon="media"
                              onClick={() => {
                                this.filterFiles("images");
                              }}
                            >
                              images files
                            </Menu.Item>
                            <Menu.Item
                              icon="print"
                              onClick={() => {
                                this.filterFiles("PDF");
                              }}
                            >
                              PDF Files
                            </Menu.Item>
                            <Menu.Item
                              icon="video"
                              onClick={() => {
                                this.filterFiles("Videos");
                              }}
                            >
                              Videos Files
                            </Menu.Item>
                            <Menu.Item
                              icon="paperclip"
                              onClick={() => {
                                this.filterFiles("other_Files");
                              }}
                            >
                              other Files
                            </Menu.Item>
                          </Menu.Group>
                        </Menu>
                      }
                    >
                      <Button marginRight={16} iconAfter="caret-down">
                        Files
                      </Button>
                    </Popover>
  
                    <IconButton
                      id="undoFolder"
                      icon="undo"
                      intent="success"
                      onClick={() => {
                        if (document.getElementById("Openfolder")) {
                          document.getElementById(
                            "Openfolder"
                          ).src = `${FolderIcon}`;
                          document.getElementById("Openfolder").id = iconbuffer;
                        }
                        iconbuffer = "";
                        FolderIdCheck = "";
                        this.componentDidMount(FolderIdCheck);
                        document.getElementById("undoFolder").style.display =
                          "none";
                      }}
                    />
                  </div>
  
                  <Table id='table'>
                    <Table.Head>
                      <Table.TextCell
                        flexBasis={65}
                        flexShrink={0}
                        flexGrow={0}
                      />
                      <Table.TextHeaderCell marginLeft={20}>
                        Name
                      </Table.TextHeaderCell>
                      <Table.TextHeaderCell marginLeft={20}>
                        Uploaded At
                      </Table.TextHeaderCell>
                      <Table.TextHeaderCell>File Size</Table.TextHeaderCell>
                      <Table.TextCell
                        flexBasis={110}
                        flexShrink={0}
                        flexGrow={0}
                      />
                    </Table.Head>
                    <Table.Body height={538}>
                      {this.state.Files.map(file => (
                        <Table.Row key={file._id} isSelectable height={60}>
                          <Table.TextCell
                            flexBasis={80}
                            flexShrink={0}
                            flexGrow={0}
                          >
                            <img
                              id="img"
                              src={videoIcon}
                              alt="Paris"
                              style={
                                file.type == "video" ? {} : { display: "none" }
                              }
                            />
                            <img
                              id="img"
                              src={FileIcon}
                              alt="Paris"
                              style={
                                file.type == "application/pdf" ||
                                file.type == "image" ||
                                file.type == "video"
                                  ? { display: "none" }
                                  : {}
                              }
                            />
                            <img
                              id="img"
                              src={PDFIcon}
                              alt="Paris"
                              style={
                                file.type == "application/pdf"
                                  ? {}
                                  : { display: "none" }
                              }
                            />
                            <img
                              id="img"
                              src={
                                file.type == "image"
                                  ? `http://localhost:5000/` + file.FilePath
                                  : PDFIcon
                              }
                              alt="Paris"
                              style={
                                file.type == "image" ? {} : { display: "none" }
                              }
                            />
                          </Table.TextCell>
                          <Table.TextCell>{file.name}</Table.TextCell>
                          <Table.TextCell marginLeft={40}>
                            {file.uptime}
                          </Table.TextCell>
                          <Table.TextCell marginRight={-40}>
                            {(file.size / 1000000).toFixed(3)} MB
                          </Table.TextCell>
  
                          <Table.TextCell
                            flexBasis={55}
                            flexShrink={0}
                            flexGrow={0}
                          >
                            <IconButton
                              icon="import"
                              intent="success"
                              onClick={() => {
                                window.open(
                                  "http://localhost:5000/" + file.FilePath,
                                  "_blank" // <- This is what makes it open in a new window.
                                );
                              }}
                            />
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
                                    title="Move File To Folder"
                                    onConfirm={() => {
                                      this.MoveTOFolder(file._id);
                                      setState({ isShown: false });
                                    }}
                                    onCloseComplete={() =>
                                      setState({ isShown: false })
                                    }
                                    confirmLabel="Custom Label"
                                  >
                                    <Heading
                                      size={400}
                                      marginLeft={32}
                                      marginBottom={10}
                                    >
                                      Select Folder
                                    </Heading>
                                    <Select
                                      onChange={event => {
                                        SelectFolderOnUpload = event.target.value;
                                      }}
                                      width="90%"
                                      marginBottom={10}
                                      marginLeft={32}
                                    >
                                      <option checked>Select Folder</option>
                                      <option value="Main_Folder">
                                        Main Folder
                                      </option>
                                      {this.state.Folders.map((Folder, i) => (
                                        <option
                                          key={Folder._id}
                                          value={Folder._id}
                                        >
                                          {Folder.name}
                                        </option>
                                      ))}
                                    </Select>
                                  </Dialog>
                                  <IconButton
                                    icon="add-to-folder"
                                    onClick={() => setState({ isShown: true })}
                                    //  onClick={()=>{
                                    //  ctx.actions.MoveTOFolder(file._id)
                                    //  }}
                                  />
                                  {/* <Button >Show Dialog</Button> */}
                                </Pane>
                              )}
                            </Component>
                          </Table.TextCell>
                          <Table.TextCell
                            flexBasis={55}
                            flexShrink={0}
                            flexGrow={0}
                          >
                            <IconButton
                              onClick={() => {
                                this.MoveTOTrash(file._id);
                              }}
                              icon="trash"
                              intent="danger"
                            />
                          </Table.TextCell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
              </React.Fragment>
            );
          } else if (ctx.value.isLogin=='notLogin') {
            return (
              <Login/> 
              )
          } else{
            return (
              <Pane id="DivSpinner" display="flex" alignItems="center" justifyContent="center" >
                 {/* <Spinner size={100} /> */}
                 <img src={l}  />
              </Pane>
               )
          }
         
        }}
      </Context.Consumer>
      </div>
    );
  }
}

export default MyFiles;