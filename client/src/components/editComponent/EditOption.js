import React, { Component, Fragment } from "react";
import { Grid, Select, Button, InputLabel, MenuItem } from '@material-ui/core';
import { mergeClip, trimClip } from "../../actions/editActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

class EditOption extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          merge_dropdownValue: ""
        };
    }

    static propTypes = {
        item: PropTypes.object.isRequired,
        user: PropTypes.object,
        isAuthenticated: PropTypes.bool
    };

    merge_dropdownSubmit = () => {
        let bodyFormData = new FormData();
        bodyFormData.append("curr_vid_id", this.props.video_id);
        bodyFormData.append("merge_vid_id", this.state.merge_dropdownValue);
        
        // Add video through add item action
        this.props.mergeClip(bodyFormData);
      };
      
    
      merge_dropdownChanged = id => {
        this.setState({
          merge_dropdownValue: id
        });
      };

    render() {
        const { items } = this.props.item;
        console.log(items);
        return(
            <div>
                <Grid key="merge_grid" container>
                    <Grid
                      container
                      direction="column"
                      justify="flex-start"
                      alignItems="flex-start"
                    >
                        <InputLabel>Select a video to merge</InputLabel>
                        <Select className="edit-dropdown">                
                        {items.map(({ _id, originalname }) => (                
                            <MenuItem className="edit-dropdown-item" key={_id} value={originalname} onClick={this.merge_dropdownChanged.bind(this, _id)}>{originalname}</MenuItem>                  
                        ))}
                        </Select>
                        <Button
                        className="merge-btn"
                        color="primary"
                        size="medium"
                        onClick={this.merge_dropdownSubmit}>
                        Merge
                        </Button>
                    </Grid>
                    <Grid>
                        
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    item: state.item,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  });
  
export default connect(mapStateToProps, { mergeClip, trimClip })(EditOption);