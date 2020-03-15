import React from 'react';
import { InputGroup, Input } from 'reactstrap';
import './style/VideoCaptionStyle.css';

// TODO add logic here to toggle the display and input trigger and use the redux properly
const VideoCaptionInput = (props) => {
    return (
        <div>
            <InputGroup size="lg">
                <Input className="transparent-input"/>
            </InputGroup>
            <br />
        </div>
    );
};

export default VideoCaptionInput;