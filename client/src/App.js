import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import AppNavbar from "./components/AppNavbar";
import VideosList from "./components/VideosList";
import ItemModal from "./components/ItemModal";
import VideoCaptionInput from "./components/VideoCaptionInput";
import { Container } from "reactstrap";
import { loadUser } from "./actions/authActions";
import "../node_modules/video-react/dist/video-react.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <VideosList />
          </Container>
          <VideoCaptionInput> </VideoCaptionInput>
        </div>
      </Provider>
    );
  }
}

export default App;
