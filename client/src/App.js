import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import VideosList from "./components/VideosList";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <VideosList />
    </div>
  );
}

export default App;
