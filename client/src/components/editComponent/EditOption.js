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
  addCaption,
  captionClip,
  mergeClip,
  set_sync,
  trimClip,
  cutClip,
  transitionClip,
  setEnableCap,
  saveMP3,
  addAudToVid,
  setFilename
} from "../../actions/editActions";
import EjectIcon from "@material-ui/icons/Eject";
import FiberSmartRecordIcon from "@material-ui/icons/FiberSmartRecord";
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import AddIcon from '@material-ui/icons/Add';
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import CaptionListView from "../CaptionListView";
import {setVideoOneRange, setVideoTwoRange} from "../../actions/itemActions";
import TimeLineSector from "./TimeLineSector";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {setLoading, setProgress} from "../../actions/editActions";
import TextField from '@material-ui/core/TextField';
import SingleRecorder from "./Recorder";
import { returnErrors } from "../../actions/errorActions";

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

class EditOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      merge_dropdownValue: "",
      transition_dropdownValue: "",
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
    const {_id} = this.props.user;

    this.props.trimClip(selectItemOne, _id, videoOneSelection, this.props.newFileName);
  };

  cut_Submit = selectItemOne => {
    const {videoOneSelection} = this.props.item;
    const {_id} = this.props.user;

    this.props.cutClip(selectItemOne, _id, videoOneSelection, this.props.newFileName);
  };

  merge_dropdownSubmit = selectItemOne => {
    const {_id} = this.props.user;
    // Add video through add item action
    this.props.mergeClip(selectItemOne, _id, this.state.merge_dropdownValue, this.props.newFileName);
  };

  merge_dropdownChanged = event => {
    this.setState(() => {
      return {merge_dropdownValue: event.target.value};
    });
  };

  transition_dropdownSubmit = selectItemOne => {    
    const {videoOneSelection} = this.props.item;
    const {_id} = this.props.user;

    // Add transition effects through an item action
    this
      .props
      .transitionClip(selectItemOne, _id, videoOneSelection, this.state.transition_dropdownValue, this.props.newFileName);
  };

  transition_dropdownChanged = event => {
    this.setState(() => {
      return {transition_dropdownValue: event.target.value};
    });
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
    this.props.addAudToVid(selectItemOne, bodyFormData)
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
    if(isNaN(videoOneSelection[0]) || isNaN(videoOneSelection[1])){
      returnErrors("Range selector must be set", 400);
    }else{
      let startTime = parseInt(videoOneSelection[0], 10) + "";
      let endTime = parseInt(videoOneSelection[1], 10) + "";
      let curr = {
        start_time: startTime.toHHMMSS() + ",000",
        end_time: endTime.toHHMMSS() + ",000",
        text: captionValue,
        index: captions.length + 1
      };
      this.props.addCaption(curr);
    }
  };

  burnVideo = () => {
    // getting stuff for
    const {selectItemOne} = this.props.item;
    const {captions} = this.props.edit;
    const {_id} = this.props.user;
    this.props.captionClip(selectItemOne, _id, captions, this.props.newFileName);
  };

  saveMP3 = (file) => {
    const {_id} = this.props.user;
    let bodyFormData = new FormData();
    bodyFormData.append("mp3file", file);
    bodyFormData.append("uploader_id", _id);
    bodyFormData.append("filename", this.props.newFileName);
    this.props.saveMP3(bodyFormData);
  }

  handleChange = (event) => {
    this.props.setFilename(event.target.value);
  }

  render() {
    // console.log(this.props.item); console.log(this.props.item.videoOneSelection);
    const {items, selectItemOne} = this.props.item;
    const transitionTypes = [
      {"description": "Fade In", "command": "fade=in"},
      {"description": "Fade Out", "command": "fade=out"}];

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
          {/*<Button
            variant="contained"
            color="primary"
            onClick={() => this.props.set_sync()}>
            Sync range selector
          </Button>*/}
          <TextField label="New File Name" onChange={this.handleChange}/>
          <Tooltip
            title="This file name is for the following operation, if it is not specificed, the
          generated random id will be used as the new filename">
            <HelpIcon/>
          </Tooltip>          
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
              {items
                .filter(({contentType}) => (contentType.includes("video") ? true : false))
                .filter(({metadata}) => (metadata == null ? false : !(metadata.originalname === undefined)))
                .map(({_id, metadata}) => (
                <MenuItem className="edit-dropdown-item" key={_id} value={_id}>
                  {metadata.originalname}
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
              {transitionTypes.map(({description, command}) => (
                <MenuItem className="transition-dropdown-item" key={command} value={command}>
                  {description}
                </MenuItem>
              ))}
            </Select>
            <br/>
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
            <br/>
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
            <InputLabel>Cut
              <Tooltip title="The Cut range is selected by the range selector ">
                <HelpIcon/>
              </Tooltip>
            </InputLabel>        
            <br/>
              <Button
                variant="contained"
                color="primary"
                endIcon={< LocalDiningIcon />}
                onClick={this
                .cut_Submit
                .bind(this, selectItemOne)}>
                Cut
              </Button>
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
  cutClip,
  transitionClip,
  set_sync,
  addCaption,
  captionClip,
  setVideoOneRange,
  setEnableCap,
  setLoading,
  setProgress,
  saveMP3,
  addAudToVid,
  setFilename
})(EditOption);
