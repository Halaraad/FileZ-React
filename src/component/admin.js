import React from "react";
import { Table, IconButton, Dialog, Badge, Pane, Heading } from "evergreen-ui";
import { Row, Col } from "react-bootstrap";
import Cookies from "universal-cookie";
import Component from "@reactions/component";
import MyFiles from "./myFiles";
import Context from "./context.js";
import Sidebar from "./sidebar";
import Signin from "./signin";
var host="http://localhost:5000/"

const cookies = new Cookies();

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <Context.Consumer>
          {ctx => {
            if (ctx.value.isLogin == "login" && ctx.value.Session.role == 1) {
              return (
                <Row className="main-row" style={{ marginRight: 0 + "px" }}>
                  <Sidebar />
                  <Col className="main-col-right" xs={12} sm={12} md={10} xsOffset={0} smOffset={0} mdOffset={2}>
                    <Row className="folders-row" style={{ marginLeft: 0 + "px", marginRight: 0 + "px" }}>
                      <Col className="folders-col" xs={12} sm={12} md={10} xsOffset={0} smOffset={0} mdOffset={1}>
                        <div className="admincards">
                          <div className="admincard"><span className="admincardText">Total Data Size :&nbsp;
                            {(ctx.value.FilesSizeInfo / 1000000).toFixed(2)} MB</span>
                            <img id="TotalIcons" src="/assets/images/database.svg" alt="Paris" />
                          </div>

                          <div className="admincard"><span className="admincardText">
                            Number of Files :&nbsp; {ctx.value.FilesNumber}</span>
                            <img id="TotalIcons" src="/assets/images/report.svg" alt="Paris" />
                          </div>

                          <div className="admincard"><span className="admincardText">
                            Total Users :&nbsp; {ctx.value.NumberOfUsers}</span>
                            <img id="TotalIcons" src="/assets/images/team.svg" alt="Paris" />
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row className="table-row" style={{ marginLeft: 0 + "px", marginRight: 0 + "px", marginTop: -60 + "px" }}>
                      <Col className="table-col" xs={12} sm={12} md={10} xsOffset={0} smOffset={0} mdOffset={1}>
                        <div className="admincontiner">
                          <Table className="table">
                            <Table.Head className="table-head" height={50}>
                              <Table.TextCell flexBasis={90} flexShrink={0} flexGrow={0} />

                              <Table.TextCell className="table-cols">
                                <span className="table-cols-head">Name</span>
                              </Table.TextCell>

                              <Table.TextCell className="table-cols">
                                <span className="table-cols-head">User Type</span>
                              </Table.TextCell>

                              <Table.TextCell className="table-cols">
                                <span className="table-cols-head">Joined At</span>
                              </Table.TextCell>

                              <Table.TextCell className="table-cols">
                                <span className="table-cols-head">Remaining Storage</span>
                              </Table.TextCell>

                              <Table.TextCell className="table-cols">
                                <span className="table-cols-head">Package</span>
                              </Table.TextCell>

                              <Table.TextCell flexBasis={120} flexShrink={0} flexGrow={0} />
                            </Table.Head>

                            <Table.Body id="table-body" className="tablebody">
                              {ctx.value.Users.map(user => (
                                <Table.Row className="table-body-row" height={60} key={user._id}>

                                  <Table.TextCell flexBasis={80} flexShrink={0} flexGrow={0}>
                                    <img id="table-files-icon" src={ host + user.porfileImg } alt="img"
                                      style={ user.porfileImg != "defaultUser.png"
                                          ? {}
                                          : { display: "none" }
                                      } />

                                    <div id="table-user-icon"
                                      style={ user.porfileImg == "defaultUser.png"
                                            ? {}
                                            : { display: "none" }
                                        }>
                                        <span className="user-char">{user.name.charAt(0).toUpperCase()}</span>
                                    </div>

                                    {/* <img id="table-files-icon" src="/assets/images/user.svg" alt="img"
                                      style={ user.porfileImg == "defaultUser.png"
                                          ? {}
                                          : { display: "none" }
                                      } /> */}
                                  </Table.TextCell>

                                  <Table.TextCell className="table-cols">
                                    <span className="table-body-row-span">{user.name}</span>
                                  </Table.TextCell>

                                  <Table.TextCell className="table-cols">
                                    <Badge
                                      style={ user.role == 1
                                          ? {}
                                          : { display: "none" }
                                      }
                                      color="red" isSolid>
                                      Admin
                                    </Badge>
                                    <Badge
                                      style={ user.role == 0
                                          ? {}
                                          : { display: "none" }
                                      }
                                      color="blue" isSolid>
                                      Normal
                                    </Badge>
                                  </Table.TextCell>

                                  <Table.TextCell className="table-cols">
                                    <span className="table-body-row-span">{user.uptime}</span>
                                  </Table.TextCell>

                                  <Table.TextCell className="table-cols">
                                    <span className="table-body-row-span">{(user.limit / 1000000).toFixed(3)} MB</span>
                                  </Table.TextCell>

                                  <Table.TextCell className="table-cols">
                                    <span className="table-body-row-span">{user.package}</span>
                                  </Table.TextCell>

                                  <Table.TextCell flexBasis={55} flexShrink={0} flexGrow={0} />

                                  <Table.TextCell flexBasis={55} flexShrink={0} flexGrow={0} className="textcell-padding">
                                    <Component initialState={{ isShown: false }}>
                                      {({ state, setState }) => (
                                        <Pane>
                                          <Dialog isShown={state.isShown} title="Danger " intent="danger"
                                            onConfirm={() => {
                                              ctx.actions.deleteUser(user._id);
                                              setState({ isShown: false });
                                            }}
                                            onCloseComplete={() =>
                                              setState({ isShown: false })
                                            }
                                            confirmLabel="Delete">

                                            <Heading size={500}>Are you sure you want to delete this user?</Heading>
                                          </Dialog>
                                          <IconButton style={ user._id == ctx.value.Session._id
                                          ? { display: "none"}
                                          : {}
                                      } className="trash-border" icon="trash" intent="danger"
                                            onClick={() =>
                                              setState({ isShown: true })
                                            } />
                                        </Pane>
                                      )}
                                    </Component>
                                  </Table.TextCell>
                                </Table.Row>
                              ))}
                            </Table.Body>
                          </Table>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              );
            } else if (ctx.value.isLogin == "notLogin") {
              return <Signin />;
            } else if (ctx.value.Session.role != 1) {
              return <MyFiles />;
            }  else {
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
export default Admin;