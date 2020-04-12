import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";
import { setEnableGuide } from "../../actions/editActions";
/**
 * This component create pop up dialog for user guide
 */
class StatusPop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true, maxWidth:'sm'};
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose = () => {
    this.setState(state => ({
      open: false
    }));
  };

  render(){
    return (
        <React.Fragment>
          {/* <Button variant="outlined" color="primary" onClick={ this.handleClickOpen}>
            Open max-width dialog
          </Button> */}
          <Dialog
            // fullWidth={fullWidth}
            maxWidth={this.state.maxWidth}
            open={this.props.open}
            onClose={this.props.setEnableGuide}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle id="max-width-dialog-title">User Guide</DialogTitle>
            <DialogContent>
              
                {/* {this.props.inputText} */}
                <DialogContentText>Merge:</DialogContentText>
                <hr/>
                <DialogContentText>Trim:</DialogContentText>
                <hr/>
                <DialogContentText>Transition:</DialogContentText>
                <hr/>
                <DialogContentText>Caption:</DialogContentText> 
                <hr/>
                
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.setEnableGuide} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
  }
}


const mapStateToProps = state => ({
  open: state.edit.isUserGuide
});

export default connect(mapStateToProps, {setEnableGuide})(StatusPop);