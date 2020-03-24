import React from "react";
import {
  Grid,
  Select,
  Button,
  InputLabel,
  MenuItem,
  Box,
  Input,
  Tooltip
} from "@material-ui/core";
import MergeTypeIcon from "@material-ui/icons/MergeType";
import {
  addCapation,
  captionClip,
  mergeClip,
  set_sync,
  trimClip,
  transitionClip
} from "../../actions/editActions";
import EjectIcon from "@material-ui/icons/Eject";
import { HelpIcon } from "@material-ui/icons/Help";
import FiberSmartRecordIcon from "@material-ui/icons/FiberSmartRecord";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import CaptionListView from "../CaptionListView";

String.prototype.toHHMMSS = function() {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};

let createStringOptions = () => {
  let options = [];
  for (let i = 0; i < 100; i++) {
    options.push(i.toString());
  }
  return options;
};

class EditOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      merge_dropdownValue: "",
      transition_dropdownValue: "",
      transition_startFrame: "",
      transition_endFrame: ""
    };
    this.addCaption = this.addCaption.bind(this);
    this.burnVideo = this.burnVideo.bind(this);
  }

  static propTypes = {
    item: PropTypes.object.isRequired,
    user: PropTypes.object,
    duration: PropTypes.number,
    isAuthenticated: PropTypes.bool
  };

  trim_Submit = selectItemOne => {
    const { videoOneSelection } = this.props.item;
    let bodyFormData = new FormData();
    bodyFormData.append("timestampStart", videoOneSelection[0]);
    bodyFormData.append("timestampEnd", videoOneSelection[1]);

    this.props.trimClip(selectItemOne, bodyFormData);
  };

  merge_dropdownSubmit = selectItemOne => {
    let bodyFormData = new FormData();
    bodyFormData.append("curr_vid_id", selectItemOne);
    bodyFormData.append("merge_vid_id", this.state.merge_dropdownValue);

    // Add video through add item action
    this.props.mergeClip(bodyFormData);
  };

  merge_dropdownChanged = event => {
    this.setState(() => {
      return {
        merge_dropdownValue: event.target.value
      };
    });
  };

  transition_dropdownSubmit = selectItemOne => {
    let bodyFormData = new FormData();
    bodyFormData.append("vid_id", selectItemOne);
    // console.log(this.state.transition_dropdownValue);
    bodyFormData.append("transitionType", this.state.transition_dropdownValue);
    bodyFormData.append(
      "transitionStartFrame",
      this.state.transition_startFrame
    );
    bodyFormData.append("transitionEndFrame", this.state.transition_endFrame);

    // Add transition effects through an item action
    this.props.transitionClip(selectItemOne, bodyFormData);
  };

  transition_dropdownChanged = event => {
    this.setState(() => {
      return {
        transition_dropdownValue: event.target.value
      };
    });
  };

  transition_startFrameChanged = event => {
    this.setState(() => {
      return {
        transition_startFrame: event.target.value
      };
    });
  };

  transition_endFrameChanged = event => {
    this.setState(() => {
      return {
        transition_endFrame: event.target.value
      };
    });
  };

  addCaption = () => {
    const { videoOneSelection } = this.props.item;
    const { captionValue, captions } = this.props.edit;
    let startTime = parseInt(videoOneSelection[0], 10) + "";
    let endTime = parseInt(videoOneSelection[1], 10) + "";
    let curr = {
      start_time: startTime.toHHMMSS() + ",000",
      end_time: endTime.toHHMMSS() + ",000",
      text: captionValue,
      index: captions.length + 1
    };
    this.props.addCapation(curr);
  };

  burnVideo = () => {
    // getting stuff for
    const { selectItemOne } = this.props.item;
    const { captions } = this.props.edit;
    this.props.captionClip(selectItemOne, captions);
  };
  render() {
    // console.log(this.props.item);
    // console.log(this.props.item.videoOneSelection);
    const { items, selectItemOne } = this.props.item;
    const transitionTypes = ["fade=in", "fade=out", "pad"];
    return (
      <div>
        <Grid key="merge_grid" container>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <InputLabel>Select a video to merge</InputLabel>
              <Select
                className="edit-dropdown"
                style={{ minWidth: 180 }}
                value={this.state.merge_dropdownValue}
                onChange={this.merge_dropdownChanged}
              >
                {items.map(({ _id, filename }) => (
                  <MenuItem
                    className="edit-dropdown-item"
                    key={_id}
                    value={filename}
                  >
                    {filename}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                color="primary"
                endIcon={<MergeTypeIcon />}
                onClick={this.merge_dropdownSubmit.bind(this, selectItemOne)}
              >
                Merge
              </Button>
            </Grid>
            <Box m={2} />
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <InputLabel>Add Transition Effect</InputLabel>
              {/* <Tooltip title="To add a transition effect, indicate the start and end frame in the format of dd (eg. 00, 30)"> */}
              {/* <HelpIcon /> */}
              {/* </Tooltip> */}
              <Select
                className="transition-dropdown"
                style={{ minWidth: 180, marginBottom: 10 }}
                value={this.state.transition_dropdownValue}
                onChange={this.transition_dropdownChanged}
              >
                {transitionTypes.map(type => (
                  <MenuItem
                    className="transition-dropdown-item"
                    key={type}
                    value={type}
                  >
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {this.state.transition_dropdownValue.includes("fade") ? (
                <div>
                  <InputLabel>Add Transition Start Frame</InputLabel>
                  <Select
                    id="startFrame"
                    style={{ minWidth: 180, marginBottom: 10 }}
                    value={this.state.transition_startFrame}
                    onChange={this.transition_startFrameChanged}
                  >
                    {createStringOptions().map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  <InputLabel>Add Transition End Frame</InputLabel>
                  <Select
                    id="endFrame"
                    style={{ minWidth: 180, marginBottom: 10 }}
                    value={this.state.transition_endFrame}
                    onChange={this.transition_endFrameChanged}
                  >
                    {createStringOptions().map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              ) : null}

              {this.state.transition_dropdownValue.includes("pad") ? (
                <div></div>
              ) : null}

              <Button
                variant="contained"
                color="primary"
                endIcon={<FiberSmartRecordIcon />}
                onClick={this.transition_dropdownSubmit.bind(
                  this,
                  selectItemOne
                )}
              >
                Add Effect
              </Button>
            </Grid>
            <Box m={2} />
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <InputLabel>Trim Video</InputLabel>
              <Button
                variant="contained"
                color="primary"
                endIcon={<EjectIcon />}
                onClick={this.trim_Submit.bind(this, selectItemOne)}
              >
                Trim
              </Button>
            </Grid>
          </Grid>
          <Grid></Grid>
        </Grid>
        <Button color="primary" onClick={() => this.props.set_sync()}>
          Sync range selector
        </Button>
        <Button onClick={() => this.addCaption()}>Add to Caption</Button>
        <Button onClick={() => this.burnVideo()}>Burn it into video</Button>
        <CaptionListView />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  edit: state.edit,
  user: state.auth.user,
  duration: state.edit.duration,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  mergeClip,
  trimClip,
  transitionClip,
  set_sync,
  addCapation,
  captionClip
})(EditOption);
