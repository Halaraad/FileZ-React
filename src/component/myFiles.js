import React from "react";
import { Pane, Icon,SideSheet, Dialog, Button,
   toaster, Table, IconButton, Heading, Popover, Menu, Position, Paragraph,
    Autocomplete, TextInput } from "evergreen-ui";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Component from "@reactions/component";
import styled from "styled-components";
import ItemsCarousel from "react-items-carousel";
import Cookies from "universal-cookie";
import Sidebar from "./sidebar";
import Signin from "./signin";
import Context from "./context.js";
import StripeCheckout from 'react-stripe-checkout';
const cookies = new Cookies();
var FolderID='';
var RadioValue='';
var FolderName;
var fid;
var host="http://localhost:5000/"
var SelectFolderOnUpload;

let ModelPlan = styled.div`
  color: #7e87a1;
  font-family: Roboto;
  background-color: white;
  height: 100px;
  width: 540px;
`;

let ModelCard1 = styled.div`
  background-color: #f4f5fa;
  height: 85px;
  padding-top: 5px;
  width: 150px;
  box-shadow: 1px 1px 8px #ababab;
  position: absolute;
  border: 0px;
  border-radius: 10px;
  margin-left: 10px;
`;

let ModelCard2 = styled.div`
  background-color: #f4f5fa;
  height: 85px;
  padding-top: 5px;
  width: 150px;
  box-shadow: 1px 1px 8px #ababab;
  position: absolute;
  border: 0px;
  border-radius: 10px;
  margin-left: 190px;
`;

let ModelCard3 = styled.div`
  background-color: #f4f5fa;
  height: 85px;
  padding-top: 5px;
  width: 150px;
  box-shadow: 1px 1px 8px #ababab;
  position: absolute;
  border: 0px;
  border-radius: 10px;
  margin-left: 370px; 
`;

let ViewContent = styled.div`
  color: #7e87a1;
  font-family: Roboto;
  background: #ffffff;
  height: 130px;
  width: 100%;
  padding: 0;
  padding-top: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(171, 171, 171, 0.25);
`;

class MyFiles extends React.Component {
  constructor() {
    super();
    this.state = {
      activeItemIndex: 0,
      Files: [],
      Folders: [],
      FoldersPath: [],
      FoldersPath2: [],
      FileNames: ""
    };
  }

  changeActiveItem = activeItemIndex => this.setState({ activeItemIndex });

