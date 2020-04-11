import React, { Component } from "react";
import { Select, InputLabel, MenuItem } from "@material-ui/core";

class FadeTransitionComp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <InputLabel>Add Transition Start Time</InputLabel>
        <Select
          id="startFrame"
          style={{ minWidth: 180, marginBottom: 10 }}
          value={this.props.transStart}
          onChange={this.props.transStartChanged}
        >
          {this.props.createStringOptions(this.props.duration).map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <InputLabel>Add Transition End Time</InputLabel>
        <Select
          id="endFrame"
          style={{ minWidth: 180, marginBottom: 10 }}
          value={this.props.transEnd}
          onChange={this.props.transEndChanged}
        >
          {this.props.createStringOptions(this.props.duration).map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }
}

export default FadeTransitionComp;
