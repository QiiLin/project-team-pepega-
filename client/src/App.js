import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import AppNavbar from "./components/AppNavbar";
import VideosList from "./components/VideosList";
import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";
import { loadUser } from "./actions/authActions";

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
        </div>
      </Provider>
    );
  }
}

export default App;
