import React, { Component } from "react";
import { Select, InputLabel, MenuItem, Input } from "@material-ui/core";

class PadTransitionComp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <InputLabel>Add Video Width</InputLabel>
        <Input
          id="padVidWidth"
          style={{ minWidth: 180, marginBottom: 10 }}
          value={this.props.padVidWidth}
          onChange={this.props.padVidWidthChanged}
        ></Input>

        <InputLabel>Add Video Height</InputLabel>
        <Input
          id="padVidHeight"
          style={{ minWidth: 180, marginBottom: 10 }}
          value={this.props.padVidHeight}
          onChange={this.props.padVidHeightChanged}
        ></Input>
        <InputLabel>Add Row</InputLabel>
        <Select
          id="row"
          style={{ minWidth: 180, marginBottom: 10 }}
          value={this.props.padVidRow}
          onChange={this.props.padVidRowChanged}
        >
          {this.props.createStringOptions(100).map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <InputLabel>Add Column</InputLabel>
        <Select
          id="col"
          style={{ minWidth: 180, marginBottom: 10 }}
          value={this.props.padVidCol}
          onChange={this.props.padVidColChanged}
        >
          {this.props.createStringOptions(100).map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <InputLabel>Add Color</InputLabel>
        <Select
          id="color"
          style={{ minWidth: 180, marginBottom: 10 }}
          value={this.props.padVidColor}
          onChange={this.props.padVidColorChanged}
        >
          {this.props.colors.map(color => (
            <MenuItem key={color} value={color}>
              {color}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }
}

export default PadTransitionComp;
