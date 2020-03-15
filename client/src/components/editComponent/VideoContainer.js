import React, {Component, Fragment} from "react";
import {Player} from "video-react";
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

class VideoContainer extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {selectTab: '1'};
        this.toggle = this.toggle.bind(this);
    }
    
    toggle = tab => {
        if (tab !== this.state.selectTab) {
            this.setState(state => ({
                selectTab: tab
            }));
        }
    };

    render() {
        // Note selectedFile is from VideoList
        // TODO: Update the placeholder for video
        const {selectItemOne, selectItemTwo} = this.props.item;
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
                            {selectItemOne ? (<Player key={selectItemOne}>
                                <source src={"api/items/" + selectItemOne}/>
                            </Player>) : (<p> No video </p>)}
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
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {})(VideoContainer);