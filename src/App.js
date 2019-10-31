import React from 'react';
import './App.scss';
import { BrowserRouter as Router } from "react-router-dom";
import LeftBar from './components/LeftBar';
import Yield from './components/Yield';

function App() {
  return (
    <div className="app">
      <Router>
        <LeftBar />
        <Yield />
      </Router>
    </div>
  );
}

export default App;
