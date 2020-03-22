import React from "react";
import { Container, Row, Col } from "reactstrap";
import VideoList from "./editComponent/VideoList";
import VideoContainer from "./editComponent/VideoContainer";
import VideoCaptionInput from "./VideoCaptionInput";
import TimeLineSector from "./editComponent/TimeLineSector";
import EditOption from "./editComponent/EditOption";
import { setVideoOneRange, setVideoTwoRange } from "../actions/itemActions";
import { connect } from "react-redux";
class EditView extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    // this.state = { counter: 0 };
    // this.handleClick = this.handleClick.bind(this);
    this.setOneRange = this.setOneRange.bind(this);
    this.setTwoRange = this.setTwoRange.bind(this);
  }

  setOneRange = value => {
    this.props.setVideoOneRange(value);
  };
  setTwoRange = value => {
    this.props.setVideoTwoRange(value);
  };


  

  render() {
    return (
        <div>
        { this.props.isAuthenticated?

        <Container>
            <Row>
                <Col>
                    <VideoList/>
                </Col>
                <Col>
                    <Container>
                        <Row>
                            <Col> <VideoContainer/> </Col>
                        </Row>
                        <Row>
                            <Col> <VideoCaptionInput/> </Col>
                        </Row>
                        <Row> <EditOption/> </Row>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col> <TimeLineSector title="Video One Selector" callback = {this.setOneRange} videoReference = "1"/> </Col>
            </Row>
            <Row>
                <Col> <TimeLineSector  title="Video Two Selector" callback = {this.setTwoRange} videoReference = "2"/> </Col>
            </Row>
        </Container>: <div> </div>}
        </div>
    );
  }
}

const mapStateToProps = state => ({
  // item because we called it that in reducers/index.js (root reducer)
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setVideoOneRange, setVideoTwoRange })(
  EditView
);
