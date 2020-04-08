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
  Media,
  ButtonGroup
} from "reactstrap";
import { Button, Box, CardMedia } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import { connect } from "react-redux";
import {
  deleteItem,
  getItems,
  setSelectItemOne,
  setSelectItemTwo
} from "../../actions/itemActions";
import { Player, Shortcut, ControlBar, BigPlayButton } from "video-react";
import PropTypes from "prop-types";

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
          style={{ maxHeight: 600, overflow: "auto" }}
        >
          <TabPane tabId="1">
            <Row>              
              {items
                .filter(({metadata}) => (metadata == null ? false : metadata.video_id === undefined))
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
                    <img src={"api/items/thumbnail/" + _id} style={{width: '100%', height: '100%'}}></img>
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
                        Load to player one
                      </Button>
                      <Box m={0.5} />
                      <Button
                        variant="contained"
                        color="primary"
                        endIcon={<VideoLibraryIcon />}
                        onClick={() => {
                          this.props.setSelectItemTwo(_id);
                        }}
                      >
                        Load to player two
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
  setSelectItemTwo
})(VideoList);
