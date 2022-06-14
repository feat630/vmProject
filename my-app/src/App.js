import React, {Component} from 'react';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import './App.css';
import Main from './component/Main';
import ShelterMain from './component/shelter/Main';
import SuppliesMain from './component/supplies/Main';
import SuppliesInput from './component/supplies/Input';
import SuppliesView from './component/supplies/View';
import VictimMain from './component/victim/Main';

import TopMenu from './component/TopMenu';
import Footer from './component/Footer';


class App extends Component {

  state = { username: null };

render() {
  return (
    <div className="App">
        <BrowserRouter>
          <TopMenu/>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/shelter" element={<ShelterMain />}></Route>
            <Route path="/supplies/Main" element={<SuppliesMain />}></Route>
            <Route path="/supplies/input" element={<SuppliesInput />}></Route>
            <Route path="/supplies/view" element={<SuppliesView />}></Route>
            <Route path="/victim" element={<VictimMain />}></Route>
          </Routes>
          <Footer/>
        </BrowserRouter>
    </div>
  );
}
}

export default App;
