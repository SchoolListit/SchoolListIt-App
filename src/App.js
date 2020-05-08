import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalProvider } from './Context/GlobalState.js';
import Header from './Components/Components/Header.js';
import Timeline from './Components/Pages/Timeline.js';
import About from './Components/Pages/About.js';
import Classroom from './Components/Pages/Classroom.js';
import School from './Components/Pages/School.js';
import PageFourOFour from './Components/Pages/PageFourOFour.js';

const App = () => {
  return (
    <GlobalProvider>
      <Router>
          <Header></Header>
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <Switch>
              <Route exact path="/" component={Timeline} />
              <Route exact path="/classrooms/:sectionId" component={Classroom} />
            </Switch>
          </div>
      </Router>
    </GlobalProvider>
  )
};

export default App;

