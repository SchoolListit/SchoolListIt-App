import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Components/Components/Header.js';
import Timeline from './Components/Pages/Timeline.js';
import About from './Components/Pages/About.js';
import Classroom from './Components/Pages/Classroom.js';
import School from './Components/Pages/School.js';
import PageFourOFour from './Components/Pages/PageFourOFour.js';

import './App.css';
import { ContextController } from "./Context/Context.js";

const App = () => {

  const sections = [
    {
      teachers: 'Wayne Hooper',
      Grades: '4th',
      Subject: 'Math',
    }
  ]

  return (
    <ContextController>
      <Router>
          <Header></Header>
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <Switch>
              <Route exact path="/" component={Timeline} />
              <Route exact path="/classrooms/:sectionId" component={Classroom} />
            </Switch>
          </div>
      </Router>
    </ContextController>
  )
};

export default App;

