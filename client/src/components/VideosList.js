import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button, Navbar} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import { editItem } from "../actions/editActions";
import EditModal from "./EditModal";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

class VideosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      video_id: ""
    };

    this.showModal = this.showModal.bind(this);
    this.toggle = this.toggle.bind(this);
  }

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

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  showModal = (id) => {
    this.setState({
      modal: true,
      video_id: id
    });
  }

  render() {
    // item represents the entire state object, items is the array inside the state
    const { items } = this.props.item;
    return (
      <Container>
        <EditModal 
          modal={this.state.modal} 
          toggle={this.toggle}
          video_id={this.state.video_id}>          
        </EditModal>
        <ListGroup>
          <TransitionGroup className="videos-list">
            {items.map(({ _id, file_name, originalname }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">                
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Navbar color="light">
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="md"                      
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>

                  <span className="video-header">{originalname}</span>

                    <Button
                      className="edit-btn"
                      color="primary"
                      size="md"                  
                      onClick={this.showModal.bind(this, _id)}
                    >
                      Edit
                    </Button>
                    </Navbar>

                  ) : null}
                  <ReactPlayer
                    url={file_name}
                    className="react-player"
                    playing={false}
                    loop
                    controls
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
