import React from "react";
import {
  Grid,
  Select,
  Button,
  InputLabel,
  MenuItem,
  Box,
  Tooltip
} from "@material-ui/core";
import MergeTypeIcon from "@material-ui/icons/MergeType";
import HelpIcon from "@material-ui/icons/Help";
import {
  addCapation,
  captionClip,
  mergeClip,
  set_sync,
  trimClip,
  transitionClip,
  addChroma,
  setEnableCap,
  saveMP3,
  addAudToVid,
  setFilename
} from "../../actions/editActions";
import EjectIcon from "@material-ui/icons/Eject";
import FiberSmartRecordIcon from "@material-ui/icons/FiberSmartRecord";
import AcUnitIcon from '@material-ui/icons/AcUnit';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import AddIcon from '@material-ui/icons/Add';
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import CaptionListView from "../CaptionListView";
import PadTransitionComp from "./PadTransitionComp";
import FadeTransitionComp from "./FadeTransitionComp";
import {setVideoOneRange, setVideoTwoRange} from "../../actions/itemActions";
import TimeLineSector from "./TimeLineSector";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {setLoading, setProgress} from "../../actions/editActions";
import {InputGroup, Input} from 'reactstrap';
import TextField from '@material-ui/core/TextField';

import SingleRecorder from "./Recorder";

