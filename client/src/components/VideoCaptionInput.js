import React from 'react';
import { InputGroup, Input } from 'reactstrap';
import './style/VideoCaptionStyle.css';
import {connect} from "react-redux";
import {setCaption} from "../actions/editActions";

class VideoCaptionInput extends React.Component {


    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        // this.setState({value: event.target.value});
        this.props.setCaption(event.target.value)
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



const mapStateToProps = state => ({
    item: state.item,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setCaption })(VideoCaptionInput);