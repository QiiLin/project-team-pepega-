import React from "react";
import {Container, Row, Col} from "reactstrap";
import VideoList from "./editComponent/VideoList";
import VideoContainer from "./editComponent/VideoContainer";
import VideoCaptionInput from "./VideoCaptionInput";
import TimeLineSector from "./editComponent/TimeLineSector";
import EditOption from "./editComponent/EditOption";
import {setVideoOneRange, setVideoTwoRange} from "../actions/itemActions";
import TopBarProgress from "react-topbar-progress-indicator";
import ItemModal from "./ItemModal";
import './style/Main.css';
import {connect} from "react-redux";
class EditView extends React.Component {
  constructor(props) {
    super(props);
    this.setOneRange = this
      .setOneRange
      .bind(this);
    this.setTwoRange = this
      .setTwoRange
      .bind(this);
  }

  setOneRange = value => {
    this
      .props
      .setVideoOneRange(value);
  };
  setTwoRange = value => {
    this
      .props
      .setVideoTwoRange(value);
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated
          ? (
            <Container>
              <TopBarProgress/>
              <Row>
                <Col>
                  <VideoList/>
                </Col>
                <Col>
                  <Container>
                    <Row>
                      <Col>
                        {" "}
                        <VideoContainer/>{" "}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {" "}
                        <VideoCaptionInput/>{" "}
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p> render operations </p>
                  <ItemModal/>
                  <br/>
                  <EditOption/>
                </Col>
              </Row>
            </Container>
          )
          : (
            <div></div>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // item because we called it that in reducers/index.js (root reducer)
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setVideoOneRange, setVideoTwoRange})(EditView);
