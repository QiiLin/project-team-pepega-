import React from "react";
import { Grid, Select, Button, InputLabel, MenuItem, Box } from '@material-ui/core';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import {addCapation, captionClip, mergeClip, set_sync, trimClip} from "../../actions/editActions";
import EjectIcon from '@material-ui/icons/Eject';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import CaptionListView from "../CaptionListView";


String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
};

class EditOption extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          merge_dropdownValue: '',
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

    trim_Submit = (selectItemOne) => {
        const { videoOneSelection } = this.props.item;
        let bodyFormData = new FormData();  
        bodyFormData.append("timestampStart", videoOneSelection[0]);
        bodyFormData.append("timestampEnd", videoOneSelection[1]);

        this.props.trimClip(selectItemOne, bodyFormData);
    };

    merge_dropdownSubmit = (selectItemOne) => {
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
            }
        })
    };

    addCaption = () => {
        const {videoOneSelection} = this.props.item;
        const {captionValue, captions} = this.props.edit;
        let startTime = parseInt(videoOneSelection[0], 10) + "";
        let endTime = parseInt(videoOneSelection[1], 10) + "";
        let curr = {
            start_time: startTime.toHHMMSS()+  ",000",
            end_time: endTime.toHHMMSS()  + ",000",
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
    render() {
        // console.log(this.props.item);
        // console.log(this.props.item.videoOneSelection);
        const { items, selectItemOne } = this.props.item;
        return(
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
                          alignItems="flex-start">
                            <InputLabel>Select a video to merge</InputLabel>
                            <Select className="edit-dropdown" style={{minWidth: 180}} value={this.state.merge_dropdownValue} onChange={this.merge_dropdownChanged}>                
                            {items.map(({ _id, filename }) => (                
                                <MenuItem className="edit-dropdown-item" key={_id} value={filename}>{filename}</MenuItem>                  
                            ))}
                            </Select>
                            <Button 
                            variant="contained"
                            color="primary"
                            endIcon={<MergeTypeIcon/>}
                            onClick={this.merge_dropdownSubmit.bind(this,selectItemOne)}>
                            Merge
                            </Button>
                        </Grid>
                        <Box m={2}/>
                        <Grid
                          container 
                          direction="column"
                          justify="flex-start"
                          alignItems="flex-start">
                        <InputLabel>Trim Video</InputLabel>
                            <Button 
                            variant="contained"
                            color="primary"
                            endIcon={<EjectIcon/>}
                            onClick={this.trim_Submit.bind(this,selectItemOne)}>
                            Trim
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid>
                    </Grid>
                </Grid>
                <Button
                    color="primary"
                    onClick={() => (this.props.set_sync())}>
                    Sync range selector
                </Button>
                <Button
                    onClick={() => (this.addCaption())}>
                    Add to Caption
                </Button>
                <Button
                    onClick={() => (this.burnVideo())}>
                    Burn it into video
                </Button>
                <CaptionListView/>
            </div>
        )
    }


}

const mapStateToProps = state => ({
    item: state.item,
    edit: state.edit,
    user: state.auth.user,
    duration: state.edit.duration,
    isAuthenticated: state.auth.isAuthenticated
  });
  
export default connect(mapStateToProps, { mergeClip, trimClip, set_sync, addCapation, captionClip })(EditOption);