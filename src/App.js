import React from 'react';
import './styles/style.scss';
import { BrowserRouter as Router } from "react-router-dom";
import SideBar from './components/SideBar';
import Yield from './components/Yield';

function App() {
  return (
    <div className="app">
      <Router>
      		<SideBar />
      		<Yield />
      </Router>
    </div>
  );
}

export default App;
