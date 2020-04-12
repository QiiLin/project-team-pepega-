import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import { PropTypes } from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import './style/VideoCaptionStyle.css';

/**
 * This component create a pop up dialog for 
 * user to input and upload their own vidoe file.
 */
class ItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: "",
      video: ""
    };
  }

  static propTypes = {
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool
  };

  // bind the modle with the current state
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  
  // bind the upload filename with the current state
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // bind the state with the uploaded file
  fileSelectedHandler = e => {
    console.log("fileSelectedHandler: ", e.target.files[0]);
    this.setState({
      video: e.target.files[0]
    });
  };

  // submit hanlde that fires addItem aciton function from redux
  onSubmit = e => {
    e.preventDefault();
    let bodyFormData = new FormData();
    // bodyFormData.set("video", this.state.video);
    bodyFormData.append("video", this.state.video);
    bodyFormData.append("uploader_id", this.props.user._id);
    console.log(this.state.video.type);
    // Add video through add item action
    this.props.addItem(bodyFormData);
    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <div>
            <Button
              color="dark"
              onClick={this.toggle}
            >
              Add Video
            </Button>
          </div>
        ) : (
            <h4 className="mb-3 ml-4">Please log in to manage videos</h4>
          )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Videos List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Video: </Label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={this.fileSelectedHandler}
                  className="form-control-file border"
                />
                <p>Note: We currently only support:mp4, mp3, webm.</p>
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Video
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);
