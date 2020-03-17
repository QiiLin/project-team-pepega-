import React from 'react';
import {Card, ListGroup, ListGroupItem} from 'reactstrap';
import {connect} from "react-redux";
import {Button} from "@material-ui/core";
import DeleteIcon from "./editComponent/VideoList";
import {deleteCaption} from "../actions/editActions";

class CaptionListView extends React.Component {
    render() {
        const { captions } = this.props.edit;
        return (
            <ListGroup>
                {captions.map(({start_time, end_time, text, index}) => (
                    <div>
                    <ListGroupItem>{start_time} {end_time} {text}
                    </ListGroupItem>
                    <Button
                    onClick={() => {this.props.deleteCaption(index)}}
                    >
                    Delete
                    </Button>
                    </div>
                ))}
            </ListGroup>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item,
    edit: state.edit,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {deleteCaption})(CaptionListView);