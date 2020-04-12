import React from "react";
import {
  Grid,
  Select,
  Button,
  InputLabel,
  MenuItem,
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
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import CaptionListView from "../CaptionListView";
import {setVideoOneRange} from "../../actions/itemActions";
import TimeLineSector from "./TimeLineSector";
import {makeStyles} from '@material-ui/core/styles';
import {setLoading, setProgress} from "../../actions/editActions";
import TextField from '@material-ui/core/TextField';
import SingleRecorder from "./Recorder";

/**
 * This function will take the number string in term of second
 * and convert to the HHMMSS format.
 */
String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10);
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

/**
 * This componenet create all the edit button 
 * in a container
 */
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
  
  // update the range selector and make align with redux
  setOneRange = value => {
    this.props.setVideoOneRange(value);
  };

  static propTypes = {
    item: PropTypes.object.isRequired,
    user: PropTypes.object,
    duration: PropTypes.number,
    isAuthenticated: PropTypes.bool
  };

  // preform trim operation by invoking action function
  trim_Submit = selectItemOne => {
    const {videoOneSelection} = this.props.item;
    const {_id} = this.props.user;
    this.props.trimClip(selectItemOne, _id, videoOneSelection, this.props.newFileName);
  };

  // preform cut operation by invoking action function
  cut_Submit = selectItemOne => {
    const {videoOneSelection} = this.props.item;
    const {_id} = this.props.user;

    this.props.cutClip(selectItemOne, _id, videoOneSelection, this.props.newFileName);
  };

  // perform merge operation by invoking action function
  merge_dropdownSubmit = selectItemOne => {
    const {_id} = this.props.user;
    // Add video through add item action
    this.props.mergeClip(selectItemOne, _id, this.state.merge_dropdownValue, this.props.newFileName);
  };

  // bind the state change with the merge drop down menu
  merge_dropdownChanged = event => {
    this.setState(() => {
      return {merge_dropdownValue: event.target.value};
    });
  };

  // perform transition operation by invoking action function
  transition_dropdownSubmit = selectItemOne => {    
    const {videoOneSelection} = this.props.item;
    const {_id} = this.props.user;
    // Add transition effects through an item action
    this.props.transitionClip(selectItemOne, _id, videoOneSelection, this.state.transition_dropdownValue, this.props.newFileName);
  };
  // bind the state change with the transition drop down menu
  transition_dropdownChanged = event => {
    this.setState(() => {
      return {transition_dropdownValue: event.target.value};
    });
  };

  // bind the state change with the chroma drop down menu
  chroma_dropdownChanged = event => {
    event.persist();
    console.log(event.target.value);
    this.setState(() => {
      return {chroma_dropdownValue: event.target.value};
    });
  };

  // perform add Audio to Video operation by invoking addAudtoVid function
  addAudToVid_dropdownSubmit = selectItemOne => {
    console.log("id: ", selectItemOne)
    let bodyFormData = new FormData();
    bodyFormData.append("vid_id", selectItemOne);
    bodyFormData.append("audio_id", this.state.audio_dropdownValue);
    this.props.addAudToVid(selectItemOne, bodyFormData)
  }

  // bind the audio select dropdown selection with current state
  audio_dropdownChanged = event => {
    event.persist();
    console.log(event.target.value);
    this.setState(() => {
      return {audio_dropdownValue: event.target.value};
    });
    console.log(this.state.audio_dropdownValue)
  };

  // bind the video select dropdown selection with current state
  video_dropdownChanged = event => {
    event.persist();
    console.log(event.target.value);
    this.setState(() => {
      return {video_dropdownValue: event.target.value};
    });
  };

  // perform add caption to caption list by invoking addCaption function
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
    this.props.addCaption(curr);
  };

  // perform burn caption list into video by invoking captionClip function
  burnVideo = () => {
    // getting stuff for
    const {selectItemOne} = this.props.item;
    const {captions} = this.props.edit;
    const {_id} = this.props.user;
    this.props.captionClip(selectItemOne, _id, captions, this.props.newFileName);
  };

  
  // perform saveMP3 to backend and by invoking saveMP3 function
  saveMP3 = (file) => {
    const {_id} = this.props.user;
    let bodyFormData = new FormData();
    bodyFormData.append("mp3file", file);
    bodyFormData.append("uploader_id", _id);
    bodyFormData.append("filename", this.props.newFileName);
    this.props.saveMP3(bodyFormData);
  }

  // build the change of the input filename with the redux
  handleChange = (event) => {
    this.props.setFilename(event.target.value);
  }

  render() {
    // setting up values for the drop down
    const {items, selectItemOne} = this.props.item;
    const transitionTypes = [
      {"description": "Fade In", "command": "fade=in"},
      {"description": "Fade Out", "command": "fade=out"}];
    return (
      <div>
        <TimeLineSector
          title="Here is range select for the video"
          callback={this.setOneRange}
          videoReference="1"/>
        <div>
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
