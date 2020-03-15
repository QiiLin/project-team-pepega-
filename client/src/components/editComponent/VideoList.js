import React, { Component, Fragment, useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardTitle,
  CardText,
  Row,
  Col,
  ButtonGroup
} from "reactstrap";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import { connect } from "react-redux";
import {
  deleteItem,
  getItems,
  setSelectItemOne,
  setSelectItemTwo,
  downloadFile
} from "../../actions/itemActions";
import { Player, Shortcut, ControlBar, BigPlayButton } from "video-react";
import PropTypes from "prop-types";
const path = require("path");

class VideoList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { selectTab: "1" };
    this.toggle = this.toggle.bind(this);
    this.pause = this.pause.bind(this);
  }
  // Run when making an api request (or calling an actions)
  componentDidMount() {
    this.props.getItems();
  }

  toggle = tab => {
    if (tab !== this.state.selectTab) {
      this.setState(state => ({
        selectTab: tab
      }));
    }
  };

  downloadFile = id => {
    console.log("Download id:", id);
    this.props.downloadFile(id);
  };

  pause() {
    this.player.pause();
  }

  render() {
    const { items } = this.props.item;
    console.log("items: ", items);
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={this.state.selectTab === "1" ? "active" : ""}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Video
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.selectTab === "2" ? "active" : ""}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Audio
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.selectTab}>
          <TabPane tabId="1">
            <Row>
              {items.map(({ _id, filename }) => (
                <Col sm="6" key={_id}>
                  <Card body>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        this.props.deleteItem(_id);
                      }}
                    >
                      Delete
                    </Button>
                    <CardTitle>{filename}</CardTitle>
                    <Player key={filename}>
                      <source src={"api/items/" + filename} />
                      <Shortcut
                        clickable={false}
                        dblclickable={false}
                        disabled
                      />
                      <ControlBar disabled />
                      <BigPlayButton disabled />
                    </Player>
                    <ButtonGroup vertical>
                      <Button
                        variant="contained"
                        color="primary"
                        endIcon={<VideoLibraryIcon />}
                        onClick={() => {
                          this.props.setSelectItemOne(filename);
                        }}
                      >
                        Load to player one
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        endIcon={<VideoLibraryIcon />}
                        onClick={() => {
                          this.props.setSelectItemTwo(filename);
                        }}
                      >
                        Load to player two
                      </Button>
                      {/* <a href={filename}>Save</a> */}
                      <Button
                        color="primary"
                        onClick={() => this.downloadFile(_id)}
                      >
                        Save
                      </Button>
                    </ButtonGroup>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              {/*<Col sm="6">*/}
              {/*<Card body>*/}
              {/*<CardTitle>Special Title Treatment</CardTitle>*/}
              {/*<CardText>With supporting text below as a natural lead-in to additional content.</CardText>*/}
              {/*<Button>Go somewhere</Button>*/}
              {/*</Card>*/}
              {/*</Col>*/}
              {/*<Col sm="6">*/}
              {/*<Card body>*/}
              {/*<CardTitle>Special Title Treatment</CardTitle>*/}
              {/*<CardText>With supporting text below as a natural lead-in to additional content.</CardText>*/}
              {/*<Button>Go somewhere</Button>*/}
              {/*</Card>*/}
              {/*</Col>*/}
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
// Mapping a redux state to a component property
const mapStateToProps = state => ({
  // item because we called it that in reducers/index.js (root reducer)
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  getItems,
  deleteItem,
  setSelectItemOne,
  setSelectItemTwo,
  downloadFile
})(VideoList);
