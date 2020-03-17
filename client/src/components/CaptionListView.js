import React from 'react';
import { ListGroup, ListGroupItem} from 'reactstrap';
import {connect} from "react-redux";

class CaptionListView extends React.Component {
    render() {
        const { captions } = this.props.edit;
        return (
            <ListGroup>
                {captions.map(({start_time, end_time, text}, index) => (
                    <ListGroupItem key={index}>{start_time} {end_time} {text}</ListGroupItem>
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

export default connect(mapStateToProps, {})(CaptionListView);