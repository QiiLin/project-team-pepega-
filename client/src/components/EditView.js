import React from "react";
import { Container, Row, Col } from 'reactstrap';
import VideoList from "./editComponent/VideoList";
import VideoContainer from "./editComponent/VideoContainer"
import VideoCaptionInput from "./VideoCaptionInput";
import TimeLineSector from "./editComponent/TimeLineSector";
import EditOption from "./editComponent/EditOption";
class EditView extends React.Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        // this.state = { counter: 0 };
        // this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return  (
            <Container>
                <Row>
                    <Col>
                        <VideoList/>
                    </Col>
                    <Col>
                        <Container>
                            <Row>
                                <Col> <VideoContainer/>    </Col>
                            </Row>
                            <Row>
                                <Col> <VideoCaptionInput/>  </Col>
                            </Row>
                            <Row>  <EditOption/>   </Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col> <TimeLineSector/> </Col>
                </Row>
            </Container>
        );
    }
}

export default EditView;