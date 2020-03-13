import React, { Component, Fragment } from "react";
import {Player} from "video-react";
import {connect} from "react-redux";
import {getSelectItem} from "../../actions/itemActions";
class VideoContainer extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        // this.state = { counter: 0 };
        // this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount() {
        this.props.getSelectItem();
    }
    render() {
        // Note selectedFile is from VideoList
        //  TODO: Update the placeholder for video
        const { selectItem } = this.props.item;
        console.log(selectItem, "Test");
        return(
            <div>
                { selectItem ? (<Player><source src={selectItem} /></Player>): (<p> No video </p>)}
            </div>);
    }
}
// Mapping a redux state to a component property
const mapStateToProps = state => ({
    // item because we called it that in reducers/index.js (root reducer)
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { getSelectItem })(VideoContainer);