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
import OperationPop from "./components/popUpComponent/OperationPop";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
    fetch('http://localhost:5000/')
    .then(response => console.log(response.json()));
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <HandleProgressBar />
          <AppNavbar />
          <OperationPop/>
          <StatusPop/>
          <EditView />
        </div>
      </Provider>
    );
  }
}

export default App;
