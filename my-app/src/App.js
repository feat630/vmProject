import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Main from "./component/Main";
import ShelterMain from "./component/shelter/Main";
import SuppliesMain from "./component/supplies/Main";
import VictimMain from "./component/victim/Main";
import VictimInput from "./component/victim/Input";
import VictimView from "./component/victim/View";
import VictimUpdate from "./component/victim/Edit";

import Main from "./component/Main";
import Login from "./component/Login";
import ShelterMain from "./component/shelter/Main";
import ShelterView from "./component/shelter/View";
import ShelterInput from "./component/shelter/Input";
import SuppliesMain from "./component/supplies/Main";
import VictimMain from "./component/victim/Main";

import TopMenu from "./component/TopMenu";
import Footer from "./component/Footer";

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
            <Route
              exact
              path="/victim/update/:id"
              element={<VictimUpdate />}
            ></Route>
            <Route path="/" element={<Login />}></Route>
            <Route path="/main" element={<Main />}></Route>
            <Route path="/shelter" element={<ShelterMain />}></Route>
            <Route path="/shelter/:index" element={<ShelterView />}></Route>
            <Route path="/shelter/input" element={<ShelterInput />}></Route>
            <Route
              path="/shelter/input/:index"
              element={<ShelterInput />}
            ></Route>
            <Route path="/supplies" element={<SuppliesMain />}></Route>
            <Route path="/victim" element={<VictimMain />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
