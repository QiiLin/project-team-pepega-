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
import { useDropzone } from "react-dropzone";

function Basic(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

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

    // Add video through add item action
    this.props.addItem(bodyFormData);
    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <h1>Hello</h1>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Video
          </Button>
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
                <Basic id="fileInput" onChange={this.fileSelectedHandler} />
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
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);
