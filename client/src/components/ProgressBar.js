import React from "react";
import TopBarProgress from "react-topbar-progress-indicator";
import { connect } from "react-redux";

TopBarProgress.config({
  barColors: {
    "0": "#239dde",
    "0.5": "#ab18da",
    "1.0": "#e92316"
  },
  shadowBlur: 0,
  barThickness: 8
});

export class ProgressBar extends React.Component {
  render() {
    const { progressBarStatus } = this.props;

    if (progressBarStatus === "OPEN") {
      return <TopBarProgress />;
    } else {
      return "";
    }
  }
}

//redux container component
const mapStateToProps = (state, ownProps) => {
  return {
    progressBarStatus: state.ui.progressBarStatus
  };
};

export const HandleProgressBar = connect(mapStateToProps, null)(ProgressBar);

export default HandleProgressBar;
