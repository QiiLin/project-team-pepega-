import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardTitle,
  Row,
  Col,
  ButtonGroup
} from "reactstrap";
import { Button, Box } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import { connect } from "react-redux";
import {
  deleteItem,
  getItems,
  setSelectItemOne,
  setSelectItemTwo
} from "../../actions/itemActions";
import PropTypes from "prop-types";
import "../style/Main.css";
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

  pause() {
    this.player.pause();
  }

  render() {
    const { items } = this.props.item;
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

        <TabContent
          activeTab={this.state.selectTab}
          className="overflow_class"
        >
          <TabPane tabId="1">
            <Row>
              {items
                .filter(({contentType}) => (contentType.includes("video") ? true : false))
                .map(({ _id, filename, metadata }) => (                      
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
                    <Box m={0.5} />
                    <CardTitle>{metadata.originalname ? metadata.originalname : filename}</CardTitle>
                    <img src={"api/items/thumbnail/" + _id} className="thumbnail" alt="thumbnail" ></img>
                    {/*<Player key={_id}>
                      <source src={"api/items/" + _id} />
                      <Shortcut
                        clickable={false}
                        dblclickable={false}
                        disabled
                      />
                      <ControlBar disabled />
                      <BigPlayButton disabled />
                    </Player>*/}
                    <Box m={0.5} />
                    <ButtonGroup vertical>
                      <Button
                        variant="contained"
                        color="primary"
                        endIcon={<VideoLibraryIcon />}
                        onClick={() => {
                          this.props.setSelectItemOne(_id);
                        }}
                      >
                        Load to player
                      </Button>
                    </ButtonGroup>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
            {items
                .filter(({contentType}) => (contentType.includes("audio") ? true : false))
                .map(({ _id, filename, metadata }) => (                      
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
                    <Box m={0.5} />
                    <CardTitle>{metadata.originalname ? metadata.originalname : filename}</CardTitle>
                    {/*<img src={"api/items/thumbnail/" + _id} style={{width: '100%', height: '100%'}}></img>*/}                    
                    <Box m={0.5} />
                    <ButtonGroup vertical>
                      <Button
                        variant="contained"
                        color="primary"
                        endIcon={<VideoLibraryIcon />}
                        onClick={() => {
                          this.props.setSelectItemOne(_id);
                        }}
                      >
                        Load to player
                      </Button>
                    </ButtonGroup>
                  </Card>
                </Col>
              ))}
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
  setSelectItemTwo
})(VideoList);
