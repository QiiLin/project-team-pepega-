import React, { Component, Fragment } from "react";
import { Grid, Select, Button, InputLabel, MenuItem } from '@material-ui/core';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import {mergeClip, set_sync, trimClip} from "../../actions/editActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

class EditOption extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          merge_dropdownValue: '',
        };
    }

    static propTypes = {
        item: PropTypes.object.isRequired,
        user: PropTypes.object,
        isAuthenticated: PropTypes.bool
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

    render() {
        console.log(this.props.item);
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
                        <Grid>
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
                    </Grid>
                    <Grid>
                    </Grid>
                </Grid>
                <Button
                    color="primary"
                    onClick={() => (this.props.set_sync())}>
                    Sync range selector
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    item: state.item,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  });
  
export default connect(mapStateToProps, { mergeClip, trimClip, set_sync })(EditOption);