String.prototype.toHHMMSS = function () {
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

let createStringOptions = options => {
  let optionsList = [];
  for (let i = 0; i < options; i++) {
    optionsList.push(i.toString());
  }
  return optionsList;
};

class EditOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      merge_dropdownValue: "",
      transition_dropdownValue: "",
      transition_startFrame: "",
      transition_endFrame: "",
      transition_paddingVidWidth: "",
      transition_paddingVidHeight: "",
      transition_paddingVidRow: "",
      transition_paddingVidCol: "",
      transition_paddingColor: "",
      chroma_dropdownValue: "",
      record: false,
      audio_dropdownValue: "",
      video_dropdownValue: ""
    };
    this.addCaption = this.addCaption.bind(this);
    this.burnVideo = this.burnVideo.bind(this);
    this.setOneRange = this.setOneRange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  setOneRange = value => {
    this.props.setVideoOneRange(value);
  };

  static propTypes = {
    item: PropTypes.object.isRequired,
    user: PropTypes.object,
    duration: PropTypes.number,
    isAuthenticated: PropTypes.bool
  };

  trim_Submit = selectItemOne => {
    const {videoOneSelection} = this.props.item;
    let bodyFormData = new FormData();
    bodyFormData.append("timestampStart", videoOneSelection[0]);
    bodyFormData.append("timestampEnd", videoOneSelection[1]);

    this.props.trimClip(selectItemOne, bodyFormData);
  };

  merge_dropdownSubmit = selectItemOne => {
    let bodyFormData = new FormData();
    bodyFormData.append("curr_vid_id", selectItemOne);
    bodyFormData.append("merge_vid_id", this.state.merge_dropdownValue);
    bodyFormData.append("uploader_id", this.props.user._id);

    // Add video through add item action
    this.props.mergeClip(bodyFormData);
  };

  merge_dropdownChanged = event => {
    this.setState(() => {
      return {merge_dropdownValue: event.target.value};
    });
  };

  transition_dropdownSubmit = selectItemOne => {
    let bodyFormData = new FormData();
    bodyFormData.append("vid_id", selectItemOne);
    // console.log(this.state.transition_dropdownValue);
    bodyFormData.append("transitionType", this.state.transition_dropdownValue);
    bodyFormData.append("transitionStartFrame", this.state.transition_startFrame);
    bodyFormData.append("transitionEndFrame", this.state.transition_endFrame);
    bodyFormData.append("transition_paddingVidWidth", this.state.transition_paddingVidWidth);
    bodyFormData.append("transition_paddingVidHeight", this.state.transition_paddingVidHeight);
    bodyFormData.append("transition_paddingColor", this.state.transition_paddingColor);
    bodyFormData.append("transition_paddingVidRow", this.state.transition_paddingVidRow);
    bodyFormData.append("transition_paddingVidCol", this.state.transition_paddingVidCol);

    // Add transition effects through an item action
    this
      .props
      .transitionClip(selectItemOne, bodyFormData);
  };

  transition_dropdownChanged = event => {
    this.setState(() => {
      return {transition_dropdownValue: event.target.value};
    });
  };

  transition_startFrameChanged = event => {
    this.setState(() => {
      return {transition_startFrame: event.target.value};
    });
  };

  transition_endFrameChanged = event => {
    this.setState(() => {
      return {transition_endFrame: event.target.value};
    });
  };

  transition_paddingVidWidthChanged = event => {
    event.persist();
    this.setState(() => {
      return {transition_paddingVidWidth: event.target.value};
    });
  };

  transition_paddingVidHeightChanged = event => {
    event.persist();
    this.setState(() => {
      return {transition_paddingVidHeight: event.target.value};
    });
  };

  transition_paddingColorChanged = event => {
    this.setState(() => {
      return {transition_paddingColor: event.target.value};
    });
  };

  transition_paddingVidColChanged = event => {
    console.log(event);
    this.setState(() => {
      return {transition_paddingVidCol: event.target.value};
    });
  };

  transition_paddingVidRowChanged = event => {
    console.log(event);
    this.setState(() => {
      return {transition_paddingVidRow: event.target.value};
    });
  };

  chroma_dropdownSubmit = selectItemOne => {
    let bodyFormData = new FormData();
    bodyFormData.append("vid_id", selectItemOne);
    bodyFormData.append("command", this.state.chroma_dropdownValue);
    this
      .props
      .addChroma(selectItemOne, bodyFormData);
  };

  chroma_dropdownChanged = event => {
    event.persist();
    console.log(event.target.value);
    this.setState(() => {
      return {chroma_dropdownValue: event.target.value};
    });
  };

  addAudToVid_dropdownSubmit = selectItemOne => {
    console.log("id: ", selectItemOne)
    let bodyFormData = new FormData();
    bodyFormData.append("vid_id", selectItemOne);
    bodyFormData.append("audio_id", this.state.audio_dropdownValue);
    // bodyFormData.append("video", this.state.video_dropdownValue);
    this
      .props
      .addAudToVid(selectItemOne, bodyFormData)
  }

  audio_dropdownChanged = event => {
    event.persist();
    console.log(event.target.value);
    this.setState(() => {
      return {audio_dropdownValue: event.target.value};
    });
    console.log(this.state.audio_dropdownValue)
  };

  video_dropdownChanged = event => {
    event.persist();
    console.log(event.target.value);
    this.setState(() => {
      return {video_dropdownValue: event.target.value};
    });
  };

  addCaption = () => {
    const {videoOneSelection} = this.props.item;
    const {captionValue, captions} = this.props.edit;
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
    const {selectItemOne} = this.props.item;
    const {captions} = this.props.edit;
    this.props.captionClip(selectItemOne, captions);
  };

  saveMP3 = (file) => {
    console.log("saveMP3 called")
    console.log("file: ", file)
    // const { selectItemOne } = this.props.item;
    let bodyFormData = new FormData();
    bodyFormData.append("mp3file", file);
    this.props.saveMP3(bodyFormData);
  }

  handleChange = (event) => {
    this.props.setFilename(event.target.value);
  }

  render() {
    // console.log(this.props.item); console.log(this.props.item.videoOneSelection);
    const {items, selectItemOne} = this.props.item;
    const transitionTypes = ["fade=in", "fade=out", "pad"];
    const colors = [
      "red",
      "green",
      "blue",
      "yellow",
      "violet",
      "black",
      "white",
      "cyans"
    ];
    const chromaChoices = ["Add Cloud", "Add Dancing Banana"]; //"Kaleidoscope", "Circular"

    const classes = makeStyles((theme) => ({
      root: {
        flexGrow: 1
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
      }
    }));
    // const chromaChoices = ["Add Cloud", "Add Dancing Banana"]; //"Kaleidoscope",
    // "Circular" const audioExts = ["mp3", "aac", "ac3", "eac3", "ogg", "wma",
    // "wav", "l16", "aiff", "au", "pcm"] const videoExts = ["mp4", "m4a", "m4v",
    // "f4v", "f4a", "m4b", "m4r", "f4b", "mov", "3gp", "webm"]
    const {durationVideoOne} = this.props.edit;
    return (
      <div>
        <TimeLineSector
          title="Here is range select for the video"
          callback={this.setOneRange}
          videoReference="1"/>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.props.set_sync()}>
            Sync range selector
          </Button>
          <Tooltip
            title="This file name is for the following operation, if it is not specificed, the
          generated random id will be used as the new filename">
            <HelpIcon/>
          </Tooltip>
          <TextField label="New File Name" onChange={this.handleChange}/>
        </div>
        <br/>
        <Grid container direction="row" justify="space-around" alignItems="flex-start">
          <Grid>
            <InputLabel>Select a video to merge</InputLabel>
            <Select
              className="edit-dropdown"
              style={{
              minWidth: 180
            }}
              value={this.state.merge_dropdownValue}
              onChange={this.merge_dropdownChanged}>
              {items.map(({_id, filename}) => (
                <MenuItem className="edit-dropdown-item" key={_id} value={_id}>
                  {filename}
                </MenuItem>
              ))}
            </Select>
            <br/>
            <Tooltip title="This take few mins" arrow>
              <Button
                variant="contained"
                color="primary"
                endIcon={< MergeTypeIcon />}
                onClick={this
                .merge_dropdownSubmit
                .bind(this, selectItemOne)}>
                Merge
              </Button>
            </Tooltip>
          </Grid>
          <Grid>
            <InputLabel>Add Transition Effect</InputLabel>
            <Select
              className="transition-dropdown"
              style={{
              minWidth: 180,
              marginBottom: 10
            }}
              value={this.state.transition_dropdownValue}
              onChange={this.transition_dropdownChanged}>
              {transitionTypes.map(type => (
                <MenuItem className="transition-dropdown-item" key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>

            {/* If the user chose fade=in or fade=out */}
            {this
              .state
              .transition_dropdownValue
              .includes("fade")
              ? (<FadeTransitionComp
                transStart={this.state.transition_startFrame}
                transStartChanged={this.transition_startFrameChanged}
                transEnd={this.state.transition_endFrame}
                transEndChanged={this.transition_endFrameChanged}
                createStringOptions={createStringOptions}
                duration={durationVideoOne}/>)
              : null}

            {/* If the user chooses pad */}
            {this
              .state
              .transition_dropdownValue
              .includes("pad")
              ? (<PadTransitionComp
                padVidWidth={this.state.transition_paddingVidWidth}
                padVidWidthChanged={this.transition_paddingVidWidthChanged}
                padVidHeight={this.state.transition_paddingVidHeight}
                padVidHeightChanged={this.transition_paddingVidHeightChanged}
                padVidRow={this.state.transition_paddingVidRow}
                padVidRowChanged={this.transition_paddingVidRowChanged}
                padVidCol={this.state.transition_paddingVidCol}
                padVidColChanged={this.transition_paddingVidColChanged}
                padVidColor={this.state.transition_paddingColor}
                padVidColorChanged={this.transition_paddingColorChanged}
                createStringOptions={createStringOptions}
                colors={colors}/>)
              : null}
            <Button
              variant="contained"
              color="primary"
              endIcon={< FiberSmartRecordIcon />}
              onClick={this
              .transition_dropdownSubmit
              .bind(this, selectItemOne)}>
              Add Transition Effect
            </Button>
          </Grid>
          <Grid>
            <InputLabel>Trim Video
              <Tooltip title="The Trim range is selected by the range selector ">
                <HelpIcon/>
              </Tooltip>

            </InputLabel>

            <Button
              variant="contained"
              color="primary"
              endIcon={< EjectIcon />}
              onClick={this
              .trim_Submit
              .bind(this, selectItemOne)}>
              Trim
            </Button>
          </Grid>
          <Grid>
            {/*<InputLabel>Add special effects</InputLabel>
              <Select
                className="chroma-dropdown"
                style={{ minWidth: 180, marginBottom: 10 }}
                value={this.state.chroma_dropdownValue}
                onChange={this.chroma_dropdownChanged}
              >
                {chromaChoices.map(type => (
                  <MenuItem
                    className="chroma-dropdown-item"
                    key={type}
                    value={type}
                  >
                    {type}
                  </MenuItem>
                ))}
              </Select>

              <Button
                variant="contained"
                color="primary"
                endIcon={<AcUnitIcon />}
                onClick={this.chroma_dropdownSubmit.bind(this, selectItemOne)}
              >
                Add Special Effect
                </Button>
              <Button
                variant="contained"
                color="primary"
                endIcon={<SystemUpdateAltIcon />}
                href="http://localhost:3333">
                Download
              </Button>*/}
          </Grid>

        </Grid>
        <br/>
        <Grid container direction="row" justify="space-around" alignItems="flex-start">
          <Grid>
            <InputLabel>
              Caption
              <Tooltip
                title="The Caption is Added by the input field highlight on the video and the range selector ">
                <HelpIcon/>
              </Tooltip>
            </InputLabel>

            <Button variant="contained" color="primary" onClick={this.props.setEnableCap}>
              Toggle Caption Input Field
            </Button>
          </Grid>
          <Grid>
            {this.props.isWanted
              ? (
                <div>
                  <InputLabel>Added Caption Reords</InputLabel>
                  <Button variant="contained" color="primary" onClick={() => this.addCaption()}>Add to Caption</Button>
                  <Button variant="contained" color="primary" onClick={() => this.burnVideo()}>Burn it into video</Button>
                </div>
              )
              : (
                <div></div>
              )}
            <br/>
            <CaptionListView/>
          </Grid>
          <br/>
          <Grid>
            <InputLabel>Record</InputLabel>
            <SingleRecorder saveMP3={this.saveMP3}/>
          </Grid>
        </Grid>
        <br/>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  edit: state.edit,
  user: state.auth.user,
  duration: state.edit.duration,
  isWanted: state.edit.isWanted,
  isAuthenticated: state.auth.isAuthenticated,
  newFileName: state.edit.newFileName
});

export default connect(mapStateToProps, {
  mergeClip,
  trimClip,
  transitionClip,
  set_sync,
  addCapation,
  captionClip,
  addChroma,
  setVideoOneRange,
  setEnableCap,
  setLoading,
  setProgress,
  saveMP3,
  addAudToVid,
  setFilename
})(EditOption);
