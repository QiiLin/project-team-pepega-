import React, { Component, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Col,
  Container
} from "reactstrap";
import { connect } from "react-redux";
import { mergeClip, trimClip } from "../actions/editActions";
import { PropTypes } from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const FormData = require('form-data');

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merge_dropdownOpen: false,
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
  
  merge_dropdownToggle = () => {
    this.setState({
      merge_dropdownOpen: !this.state.merge_dropdownOpen
    });
  };

  merge_dropdownChanged = id => {
    this.setState({
      merge_dropdownValue: id
    });
  };
  

  render() {
    const { items } = this.props.item;
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} size="xl">
          <ModalHeader toggle={this.props.toggle}>Video Editor</ModalHeader>
          <ModalBody>

            {items.map(({ _id, originalname }) => (
            <Container key="merge_container">
              <Row>
              <Col>
              <Dropdown isOpen={this.state.merge_dropdownOpen} toggle={this.merge_dropdownToggle}>
                <DropdownToggle caret>Select a video to merge</DropdownToggle>
                <DropdownMenu>                
                  <DropdownItem onClick={this.merge_dropdownChanged.bind(this, _id)}>{originalname}</DropdownItem>                  
                </DropdownMenu>
              </Dropdown>
              </Col>
              <Col>
              <Button
                className="merge-btn"
                color="primary"
                size="md"                      
                onClick={this.merge_dropdownSubmit}>
                Merge
              </Button>
              </Col>
              </Row>
            </Container>
            ))}

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

export default connect(mapStateToProps, { mergeClip, trimClip })(EditModal);
