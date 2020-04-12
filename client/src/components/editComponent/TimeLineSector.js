import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import connect from "react-redux/es/connect/connect";

const useStyles = {
  root: {
    width: 300
  }
};

let valuetext = value => {
  return `${value} %`;
};

let roundUp = videoLength => {
  return parseFloat(videoLength.toFixed(2));
};

/**
 * This creates a timeline selector to select the vidoe start and end
 * Which is being used for other edit action
 */
class TimeLineSector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newValue: [0, 100] };
    this.handleChange = this.handleChange.bind(this);
  }

  // handle video switching on different vidoes
  componentDidMount() {
    const { durationVideoOne, durationVideoTwo } = this.props.currentEdit;
    this.setState(state => ({
      newValue: [
        0,
        this.props.videoReference === "1" ? durationVideoOne : durationVideoTwo
      ]
    }));
  }
  // bind change with the state
  handleChange = (event, newValue) => {
    this.setState(state => ({
      newValue: newValue
    }));
    this.props.callback(newValue);
  };

  render() {
    // get the duration of videos
    const { durationVideoOne, durationVideoTwo } = this.props.currentEdit;
    return (
      <div className={useStyles.root}>
        <Typography id="range-slider" gutterBottom>
          {this.props.title}
        </Typography>
        <Slider
          value={this.state.newValue}
          min={0}
          max={
            this.props.videoReference === "1"
              ? roundUp(durationVideoOne ? durationVideoOne : 0)
              : roundUp(durationVideoTwo ? durationVideoTwo : 0)
          }
          onChange={this.handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </div>
    );
  }
}

// Mapping a redux state to a component property
const mapStateToProps = state => ({
  // item because we called it that in reducers/index.js (root reducer)
  item: state.item,
  currentEdit: state.edit,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {})(TimeLineSector);
