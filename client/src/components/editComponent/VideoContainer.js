import React, { Component } from "react";
import {
  Player,
  ControlBar,
  BigPlayButton,
  LoadingSpinner,
  ReplayControl,
  ForwardControl
} from "video-react";
import { connect } from "react-redux";
import { Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import { set_duration, setCurrProgress } from "../../actions/editActions";

class VideoContainer extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { selectTab: "1" };
    this.toggle = this.toggle.bind(this);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
  }

  toggle = tab => {
    if (tab !== this.state.selectTab) {
      this.setState(state => ({
        selectTab: tab
      }));
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  changeCurrentTime(seconds) {
    console.log("Current time: ", seconds);
    return () => {
      this.player.seek(seconds);
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.item.selectItemOne !== this.props.item.selectItemOne;
  }

  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({
      player: state
    });
    console.log("weqweqweqwe");
    const { player } = this.player.getState();
    console.log("Current time: ", player.currentTime);
    this.props.set_duration(player.duration);
    this.props.setCurrProgress(player.currentTime);
  }
  render() {
    // Note selectedFile is from VideoList
    // TODO: Update the placeholder for video
    const { selectItemOne, selectItemTwo } = this.props.item;
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
              Video One
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.selectTab === "2" ? "active" : ""}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Video Two
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.selectTab}>
          <TabPane tabId="1">
            <Row>
              {selectItemOne ? (
                <Player
                  key={selectItemOne}
                  ref={player => {
                    this.player = player;
                  }}
                >
                  <BigPlayButton position="center" />
                  <LoadingSpinner />
                  <ControlBar>
                    <ReplayControl seconds={5} order={2.1} />
                    <ForwardControl seconds={5} order={3.1} />
                  </ControlBar>
                  <source src={"api/items/" + selectItemOne} />
                </Player>
              ) : (
                <Player
                  key={selectItemOne}
                  ref={player => {
                    this.player = player;
                  }}
                >
                  <source src={"http://www.w3schools.com/html/mov_bbb.mp4"} />
                </Player>
              )}
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              {selectItemTwo ? (
                <Player key={selectItemOne}>
                  <source src={"api/items/" + selectItemTwo} />
                </Player>
              ) : (
                <p> No video </p>
              )}
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
  //   progress: state.VideoContainer.progress,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { set_duration, setCurrProgress })(
  VideoContainer
);
