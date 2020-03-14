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
    Col,
    ButtonGroup
} from 'reactstrap';
import {connect} from "react-redux";
import {deleteItem, getItems ,setSelectItemOne,setSelectItemTwo } from "../../actions/itemActions";
import PropTypes from "prop-types";
const path = require("path");

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
                        <Row>
                        {items.map(({ _id, file_name, file_path}) => (
                            <Col sm="6" key={_id}>
                                <Card body >
                                    <CardTitle>{file_name}</CardTitle>
                                    <CardText  >
                                        This is video image and make sure add event listener</CardText>
                                    <ButtonGroup vertical>
                                    <Button onClick={ () => {this.props.setSelectItemOne(file_name + path.extname(file_path))}}>Load to player one</Button>


                                    <Button onClick={ () => {this.props.setSelectItemTwo(file_name + path.extname(file_path))}}>Load to player two</Button>
                                    </ButtonGroup>
                                </Card>
                            </Col>
                        ))}
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            {/*<Col sm="6">*/}
                                {/*<Card body>*/}
                                    {/*<CardTitle>Special Title Treatment</CardTitle>*/}
                                    {/*<CardText>With supporting text below as a natural lead-in to additional content.</CardText>*/}
                                    {/*<Button>Go somewhere</Button>*/}
                                {/*</Card>*/}
                            {/*</Col>*/}
                            {/*<Col sm="6">*/}
                                {/*<Card body>*/}
                                    {/*<CardTitle>Special Title Treatment</CardTitle>*/}
                                    {/*<CardText>With supporting text below as a natural lead-in to additional content.</CardText>*/}
                                    {/*<Button>Go somewhere</Button>*/}
                                {/*</Card>*/}
                            {/*</Col>*/}
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

export default connect(mapStateToProps, { getItems, deleteItem, setSelectItemOne ,setSelectItemTwo })(VideoList);
