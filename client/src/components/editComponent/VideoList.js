import React, { Component, Fragment, useState  } from "react";
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    Button,
    CardTitle,
    CardText,
    Row,
    Col
} from 'reactstrap';
import {connect} from "react-redux";
import {deleteItem, getItems ,setSelectItem,getSelectItem } from "../../actions/itemActions";
import PropTypes from "prop-types";
class VideoList extends Component {
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { selectTab: '1' };
        this.toggle = this.toggle.bind(this);
    }
    // Run when making an api request (or calling an actions)
    componentDidMount() {
        this.props.getItems();
    }

    toggle = tab => {
        if (tab !== this.state.selectTab) {
            this.setState(state => ({
                selectTab: tab
            }));
        }
    };

    render() {
        const {items} = this.props.item;
        if (items.length !== 0) {
            // init default view video
            console.log(items[0].file_name);
        }
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={ this.state.selectTab === '1'  ? 'active': '' }
                            onClick={() => { this.toggle('1'); }}
                        >
                            Video
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={ this.state.selectTab === '2'  ? 'active': '' }
                            onClick={() => { this.toggle('2'); }}
                        >
                            Audio
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.selectTab}>
                    <TabPane tabId="1">
                        {items.map(({ _id, file_name }) => (
                            <Col sm="6">
                                <Card body onClick={ () => {this.props.setSelectItem(file_name)}}>
                                    <CardTitle>{file_name}</CardTitle>
                                    <CardText>This is video image and make sure add event listener</CardText>
                                    <Button>Make sure we update router to prevent this from display</Button>
                                </Card>
                            </Col>
                        ))}
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
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

export default connect(mapStateToProps, { getItems, deleteItem, setSelectItem ,getSelectItem })(VideoList);
