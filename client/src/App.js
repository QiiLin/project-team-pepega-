import React, { Component } from "react";
import { Player } from "video-react";
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
            {/* <Player>
              <source src={"/3b6041dcb7ff00c352257fb9707d9e5f"} />
            </Player> */}
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;

// Challenge #1: save the video file in the right directory (client/public instead of controllers/api)
// Challenge #2: save the right stuff into mongodb
// Challenge #3: retreive stuff from mongodb
