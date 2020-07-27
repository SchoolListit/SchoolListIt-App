import React, {} from 'react';
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import {  faPencilAlt, faBook, faFileImage, faMagic, faLifeRing, faArrowsAltV, faCheck, faGrinBeamSweat, faBell, faHeart, faCopy, faEnvelope, faSave, faExclamationTriangle, faTrashAlt, faEllipsisH, faWindowClose, faThumbsUp, faCommentAlt, faShare, faBars, faSearch, faDoorOpen,faEye, faQuestionCircle, faUser, faPlusSquare, faMinusSquare, faCalendarWeek, faCalendarDay, faHouseUser, faSchool, faHome, faSignInAlt, faChalkboard, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import {faFacebookSquare} from '@fortawesome/free-brands-svg-icons';
import {  ThemeProvider, createMuiTheme, makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import { grey, amber} from '@material-ui/core/colors';
import { CssBaseline, Container, Grid } from '@material-ui/core';
import './App.scss';
import ContentArea from './ComponentsV2/ContentArea.js';
import Header from './ComponentsV2/Header.js';
import FloatAdd from './ComponentsV2/FloatAdd.js';
import Footer from './ComponentsV2/Footer.js';

library.add( faPencilAlt, faBook, faFileImage, faMagic, faLifeRing, faArrowsAltV, faCheck, faGrinBeamSweat, faBell, faHeart, faFacebookSquare, faCopy, faEnvelope, faSave, faExclamationTriangle, faTrashAlt, faEllipsisH, faWindowClose, faThumbsUp, faCommentAlt, faShare, faBars, faSearch, faDoorOpen, faEye, faQuestionCircle, faUser, faPlusSquare, faMinusSquare, faCalendarWeek, faCalendarDay, faHouseUser, faSchool, faHome, faSignInAlt, faChalkboard, faGlobeAmericas);


let theme = createMuiTheme({
  typography: {
    fontFamily: 'Quicksand, Arial',
    fontWeight: '500'
    
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': 'Quicksand',
      },
    },
    
  },
  palette: {
    primary: amber,
    secondary: grey,
  },
  
});

theme = responsiveFontSizes(theme);

const App = () => {

  return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
              <Header></Header>
                <FloatAdd></FloatAdd>
                <ContentArea></ContentArea>
                <FloatAdd></FloatAdd>
              <Footer></Footer>
        </ThemeProvider>
  )
};

export default App;

