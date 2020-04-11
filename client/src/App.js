import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import AppNavbar from "./components/AppNavbar";
import EditView from "./components/EditView";
import { Container, Row, Col } from "reactstrap";
import StatusPop from "./components/popUpComponent/StatusPop"
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
        <div className="App">
          <HandleProgressBar />
          <AppNavbar />
          <StatusPop/>
          <EditView />
        </div>
      </Provider>
    );
  }
}

export default App;
