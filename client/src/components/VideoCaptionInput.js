import React from 'react';
import { InputGroup, Input } from 'reactstrap';
import './style/VideoCaptionStyle.css';

class VideoCaptionInput extends React.Component {


    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        // this.setState({value: event.target.value});
    }


    render() {
        return (
            <div>
                <InputGroup size="lg">
                    <Input className="transparent-input" onChange={this.handleChange}/>
                </InputGroup>
                <br/>
            </div>
        );
    };
}

export default VideoCaptionInput;