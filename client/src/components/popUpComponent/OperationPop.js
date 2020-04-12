import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from "react-redux";
import {setProgress} from "../../actions/editActions";
import {clearErrors} from "../../actions/errorActions";
import CircularProgress from '@material-ui/core/CircularProgress';
import "../style/Main.css";

/**
 * This Component creates pop up dialog for the status of the operation
 */
class OperationPop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      maxWidth: 'sm'
    };
    this.handleClose = this.handleClose.bind(this);
    this.renderResultContent = this.renderResultContent.bind(this);
    this.renderProgressContent = this.renderProgressContent.bind(this);
  }

  handleClose = () => {
    this.props.setProgress();
    this.props.clearErrors();
  };

  renderResultContent() {
    if (this.props.status) {
      return <span>Operation Failed: {this.props.error}</span>;
    }
    return <span>Operation Sucessed, new video file {this.props.newFileName}
      is created, you can now view it from the list</span>;
  }
  renderProgressContent() {
    if (this.props.loading) {
      return <div className="alignCenter"><CircularProgress/>
      </div>;
    }
    return this.renderResultContent();
  }

  render() {
    return (
      <React.Fragment>
        <Dialog
          maxWidth={this.state.maxWidth}
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title">
          <DialogTitle id="max-width-dialog-title">Operation Dialog</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.renderProgressContent()}
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

const mapStateToProps = state => ({open: state.edit.isProgress, newFileName: state.edit.newFileName, error: state.error.error, status: state.error.status, loading: state.edit.isLoading});

export default connect(mapStateToProps, {setProgress, clearErrors})(OperationPop);