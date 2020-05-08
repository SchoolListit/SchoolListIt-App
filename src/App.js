import React from 'react';
import {useRoutes} from 'hookrouter';
import './App.css';
import Timeline from './Components/Pages/Timeline.js';
import About from './Components/Pages/About.js';
import Classroom from './Components/Pages/Classroom.js';
import School from './Components/Pages/School.js';
import PageFourOFour from './Components/Pages/PageFourOFour.js';
import Header from './Components/Components/Header.js';
import { GlobalProvider } from './Context/GlobalState.js';



const routes = {
  '/': () => <Timeline />,
  '/about': () => <About />,
  '/:school': ({school}) => () => <School school={school}/>,
  '/classrooms/:slug': ({slug}) => () => <Classroom slug={slug}/>,
};
  
const MyApp = () => {
  const routeResult = useRoutes(routes);
  return routeResult || <PageFourOFour />;
}

function App() {
  return (
      <React.Fragment>
          <GlobalProvider>
            <Header>
              </Header>
          </GlobalProvider>
          <MyApp />
      </React.Fragment>
      
  );
}

export default App;
