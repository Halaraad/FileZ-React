import React, { Component } from "react";
import { Pane, Button, Table, IconButton, Icon } from "evergreen-ui";
import { Row, Col } from "react-bootstrap";
import Cookies from "universal-cookie";

import Context from "./context.js";
import Sidebar from "./sidebar";
import Signin from "./signin";

const cookies = new Cookies();
class Trash extends Component {
  constructor() {
    super();
    this.state = {
      TrashFiles: []
    };
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
                        <header className="headerr">
                          <div className="header-div-right">
                            <div className="user-img">
                              <div className="user-dropdown">
                                <span>
                                  <div id="user-img-char"
                                      style={ ctx.value.Session.porfileImg == "defaultUser.png" || ctx.value.Session.porfileImg == ""
                                            ? {}
                                            : { display: "none" }
                                        }>
                                        <span className="user-char">{ctx.value.Session.name.charAt(0).toUpperCase()}</span>
                                  </div>

                                  <img id="profile-img" style={ ctx.value.Session.porfileImg == "defaultUser.png" || ctx.value.Session.porfileImg == ""
                                        ? { display: "none" }
                                        : {}
                                    }
                                    src={ `https://filez-node-v2.herokuapp.com/` + ctx.value.Session.porfileImg }/>
                                </span>
                                <div className="dropdown-content">
                                  <div className="dropdown-header">
                                    <span>
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
                                        src={ `https://filez-node-v2.herokuapp.com/` + ctx.value.Session.porfileImg }/>
                                    </span>
                                    <div className="session-info-div">
                                      <span className="session-info">
                                        {ctx.value.Session.name}
                                      </span>
                                      <br />
                                      <span className="session-info">
                                        {ctx.value.Session.email}
                                      </span>
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

                  {(ctx.value.TrashFiles == '') ? ( <h4 className="empty-account">Trash is empty.</h4> )
                      : (
                    <Row className="table-row" style={{ marginLeft: 0 + "px", marginRight: 0 + "px", marginTop: -50 + "px" }} >
                      <Col className="table-col" xs={12} sm={12} md={10} xsOffset={0} smOffset={0} mdOffset={1}>
                        <div className="trashcontiner">
                          <Table id="trashTable">
                            <Table.Head className="table-head" height={50}>
                              <Table.TextCell flexBasis={90} flexShrink={0} flexGrow={0} />

                              <Table.TextCell className="table-cols">
                                <span className="table-cols-head">Name</span>
                                <Icon className='SortIcon' size={16} marginBottom={-4} marginLeft={10} icon="sort-alphabetical"
                                  onClick={() => {
                                    ctx.actions.filterTrash("Name");
                                    }}/>
                              </Table.TextCell>

                              <Table.TextCell className="table-cols">
                                <span className="table-cols-head">Uploaded At</span>
                              </Table.TextCell>

                              <Table.TextCell className="table-cols">
                                <span className="table-cols-head">File Size</span>
                                <Icon className='SortIcon' size={16} marginBottom={-4} marginLeft={10} icon="sort-asc"
                                  onClick={() => {
                                    ctx.actions.filterTrash("Size");
                                    }}/>
                              </Table.TextCell>

                              <Table.TextCell flexBasis={120} flexShrink={0} flexGrow={0} />
                            </Table.Head>

                            <Table.Body id="table-body">
                              {ctx.value.TrashFiles.map(file => (
                                <Table.Row className="table-body-row" key={file._id} height={60}>

                                  <Table.TextCell flexBasis={80} flexShrink={0} flexGrow={0}>
                                    <img id="table-files-icon" src="/assets/images/video.svg" alt="img"
                                      style={ file.type == "video"
                                          ? {}
                                          : { display: "none" }
                                      } />
                                    <img id="table-files-icon" src="/assets/images/file.svg"
                                      alt="img"
                                      style={ file.type == "application/pdf" || file.type == "image" || file.type == "video"
                                          ? { display: "none" }
                                          : {}
                                      } />
                                    <img id="table-files-icon" src="/assets/images/pdf.svg" alt="img"
                                      style={ file.type == "application/pdf"
                                          ? {}
                                          : { display: "none" }
                                      } />
                                    <img id="table-files-icon" src={ file.type == "image"
                                          ? `https://filez-node-v2.herokuapp.com/` + file.FilePath
                                          : "/assets/images/pdf.svg"
                                      }
                                      alt="img"
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
                                    <IconButton className="download-border" icon="redo" intent="success"
                                      onClick={() => {
                                        ctx.actions.RecoveryFromTrash(file._id);
                                      }} />
                                  </Table.TextCell>

                                  <Table.TextCell flexBasis={55} flexShrink={0} flexGrow={0}>
                                    <IconButton className="trash-border" icon="trash" intent="danger"
                                      onClick={() => {
                                        ctx.actions.DeleteFile(file._id);
                                      }} />
                                  </Table.TextCell>
                                </Table.Row>
                              ))}
                            </Table.Body>
                          </Table>
                        </div>
                      </Col>
                    </Row>
                      )}
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
export default Trash;