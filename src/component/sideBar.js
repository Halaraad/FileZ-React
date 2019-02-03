import React from "react";
import { Menu, Button, Pane, Badge,Dialog, toaster, IconButton, FilePicker, Heading, Select, Switch, TextInput } from "evergreen-ui";
import { NavLink } from "react-router-dom";
import { Col, ProgressBar } from "react-bootstrap";
import Component from "@reactions/component";
import FileUploadProgress from "react-fileupload-progress";
import Cookies from "universal-cookie";

import Context from "./context.js";
var host="http://localhost:5000/"
var fid
const cookies = new Cookies();

var UploadCheck = 0;
var AdminPassword = "";
var AdminName = "";
var AdminEmail = "";
var FolderName = "";
var ProfilePicture;
var Folder_id
var UserName = "";

const styles = {
  progressWrapper: {
    height: "27px",
    width: "475px",
    marginTop: "4px",
    marginLeft: "20px",
    float: "left",
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    borderRadius: "4px",
    WebkitBoxShadow: "inset 0 1px 2px rgba(0,0,0,.1)",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,.1)"
  },
  progressBar: {
    float: "left",
    width: "0",
    height: "100%",
    fontSize: "12px",
    lineHeight: "20px",
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#5cb85c",
    WebkitBoxShadow: "inset 0 -1px 0 rgba(0,0,0,.15)",
    boxShadow: "inset 0 -1px 0 rgba(0,0,0,.15)",
    WebkitTransition: "width .6s ease",
    Otransition: "width .6s ease",
    transition: "width .6s ease"
  }
};

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      Folders: [],
      SubFolders: [],
      FoldersPath: []
    };
  }

  componentDidMount(value) {
    if (document.getElementById("rowTest")) {
      document.getElementById("rowTest").remove();
    }
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
          this.AddSubFolder();
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

  AddSubFolder() {
    if (this.state.SubFolders) {
      for (let index = 0; index < this.state.SubFolders.length; index++) {
        var div = document.createElement("div");
        div.id = "rowTest";
        div.innerHTML = `<input type="radio" name="folder"" value="${this.state.SubFolders[index]._id}">${this.state.SubFolders[index].name}<br>`;
        document.getElementById("content").appendChild(div);
      }
    }
  }

  formGetter() {
    return new FormData(document.getElementById("customForm"));
  }

  customProgressRenderer(progress, hasError, cancelHandler) {
    if (hasError || progress > -1) {
      let barStyle = Object.assign({}, styles.progressBar);

      barStyle.width = progress + "%";

      let message = (
        <span style={{ "margin-left": "19px" }}>
          Uploading {barStyle.width}
        </span>
      );

      if (hasError) {
        barStyle.backgroundColor = "#d9534f";
        message = (
          <span style={{ color: "#a94442", "margin-left": "19px" }}>
            Failed to upload ...
          </span>
        );
      }

      if (progress === 100) { }

      return (
        <div>
          <div style={styles.progressWrapper}>
            <div style={barStyle} />
          </div>
          <IconButton onClick={cancelHandler} icon="cross" intent="danger" />
          <div style={{ clear: "left" }}>{message}</div>
        </div>
      );
    } else {
      return;
    }
  }

  customFormRenderer(onSubmit) {
    return (
      <form id="customForm" method="post" action={host + `api/files/add`}>
        <Heading size={400} marginLeft={32} marginBottom={10}>
          Select Folder
        </Heading>
        <input name="folder" type="hidden" value={fid} />
        <Component initialState={{ isShown: false }}>
          {({ state, setState }) => (
            <Pane>
              <Dialog isShown={state.isShown}
                onConfirm={() => {
                  setState({ isShown: false });
                  this.componentDidMount();
                  this.setState({
                    FoldersPath: []
                  });
                }}
                title="Select Folder" onCloseComplete={() => setState({ isShown: false })} confirmLabel="Select">
                <ul className="breadcrumb breadcrumb-margin">
                  <li>
                    <a
                      onClick={() => {
                        this.componentDidMount();
                        this.setState({
                          FoldersPath: []
                        });
                      }}>
                      Home
                    </a>
                  </li>
                  {this.state.FoldersPath.map((Folder, i) => (
                    <li>
                      <a href="#"
                        onClick={() => {
                          this.componentDidMount(Folder._id);
                          var l = this.state.FoldersPath.length;
                          var x = this.state.FoldersPath;
                          x.length = i + 1;
                        }}>
                        {Folder.name}
                      </a>
                    </li>
                  ))}
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
                        width="40" height="40" alt="" src="/assets/images/mainFolder.png" />
                    </div>
                    <div>
                      <span id="folder-name-small">Main Folder</span>
                    </div>
                  </div>

                  {this.state.Folders.map(Folder => (
                    <div key={Folder._id}>
                      <div>
                        <img
                          onClick={evnt => {
                            fid = Folder._id;
                            this.componentDidMount(Folder._id);
                            let Folders = [...this.state.FoldersPath, Folder];
                            this.setState({
                              FoldersPath: Folders
                            });
                          }}
                          id={Folder._id} width="40" height="40" alt="" src="/assets/images/mainFolder.png" />
                      </div>
                      <div>
                        <span id="folder-name-small">{Folder.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Dialog>

              <a
                className="browseFolders"
                onClick={() => setState({ isShown: true })}>
                Browse Folders
              </a>
            </Pane>
          )}
        </Component>

        <input type="hidden" name="token" value={cookies.get("token")} />
        <input type="hidden" name="public" value={1} />

        <Heading size={400} marginLeft={32} width="90%" marginBottom={10} marginTop="default">
          Choose File
        </Heading>

        <FilePicker marginLeft={32} width="90%" marginBottom={10}
          onChange={files => console.log(files)}
          display="none;" name="file" />
        <Heading size={400} marginLeft={32} marginBottom={10} marginTop="default">
          Private ?
        </Heading>

        <Switch marginLeft={32} name="public" value={1} marginBottom={10} disabled />
        <Button appearance="primary" marginLeft={210} onClick={onSubmit}>
          Upload File
        </Button>
      </form>
    );
  }

  render() {
    return (
      <Context.Consumer>
        {ctx => {
          return (
            <Col className="main-col-left" xs={12} sm={12} md={2} xsOffset={0} smOffset={0} mdOffset={0}>
              <div className="sidebar-container">
                <div className="logo">
                  <img src="/assets/images/cloud.png" alt="" />
                  <p>FileZ</p>
                </div>

                <div className="add-file-div">
                  <Component initialState={{ isShown: false }}>
                    {({ state, setState }) => (
                      <Pane>
                        <Dialog isShown={state.isShown}
                          onConfirm={() => {}}
                          title="Upload New File" hasFooter={false}
                          onCloseComplete={() => {
                            setState({ isShown: false });
                          }}
                          confirmLabel="Upload File">
                          <FileUploadProgress
                            key="ex2" url={host + `api/files/add`}
                            onProgress={(e, request, progress) => {
                              UploadCheck = progress;
                              console.log(UploadCheck);
                              if (progress == 100) {
                                console.log("progress", e, request, progress);
                              }
                            }}
                            onLoad={(e, request) => {
                              if (e.currentTarget.response) {
                                toaster.success(e.currentTarget.response);
                                ctx.actions.ReCallcomponentDidMount();
                              }
                              console.log("load", e.currentTarget.response);
                            }}
                            onError={(e, request) => {
                              if (e.currentTarget.response) {
                                toaster.danger(e.currentTarget.response);
                              }
                              console.log(
                                "error",
                                e.currentTarget.response,
                                request
                              );
                            }}
                            onAbort={(e, request) => {
                              console.log("abort", e, request);
                            }}
                            formGetter={this.formGetter.bind(this)}
                            formRenderer={this.customFormRenderer.bind(this)}
                            progressRenderer={this.customProgressRenderer.bind(
                              this
                            )}
                          />
                        </Dialog>

                        <Menu.Item className=""
                          onClick={() => {
                            this.setState({ Folders: ctx.value.Folders });
                            setState({ isShown: true });
                          }}>
                          <Button height={48}>Add File</Button>
                        </Menu.Item>
                      </Pane>
                    )}
                  </Component>
                </div>

                <div className="links-container">
                  <NavLink className="link-container" exact to="/files">
                    <img src="/assets/images/white11.png" alt="" />
                    <a
                      onClick={() => {
                        // ctx.actions.ReCallcomponentDidMount();
                        ctx.actions.CloseFolder();
                      }}>
                      My Files
                    </a>
                  </NavLink>
                </div>

                <div className="links-container">
                  <NavLink activeClassName="active-bin" className="link-container" to="/Trash">
                    <img src="/assets/images/white22.png" alt="" />
                    <a href="#2">Trash<Badge
                     style={ctx.value.FilesInTrash? {}: { display: "none" }
                     } marginLeft={10} color="red" isSolid>{ctx.value.FilesInTrash}</Badge></a>
                  </NavLink>
                </div>

                <div className="links-container"
                  style={ctx.value.Session.role == 1 ? {} : { display: "none" }}>
                  <NavLink className="link-container" to="/admin">
                    <img src="/assets/images/white333.png" alt="" />
                    <a href="#3">Admin</a>
                  </NavLink>
                </div>
                <Component initialState={{ isShown: false }}>
                  {({ state, setState }) => (
                    <Pane marginTop={0} className="pane-container">
                      <Dialog isShown={state.isShown}
                        onConfirm={() => {
                          ctx.actions.AddNewFolder(FolderName, "");
                          setState({ isShown: false });
                        }}
                        title="Add New Folder" confirmLabel="Add"
                        onCloseComplete={() => setState({ isShown: false })}>
                        <Heading size={400} marginLeft={32} marginBottom={10}>
                          Choose Folder Name
                        </Heading>

                        <TextInput
                          onChange={event => {
                            FolderName = event.target.value;
                          }}
                          width="90%" marginLeft={32} marginBottom={10} placeholder="Folder Name..." />
                      </Dialog>

                      <Menu.Item className="pane-container-item"
                        onClick={() => setState({ isShown: true })}>
                        <img src="/assets/images/white55.png" alt="" />
                        <a>Add Folder</a>
                      </Menu.Item>
                    </Pane>
                  )}
                </Component>

                <Component initialState={{ isShown: false }}>
                  {({ state, setState }) => (
                    <Pane marginTop={0} className="pane-container">
                      <Dialog isShown={state.isShown}
                        onConfirm={() => {
                          ctx.actions.UserPorfileEdit(UserName, ProfilePicture);
                          UserName = "";
                          ProfilePicture = "";
                          setState({ isShown: false });
                        }}
                        title="Edit Porfile" confirmLabel="Edit"
                        onCloseComplete={() => setState({ isShown: false })}>
                        <Heading size={400} marginLeft={32} marginBottom={10}>
                          Name
                        </Heading>

                        <TextInput
                          onChange={event => {
                            UserName = event.target.value;
                          }}
                          width="90%" marginLeft={32} marginBottom={10} placeholder=" Name..." />

                        <Heading size={400} marginLeft={32} marginBottom={10}>
                          Select profile picture
                        </Heading>

                        <FilePicker multiple width="90%" marginLeft={32} marginBottom={10}
                          onChange={files => {
                            ProfilePicture = files[0];
                          }} />
                      </Dialog>

                      <Menu.Item className="pane-container-item"
                        onClick={() => setState({ isShown: true })}>
                        <img src="/assets/images/white666.png" alt="" />
                        <a>Edit Profile</a>
                      </Menu.Item>
                    </Pane>
                  )}
                </Component>

                <div
                  style={ctx.value.Session.role == 1 ? {} : { display: "none" }}>
                  <Component initialState={{ isShown: false }}>
                    {({ state, setState }) => (
                      <Pane marginTop={0} className="pane-container">
                        <Dialog isShown={state.isShown}
                          onConfirm={() => {
                            ctx.actions.AddAdmin(
                              AdminName,
                              AdminEmail,
                              AdminPassword
                            );
                            AdminName = "";
                            AdminEmail = "";
                            AdminPassword = "";
                            setState({ isShown: false });
                          }}
                          title="Add New Admin" confirmLabel="Add"
                          onCloseComplete={() => setState({ isShown: false })}>
                          <Heading size={400} marginLeft={32} marginBottom={10}>
                            Name
                          </Heading>

                          <TextInput
                            onChange={event => {
                              AdminName = event.target.value;
                            }}
                            width="90%" marginLeft={32} marginBottom={10} placeholder=" Name..." />

                          <Heading size={400} marginLeft={32} marginBottom={10}>
                            Email
                          </Heading>

                          <TextInput
                            onChange={event => {
                              AdminEmail = event.target.value;
                            }}
                            width="90%" marginLeft={32} marginBottom={10} placeholder="Email..." />

                          <Heading size={400} marginLeft={32} marginBottom={10}>
                            Password
                          </Heading>

                          <TextInput
                            onChange={event => {
                              AdminPassword = event.target.value;
                            }}
                            width="90%" type="password" marginLeft={32} marginBottom={10} placeholder="Password..." />
                        </Dialog>

                        <Menu.Item className="pane-container-item"
                          style={
                            ctx.value.Session.role == 1
                              ? {}
                              : { display: "none" }
                          }
                          onClick={() => setState({ isShown: true })}>
                          <img src="/assets/images/white777.png" alt="" />
                          <a>Add Admin</a>
                        </Menu.Item>
                      </Pane>
                    )}
                  </Component>
                  <br />
                </div>

                <div className="storage-container">
                  <div className="storage">
                    <img src="/assets/images/storage.png" alt="" />
                    <p>Storage</p>
                  </div>
                  <div className="ProgressBarDiv">
                    <ProgressBar now={ctx.value.Packagefree} />
                  </div>
                  <div className="storage-para">
                    <p id="storage-para-p">
                      {(
                        ctx.value.PackageSize / 1000000 -
                        ctx.value.Session.limit / 1000000
                      ).toFixed(2)}{" "}
                      MB of {ctx.value.PackageSize / 1000000} MB used.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          );
        }}
      </Context.Consumer>
    );
  }
}
export default Sidebar;