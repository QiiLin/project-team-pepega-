import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';

class statusPop extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { open: false, maxWidth:'sm'};
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClickOpen = () => {
    this.setState(state => ({
      open: true
    }));
  };

  handleClose = () => {
    this.setState(state => ({
      open: false
    }));
  };

  render(){
    const useStyles = makeStyles((theme) => ({
      form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
      },
      formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
      },
      formControlLabel: {
        marginTop: theme.spacing(1),
      },
    }));
    return (
        <React.Fragment>
          <Button variant="outlined" color="primary" onClick={ this.handleClickOpen}>
            Open max-width dialog
          </Button>
          <Dialog
            // fullWidth={fullWidth}
            maxWidth={this.state.maxWidth}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle id="max-width-dialog-title">User Guide</DialogTitle>
            <DialogContent>
              <DialogContentText>
                  Current Progress: 
              </DialogContentText>

            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
  }
}

export default statusPop;