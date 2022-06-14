import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Main from "./component/Main";
import ShelterMain from "./component/shelter/Main";
import SuppliesMain from "./component/supplies/Main";
import VictimMain from "./component/victim/Main";
import VictimInput from "./component/victim/Input";
import VictimView from "./component/victim/View";

import TopMenu from "./component/TopMenu";
import Footer from "./component/Footer";

class App extends Component {
  state = { username: null };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <TopMenu />
          <Routes>
            <Route exact path="/" element={<Main />}></Route>
            <Route exact path="/shelter" element={<ShelterMain />}></Route>
            <Route exact path="/supplies" element={<SuppliesMain />}></Route>
            <Route exact path="/victim" element={<VictimMain />}></Route>
            <Route
              exact
              path="/victim/register"
              element={<VictimInput />}
            ></Route>
            <Route
              exact
              path="/victim/detail/:id"
              element={<VictimView />}
            ></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
