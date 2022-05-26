import React, {Component} from 'react';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import './App.css';
import InputForm from './component/InputForm';
import Main from './component/Main';
import PatientDetail from './component/PatientDetail';
import PatientInput from './component/PatientInput';
import PatientList from './component/PatientList';
import TopMenu from './component/TopMenu';
import Footer from './component/Footer';
import RecordInput from './component/RecordInput';

class App extends Component {

  state = { username: null };

render() {
  return (
    <div className="App">
        <BrowserRouter>
          <TopMenu/>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/inputform" element={<InputForm />}></Route>
            <Route path="/patientlist" element={<PatientList />}></Route>
            <Route path="/patientdetail/:index" element={<PatientDetail />}></Route>
            <Route path="/patientinputform" element={<PatientInput />}></Route>
            <Route path="/recordinput/:index" element={<RecordInput />}></Route>
          </Routes>
          <Footer/>
        </BrowserRouter>
    </div>
  );
}
}

export default App;