  componentDidMount(value) {
    if (value) {
      fetch(host + `api/folder/folder/` + value, {
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
              Folders: data[0].Folder
            });
          }
        });
    } else {
      fetch(host + `api/folder/`, {
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
  }
  
  render() {
    return (
      <div>
        <Context.Consumer>
          {ctx => {
            if (ctx.value.isLogin == "login") {
              return (
                <Row className="main-row" style={{ marginRight: 0 + "px" }}>
                  <Sidebar />
                  <Col className="main-col-right" xs={12} sm={12} md={10} xsOffset={0} smOffset={0} mdOffset={2}>
                    <Row className="header-row" style={{ marginLeft: 0 + "px", marginRight: 0 + "px" }}>
                      <Col className="header-col" xs={12} sm={12} md={12} xsOffset={0} smOffset={0} mdOffset={0}>
                        <header className="header">
                          <div className="search-div">
                            <div>
                              <img className="search-icon" src="/assets/images/search.png" alt="search-icon" />
                            </div>

                            <Autocomplete title="Search"
                              onChange={changedItem => {
                                ctx.actions.filterFiles(changedItem);
                              }}
                              items={ctx.value.FileNames}>
                              {props => { const { getInputProps, getRef, inputValue } = props;
                                return (
                                  <TextInput placeholder="Search on FileZ" value={inputValue} innerRef={getRef} height={100} appearance="default"
                                    {...getInputProps()}
                                  />
                                );
                              }}
                            </Autocomplete>
                          </div>
                          <div className="header-div-right">
                            <div className="chooseplan-btn">
                            <Component initialState={{ isShown: false }}>
  {({ state, setState }) => (
    <Pane>
      <Dialog
        isShown={state.isShown}
        title="Upgrade Storage "
        width={700}
        hasFooter={false}
        onCloseComplete={() => setState({ isShown: false })}
        confirmLabel="Custom Label"
      >
            <div class="packages-container-chooseplan">
              <div class="package-chooseplan border-b">
                <div class="package-chooseplan-header">
                  <h2>Free Package</h2>
                  <h2><img src="/assets/images/free.png" /> $0.00</h2>
                </div>
                <p class="package-chooseplan-p">
                Store up to <span className="bold">100</span> MegaBytes of storage.<br>
                </br>
                limiting file size <span className="bold">25MB</span> per file.
                </p>
                <br/>
                <div>
               
                <Button appearance="primary" height={35} iconBefore="confirm" disabled>Selected</Button>
                </div>
              </div>
              <div class="package-chooseplan border-g">
                <div class="package-chooseplan-header">
                  <h2>Economic Package</h2>
                  <h2><img src="/assets/images/paid.png" /> $3.50</h2>
                </div>
                <p class="package-chooseplan-p">
                  Add <span className="bold">1</span> GigaBytes of storage.
                </p>
                <div>
                <StripeCheckout
        token={(token)=>{
          let type="e"
          ctx.actions.UpgradedPackage(token,type)
        }}
        stripeKey="pk_test_P8pOeLxcfCFv3Z7O5C82hvmf"
              name="" />
                </div>
              </div>
              <div class="package-chooseplan border-g">
                <div class="package-chooseplan-header">
                  <h2>Standard Package</h2>
                  <h2><img src="/assets/images/paid.png" /> $7.00</h2>
                </div>
                <p class="package-chooseplan-p">
                Add <span className="bold">10</span> GigaBytes of storage.
                </p>
                <div>
                <StripeCheckout
        token={(token)=>{
          let type="s"
          ctx.actions.UpgradedPackage(token,type)
        }}
        stripeKey="pk_test_P8pOeLxcfCFv3Z7O5C82hvmf"
              name="" />
                </div>
              </div>
              <div class="package-chooseplan border-g">
                <div class="package-chooseplan-header">
                  <h2>Business Package</h2>
                  <h2><img src="/assets/images/paid.png" /> $12.00</h2>
                </div>
                <p class="package-chooseplan-p">
                Add <span className="bold">100</span> GigaBytes of storage.
                </p>
                <div>
                <StripeCheckout
        token={(token)=>{
          let type="b"
          ctx.actions.UpgradedPackage(token,type)
        }}
        stripeKey="pk_test_P8pOeLxcfCFv3Z7O5C82hvmf"
              name="" />
                </div>
              </div>
            </div>
      </Dialog>

      <Button marginRight={16} width={120} height={30} appearance="minimal" iconBefore="trending-up"
                                      onClick={() =>
                                        setState({ isShown: true })
                                      }>

                        More Storge
                                    </Button>
    </Pane>
  )}
</Component>
                            </div>
                            <div className="user-img">
                              <div className="user-dropdown">
                                <span>
                                  {/* <img id="profile-img" src="/assets/images/user.svg"
                                    style={ ctx.value.Session.porfileImg == "defaultUser.png" || ctx.value.Session.porfileImg == ""
                                        ? {}
                                        : { display: "none" }
                                    }/> */}

                                  <div id="user-img-char"
                                    style={ ctx.value.Session.porfileImg == "defaultUser.png" || ctx.value.Session.porfileImg == ""
                                        ? {}
                                        : { display: "none" }
                                    }>
                                    <span className="user-char">{ctx.value.Session.name.charAt(0).toUpperCase()}</span>
                                  </div>

                                  <img id="profile-img"
                                    style={ ctx.value.Session.porfileImg == "defaultUser.png" || ctx.value.Session.porfileImg == ""
                                        ? { display: "none" }
                                        : {}
                                    }
                                    src={host + ctx.value.Session.porfileImg} />
                                </span>
                                <div className="dropdown-content">
                                  <div className="dropdown-header">
                                    <span>
                                      {/* <img id="profile-img" src="/assets/images/user.svg"
                                        style={ ctx.value.Session.porfileImg == "defaultUser.png" || ctx.value.Session.porfileImg == ""
                                            ? {}
                                            : { display: "none" }
                                        }/> */}

                                      <div
                                        id="user-img-char"
                                        style={ ctx.value.Session.porfileImg == "defaultUser.png" || ctx.value.Session.porfileImg == ""
                                            ? {}
                                            : { display: "none" }
                                        }>
                                        <span className="user-char">{ctx.value.Session.name.charAt(0).toUpperCase()}</span>
                                      </div>

                                      <img id="profile-img"
                                        style={ ctx.value.Session.porfileImg == "defaultUser.png" || ctx.value.Session.porfileImg == ""
                                            ? { display: "none" }
                                            : {}
                                        }
                                        src={ host + ctx.value.Session.porfileImg } />
                                    </span>
                                    <div className="session-info-div">
                                      <span className="session-info">{ctx.value.Session.name}</span>
                                      <br />
                                      <span className="session-info">{ctx.value.Session.email}</span>
                                    </div>
                                  </div>
                                  <div className="dropdown-footer">
                                    <Button appearance="primary" intent="danger" id="logoutbtn" iconAfter="log-out"
                                      onClick={() => {
                                        cookies.remove("token");
                                        document.location.href = "/";
                                      }}>
                                      Logout
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </header>
                      </Col>
                    </Row>
                    <React.Fragment>
                      <Row className="folders-row" style={{ marginLeft: 0 + "px", marginRight: 0 + "px" }}>
                        <Col className="folders-col" xs={12} sm={12} md={10} xsOffset={0} smOffset={0} mdOffset={1}>
                          <ul className="breadcrumb">
                            <li>
                              <a
                                onClick={() => {
                                  ctx.actions.CloseFolder();
                                  this.setState({
                                    FoldersPath: []
                                  });
                                  document.getElementById("deleteFolder").style.display = "none";
                                  document.getElementById("undoFolder").style.display = "none";
                                  document.getElementById("AddFolder").style.display = "none";
                                }}>
                                {/* <Icon icon="home" color="success" />  */}
                                Home
                              </a>
                            </li>
                            {this.state.FoldersPath.map((Folder, i) => (
                              <li>
                                <a href="#"
                                  onClick={() => {
                                    ctx.actions.test(Folder._id);
                                    var l = this.state.FoldersPath.length;
                                    var x = this.state.FoldersPath;
                                    x.length = i + 1;
                                  }}>
                                  {/* <Icon icon="folder-open" color="info" />  */}
                                  {Folder.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                          <h4 className="folders-lable2"
                            style={ctx.value.Folders == "" ? {} : { display: "none" }}>
                            Empty Folders.
                          </h4>
                          <div className="folders-lable"
                            style={ctx.value.Folders == "" ? { display: "none" } : {}}>
                            {/* Folders */}
                          </div>
                          <ViewContent
                            style={ctx.value.Folders == "" ? { display: "none" } : {}}>
                            <div>
                              <ItemsCarousel id="arrow"
                                // Placeholder configurations
                                enablePlaceholder numberOfPlaceholderItems={10} minimumPlaceholderTime={1000}
                                // Carousel configurations
                                numberOfCards={10} gutter={12} showSlither={true} firstAndLastGutter={true} freeScrolling={false}
                                // Active item configurations
                                requestToChangeActive={this.changeActiveItem}
                                activeItemIndex={this.state.activeItemIndex}
                                activePosition={"center"} chevronWidth={24}
                                rightChevron={ <span className="chevron"><img src="/assets/images/right.png" /></span> }
                                leftChevron={ <span className="chevron"><img src="/assets/images/left.png" /></span> }
                                outsideChevron={true}>
                                {ctx.value.Folders.map(Folder => (
                                  <div key={Folder._id}>
                                    <div>
                                      <img
                                        onClick={evnt => {
                                          ctx.actions.OpenFolder(Folder._id);
                                          let Files = [
                                            ...this.state.FoldersPath,
                                            Folder
                                          ];
                                          this.setState({
                                            FoldersPath: Files
                                          });
                                          console.log(this.state.FoldersPath);

                                          FolderID = Folder._id;
                                          document.getElementById("undoFolder").style.display = "flex";
                                          document.getElementById("deleteFolder").style.display = "flex";
                                          document.getElementById("AddFolder").style.display = "flex";
                                        }}
                                        id={Folder._id} className="folder-img" alt="" src="/assets/images/mainFolder.png" />
                                    </div>
                                    <div>
                                      <span id="folder-name">{Folder.name}</span>
                                    </div>
                                  </div>
                                ))}
                              </ItemsCarousel>
                            </div>
                          </ViewContent>
                        </Col>
                      </Row>

                      <Row className="table-row" style={{ marginLeft: 0 + "px", marginRight: 0 + "px" }}>
                        <Col className="table-col" xs={12} sm={12} md={10} xsOffset={0} smOffset={0} mdOffset={1}>
                          <div className="table">
                            <div className="files-menu">
                              <Popover position={Position.BOTTOM_LEFT}
                                content={
                                  <Menu>
                                    <Menu.Group title="All Files">
                                      <Menu.Item icon="projects"
                                        onClick={() => {
                                          ctx.actions.filterFiles("all");
                                        }}>
                                        all Files
                                      </Menu.Item>
                                    </Menu.Group>
                                    <Menu.Divider />
                                    <Menu.Group title="Filter File by">
                                      <Menu.Item icon="media"
                                        onClick={() => {
                                          ctx.actions.filterFiles("images");
                                        }}>
                                        images files
                                      </Menu.Item>
                                      <Menu.Item icon="print"
                                        onClick={() => {
                                          ctx.actions.filterFiles("PDF");
                                        }}>
                                        PDF Files
                                      </Menu.Item>
                                      <Menu.Item icon="video"
                                        onClick={() => {
                                          ctx.actions.filterFiles("Videos");
                                        }}>
                                        Videos Files
                                      </Menu.Item>
                                      <Menu.Item icon="paperclip"
                                        onClick={() => {
                                          ctx.actions.filterFiles("other_Files");
                                        }}>
                                        other Files
                                      </Menu.Item>
                                    </Menu.Group>
                                  </Menu>
                                }>
                                <Button height={40} iconAfter="caret-down"
                                  style={ctx.value.UnFilterFiles == ""
                                      ? { display: "none" }
                                      : {}
                                  }>
                                  <span className="files-lable">Files</span>
                                </Button>
                              </Popover>

                              <IconButton id="undoFolder" icon="home" intent="success" height={40}
                                onClick={() => {
                                  ctx.actions.CloseFolder();
                                  this.setState({
                                    FoldersPath: []
                                  });
                                  FolderID = "";
                                  document.getElementById("deleteFolder").style.display = "none";
                                  document.getElementById("undoFolder").style.display = "none";
                                  document.getElementById("AddFolder").style.display = "none";
                                }} />

                              <IconButton icon="delete" id="deleteFolder" intent="success" height={40}
                                onClick={() => {
                                  ctx.actions.DeleteFodler(FolderID);
                                  this.setState({
                                    FoldersPath: []
                                  });
                                }} />
                              <Component initialState={{ isShown: false }}>
                                {({ state, setState }) => (
                                  <Pane marginTop={0} className="pane-container">
                                    <Dialog isShown={state.isShown}
                                      onConfirm={() => {
                                        ctx.actions.AddNewFolder(
                                          FolderName,
                                          FolderID
                                        );
                                        setState({ isShown: false });
                                      }}
                                      title="Add New Folder" confirmLabel="Add"
                                      onCloseComplete={() =>
                                        setState({ isShown: false })
                                      }>
                                      <Heading size={400} marginLeft={32} marginBottom={10}>
                                        Choose Folder Name
                                      </Heading>

                                      <TextInput
                                        onChange={event => {
                                          FolderName = event.target.value;
                                        }}
                                        width="90%" marginLeft={32} marginBottom={10} placeholder="Folder Name..." />
                                    </Dialog>
                                    <IconButton icon="folder-new" id="AddFolder" intent="success" height={40}
                                      onClick={() =>
                                        setState({ isShown: true })
                                      } />
                                  </Pane>
                                )}
                              </Component>
                            </div>
                            <br style={ ctx.value.Files == "" ? {} : { display: "none" } } />
                            <h4 className="folders-lable2"
                              style={ ctx.value.Files == "" ? {} : { display: "none" } }>
                              Empty Files.
                            </h4>
                            <Table id="table"
                              style={ ctx.value.Files == "" ? { display: "none" } : {} }>
                              <Table.Head className="table-head" height={50}>
                                <Table.TextCell flexBasis={90} flexShrink={0} flexGrow={0} />

                                <Table.TextCell flexBasis className="table-cols">
                                  <span className="table-cols-head">Name</span>
                                  <Icon className="SortIcon" size={16} marginBottom={-4} marginLeft={10} icon="sort-alphabetical"
                                    onClick={() => {
                                      ctx.actions.filterFiles("Name");
                                    }} />
                                </Table.TextCell>

                                <Table.TextCell className="table-cols">
                                  <span className="table-cols-head">Uploaded At</span>
                                </Table.TextCell>

                                <Table.TextCell className="table-cols">
                                  <span className="table-cols-head">File Size</span>
                                  <Icon className="SortIcon" size={16} marginBottom={-4} marginLeft={10} icon="sort-asc"
                                    onClick={() => {
                                      ctx.actions.filterFiles("Size");
                                    }} />
                                </Table.TextCell>

                                <Table.TextCell flexBasis={175} flexShrink={0} flexGrow={0} />
                              </Table.Head>

                              <Table.Body id="table-body">
                                {ctx.value.Files.map(file => (
                                  <Table.Row className="table-body-row" key={file._id} isSelectable height={60}>
                                    <Table.TextCell flexBasis={80} flexShrink={0} flexGrow={0}>
                                      <img id="table-files-icon" src="/assets/images/video.svg" alt="img"
                                        style={ file.type == "video"
                                            ? {}
                                            : { display: "none" }
                                        } />
                                      <img id="table-files-icon" src="/assets/images/file.svg" alt="img"
                                        style={ file.type == "application/pdf" || file.type == "image" || file.type == "video"
                                            ? { display: "none" }
                                            : {}
                                        } />
                                      <img id="table-files-icon" src="/assets/images/pdf.svg" alt="img"
                                        style={ file.type == "application/pdf"
                                            ? {}
                                            : { display: "none" }
                                        } />
                                      <img id="table-files-icon" alt="img"
                                        src={ file.type == "image"
                                            ? host + file.FilePath
                                            : "/assets/images/file.svg"
                                        }
                                        style={ file.type == "image"
                                            ? {}
                                            : { display: "none" }
                                        } />
                                    </Table.TextCell>

                                    <Table.TextCell className="table-cols">
                                      <span className="table-body-row-span">{file.name}</span>
                                    </Table.TextCell>

                                    <Table.TextCell className="table-cols">
                                      <span className="table-body-row-span">{file.uptime}</span>
                                    </Table.TextCell>

                                    <Table.TextCell className="table-cols">
                                      <span className="table-body-row-span">{(file.size / 1000000).toFixed(3)} MB</span>
                                    </Table.TextCell>

                                    <Table.TextCell flexBasis={55} flexShrink={0} flexGrow={0}>
                                      <IconButton className="download-border" icon="import" intent="success"
                                        onClick={() => {
                                          window.open(host + file.FilePath, "_blank");
                                        }} />
                                    </Table.TextCell>

                                    <Table.TextCell flexBasis={55} flexShrink={0} flexGrow={0}>
                                      <Component initialState={{ isShown: false }}>
                                        {({ state, setState }) => (
                                          <Pane>
                                            <Dialog isShown={state.isShown} title="Move File To Folder"
                                              onConfirm={() => {
                                                ctx.actions.MoveFileTOFolder(file._id, fid );
                                                this.componentDidMount();
                                                this.setState({
                                                  FoldersPath2: []
                                                });
                                                setState({ isShown: false });
                                              }}
                                              onCloseComplete={() =>
                                                setState({ isShown: false })
                                              }
                                              confirmLabel="Move">
                                              <ul className="breadcrumb">
                                                <li>
                                                  <a
                                                    onClick={() => {
                                                      this.componentDidMount();
                                                      this.setState({
                                                        FoldersPath2: []
                                                      });
                                                      FolderID = "";
                                                    }}>
                                                    Home
                                                  </a>
                                                </li>
                                                {this.state.FoldersPath2.map(
                                                  (Folder, i) => (
                                                    <li>
                                                      <a href="#"
                                                        onClick={() => {
                                                          this.componentDidMount(Folder._id);
                                                          var l = this.state.FoldersPath2.length;
                                                          var x = this.state.FoldersPath2;
                                                          x.length = i + 1;
                                                        }}>
                                                        {Folder.name}
                                                      </a>
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                              <div className="FoldersModel">
                                                <div>
                                                  <div>
                                                    <img
                                                      onClick={evnt => {
                                                        fid = "Main Folder";
                                                        this.setState({
                                                          Folders: []
                                                        });
                                                      }}
                                                      width="50" height="50" alt="" src="/assets/images/mainFolder.png" />
                                                  </div>
                                                  <div>
                                                    <span id="folder-name">Main Folder</span>
                                                  </div>
                                                </div>

                                                {this.state.Folders.map(
                                                  Folder => (
                                                    <div key={Folder._id}>
                                                      <div>
                                                        <img
                                                          onClick={evnt => {
                                                            fid = Folder._id;
                                                            this.componentDidMount(Folder._id);
                                                            let Folders = [...this.state.FoldersPath2, Folder
                                                            ];
                                                            this.setState({
                                                              FoldersPath2: Folders
                                                            });
                                                          }}
                                                          id={Folder._id} width="50" height="50" alt="" src="/assets/images/mainFolder.png" />
                                                      </div>
                                                      <div>
                                                        <span id="folder-name">{Folder.name}</span>
                                                      </div>
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            </Dialog>
                                            <IconButton className="addtofolder-border" icon="add-to-folder"
                                              onClick={() => {
                                                this.setState({
                                                  Folders: ctx.value.Folders
                                                });
                                                setState({ isShown: true });
                                              }} />
                                          </Pane>
                                        )}
                                      </Component>
                                    </Table.TextCell>

                                    <Table.TextCell flexBasis={55} flexShrink={0} flexGrow={0}>
                                      <IconButton className="trash-border"
                                        onClick={() => {
                                          ctx.actions.MoveFileTOTrash(file._id);
                                        }}
                                        icon="trash" intent="danger" />
                                    </Table.TextCell>
                                  </Table.Row>
                                ))}
                              </Table.Body>
                            </Table>
                          </div>
                        </Col>
                      </Row>
                    </React.Fragment>
                  </Col>
                </Row>
              );
            } else if (ctx.value.isLogin == "notLogin") {
              return <Signin />;
            } else {
              return (
                <Pane id="DivSpinner" display="flex" alignItems="center" justifyContent="center">
                  <img src="/assets/images/loading.gif" />
                </Pane>
              );
            }
          }}
        </Context.Consumer>
      </div>
    );
  }
}

export default MyFiles;