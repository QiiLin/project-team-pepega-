import React, {Component, Fragment} from "react";
import { Player, ControlBar } from 'video-react';
import {connect} from "react-redux";
import {getSelectItem} from "../../actions/itemActions";
import {
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from "reactstrap";
import {set_duration} from "../../actions/editActions";

class VideoContainer extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {selectTab: '1'};
        this.toggle = this.toggle.bind(this);
        this.changeCurrentTime = this.changeCurrentTime.bind(this);
    }

    toggle = tab => {
        if (tab !== this.state.selectTab) {
            this.setState(state => ({
                selectTab: tab
            }));
        }
    };

    componentDidMount() {
        // subscribe state change
        this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    }


    changeCurrentTime(seconds) {
        return () => {
            this.player.seek(seconds);
        };
    }

    handleStateChange(state) {
        // copy player state to this component's state
        this.setState({
            player: state
        });
        const { player } = this.player.getState();
        this.props.set_duration(player.duration);
    }
    render() {
        // Note selectedFile is from VideoList
        // TODO: Update the placeholder for video
        const {selectItemOne, selectItemTwo, videoOneSelection, videoTwoSelection} = this.props.item;
        const { sync } = this.props.edit;
        if (sync && videoOneSelection.length !== 0) {
            this.changeCurrentTime(videoOneSelection[0])
        }
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={this.state.selectTab === '1' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('1');
                            }}
                        >
                            Video One
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={this.state.selectTab === '2' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('2');
                            }}
                        >
                            Video Two
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.selectTab}>
                    <TabPane tabId="1">
                        <Row>
                            {selectItemOne ?
                                (<Player key={selectItemOne}
                                         ref={player => {
                                             this.player = player;
                                         }}>
                                    <source src={"api/items/" + selectItemOne}/>
                                </Player>) : (
                                    <Player key={selectItemOne}
                                            ref={player => {
                                                this.player = player;
                                            }}>
                                        <source src={"http://www.w3schools.com/html/mov_bbb.mp4"}/>
                                    </Player>
                                )}
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            {selectItemTwo ? (<Player key={selectItemOne}>
                                <source src={"api/items/" + selectItemTwo}/>
                            </Player>) : (<p> No video </p>)}
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

// Mapping a redux state to a component property
const mapStateToProps = state => ({
    // item because we called it that in reducers/index.js (root reducer)
    item: state.item,
    edit: state.edit,
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {set_duration})(VideoContainer);