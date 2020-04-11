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
import { Tooltip } from "@material-ui/core";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import { PropTypes } from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import HelpIcon from "@material-ui/icons/Help";
import './style/VideoCaptionStyle.css';

const allowedType = {"video/mp4": 1, "video/mp3": 1,"video/webm": 1 }

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

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fileSelectedHandler = e => {
    console.log("fileSelectedHandler: ", e.target.files[0]);
    this.setState({
      video: e.target.files[0]
    });
  };

  onSubmit = e => {
    e.preventDefault();

    let bodyFormData = new FormData();
    // bodyFormData.set("video", this.state.video);
    bodyFormData.append("video", this.state.video);
    bodyFormData.append("uploader_id", this.props.user._id);

    console.log("---------------");
    console.log(this.state.video.type);
    console.log("---------------");
    // Add video through add item action
    this.props.addItem(bodyFormData);
    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {/* <h1>Hello</h1>
        <Tooltip title={
          <React.Fragment>
            <h4>You can: </h4>
            <ul>
              <li><h5>merge two videos</h5></li>
              <li><h5>add transition effects</h5></li>
              <li><h5>trim videos, or</h5></li>
              <li><h5>add captions to videos</h5></li>
            </ul>
          </React.Fragment>
        }>
          <HelpIcon />
        </Tooltip> */}
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
                {/* <br />
                Example:
                <Badge>
                  https://media.w3.org/2010/05/sintel/trailer_hd.mp4
                </Badge> */}
                {/* <Input
                  type="file"
                  // this should match whatever that is in the state
                  name="name"
                  id="item"
                  onChange={this.onChange}
                /> */}
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
