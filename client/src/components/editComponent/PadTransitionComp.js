import React, { Component } from "react";
import {
  Select,
  InputLabel,
  MenuItem,
  Input,
  Tooltip
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";

class PadTransitionComp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
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
