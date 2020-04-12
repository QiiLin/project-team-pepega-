import React, { Component } from "react";
import { Box } from "@material-ui/core/";
import { setDurationOne, setDurationTwo } from "../../actions/editActions";
import { Player } from "video-react";
import { connect } from "react-redux";
import '../style/Main.css';

/**
 * This Component creates the video player
 */
class VideoContainer extends Component {  
  constructor(props) {
    super(props);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // subscribe state change wiht the video player library
    this.player1.subscribeToStateChange(this.handleStateChangeOne.bind(this));
  }
  
  changeCurrentTime(seconds) {
    return () => {
      this.player1.seek(seconds);
    };
  }

  handleStateChangeOne(state) {
    // copy player state to this component's state
    this.setState({
      player1: state
    });
    const { player } = this.player1.getState();
    this.props.setDurationOne(player.duration);
  }

  render() {
    // Get the video item from the 
    const { selectItemOne } = this.props.item;
    const playerOneSource = selectItemOne
      ? "api/items/" + selectItemOne
      : "https://www.w3schools.com/html/mov_bbb.mp4";    
    return (
      <div>
        <Box
          display={this.state.selectTab === "1" ? "block" : "none"}
          value="1"
        >
          <div>
            <div>
              <Player
                fluid={false} width={"100%"} height={630}
                key={selectItemOne}
                ref={player => {
                  this.player1 = player;
                }}
              >
                <source src={playerOneSource} />
              </Player>
            </div>
          </div>
        </Box>
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
export default connect(mapStateToProps, { setDurationOne, setDurationTwo })(
  VideoContainer
);
