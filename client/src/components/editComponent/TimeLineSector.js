import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = {
  root: {
    width: 300
  }
};

function valuetext(value) {
  return `${value} %`;
}

class TimeLineSector extends React.Component {
  //TODO get data for the represented video and set the range of this correctly
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { newValue: [0, 100] };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, newValue) => {
    console.log(newValue);
    this.setState(state => ({
      newValue: newValue
    }));
    this.props.callback(newValue);
  };

  render() {
    console.log("TimeLineSector this.props: ", this.props);
    // const classes = useStyles();
    return (
      <div className={useStyles.root}>
        <Typography id="range-slider" gutterBottom>
          {this.props.title}
        </Typography>
        <Slider
          value={this.state.newValue}
          onChange={this.handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </div>
    );
  }
}


export default TimeLineSector;
