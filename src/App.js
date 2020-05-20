import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp, faCommentAlt, faShare, faBars, faSearch, faDoorOpen,faEye, faQuestionCircle, faUser, faPlusSquare, faMinusSquare, faCalendarWeek, faCalendarDay, faHouseUser, faSchool, faHome, faSignInAlt, faChalkboard, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { grey, teal} from '@material-ui/core/colors';
import { CssBaseline, Container } from '@material-ui/core';

import Header from './Components/Components/Header.js';
import Timeline from './Components/Pages/Timeline.js';
import LandingPage from './Components/Pages/LandingPage.js';
import About from './Components/Pages/About.js';
import Classroom from './Components/Pages/Classroom.js';
import School from './Components/Pages/School.js';
import PageFourOFour from './Components/Pages/PageFourOFour.js';
import ScreenOptions from './Components/Components/ScreenOptions.js';

import {  ContextController, Context } from "./Context/Context.js";
import './App.scss';


library.add(faThumbsUp, faCommentAlt, faShare, faBars, faSearch, faDoorOpen, faEye, faQuestionCircle, faUser, faPlusSquare, faMinusSquare, faCalendarWeek, faCalendarDay, faHouseUser, faSchool, faHome, faSignInAlt, faChalkboard, faGlobeAmericas);


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
  
});

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    maxHeight: 'none',
    width: '100vw',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    background: "url('https://msp-media.org/wp-content/images/robert-collins-tvc5imO5pXk-unsplash.jpg')",
    maxWidth: 'none !important',
    margin: '0',
    padding: '0',
  }
}));
//localStorage.clear();

////app starts here
const App = () => {
const classes = useStyles();


  return (
      <ContextController>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container 
            fixed={true} 
            maxWidth={false}
            className={classes.root}
            >
            <Router>
                <Switch>
                    <Route exact path="/" component={Timeline} />
                    <Route path="/sign-in" component={LandingPage}/>
                    <Route path="/classrooms/:classArgs" component={Classroom} />
                  </Switch>
            </Router>
            <ScreenOptions></ScreenOptions>
          </Container>
        </ThemeProvider>
      </ContextController>    
  )
};

export default App;

