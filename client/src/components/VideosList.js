import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

class VideosList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  // Run when making an api request (or calling an actions)
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    // item represents the entire state object, items is the array inside the state
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="videos-list">
            {items.map(({ _id, file_name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}
                  <ReactPlayer
                    url={file_name}
                    className="react-player"
                    playing
                    width="100%"
                    height="100%"
                  />
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

// Mapping a redux state to a component property
const mapStateToProps = state => ({
  // item because we called it that in reducers/index.js (root reducer)
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(VideosList);
