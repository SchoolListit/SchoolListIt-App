import React from 'react';
import {useRoutes} from 'hookrouter';
import './App.css';
import Timeline from './Components/Pages/Timeline.js';
import About from './Components/Pages/About.js';
import Classroom from './Components/Pages/Classroom.js';
import Page_404 from './Components/Pages/Page-404.js';


const routes = {
  '/': () => <Timeline />,
  '/about': () => <About />,
  '/products': () => <Classroom />,
};
  
const MyApp = () => {
  const routeResult = useRoutes(routes);
  
  return routeResult || <Page_404 />;
}

function App() {
  return (
    <React.Fragment>
      <MyApp />
    </React.Fragment>
  );
}

export default App;
