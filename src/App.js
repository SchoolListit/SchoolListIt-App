import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faQuestionCircle, faUser, faPlusSquare, faMinusSquare, faCalendarWeek, faCalendarDay, faHouseUser, faSchool, faHome, faSignInAlt, faChalkboard, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey, teal} from '@material-ui/core/colors';
import { CssBaseline, BottomNavigation } from '@material-ui/core';

import Header from './Components/Components/Header.js';
import Timeline from './Components/Pages/Timeline.js';
import LandingPage from './Components/Pages/LandingPage.js';
import About from './Components/Pages/About.js';
import Classroom from './Components/Pages/Classroom.js';
import School from './Components/Pages/School.js';
import PageFourOFour from './Components/Pages/PageFourOFour.js';

import { ContextController } from "./Context/Context.js";
import './App.css';


library.add(faEye, faQuestionCircle, faUser, faPlusSquare, faMinusSquare, faCalendarWeek, faCalendarDay, faHouseUser, faSchool, faHome, faSignInAlt, faChalkboard, faGlobeAmericas);

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Quicksand, Arial',
    fontWeight: '400',
    color: '#333',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': 'Quicksand',
      },
    },
  },
  palette: {
    primary: teal,
    secondary: grey,
  },
  background: '#e0e0e0'
});

const App = () => {


  return (
      <ContextController>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
              <Header></Header>
                <Switch>
                  <Route exact path="/" component={Timeline} />
                  <Route path="/sign-in" component={LandingPage}/>
                  <Route exact path="/classrooms/:sectionId" component={Classroom} />
                </Switch>
          </Router>
        </ThemeProvider>
      </ContextController>    
  )
};

export default App;

