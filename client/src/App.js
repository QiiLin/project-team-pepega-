import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import AppNavbar from "./components/AppNavbar";
import ItemModal from "./components/ItemModal";
import EditView from "./components/EditView";
import { Container } from "reactstrap";
import { loadUser } from "./actions/authActions";
import "../node_modules/video-react/dist/video-react.css";
import HandleProgressBar from "./components/ProgressBar";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <HandleProgressBar />
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <EditView />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
