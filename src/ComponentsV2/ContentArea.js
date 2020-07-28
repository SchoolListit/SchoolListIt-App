import React, {useState, useContext} from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';
import {UserContext} from '../Context/UserContext.js';
import SignOn from './Welcome/SignOn.js';
import AboutYou from './Welcome/AboutYou.js';
import Language from './Welcome/Language.js';
import Challenges from './Welcome/Challenges.js';
import Students from './Welcome/Students.js';
import FindingSchools from './Welcome/FindingSchools.js';



export default function ContentArea() {
    const [userState, setUserState] = useContext(UserContext);
    const [profileStep, setProfileStep] = useState('signOn');

   
        
    return (
        <Container >
            <SignOn></SignOn>
            <AboutYou></AboutYou>
            <Language></Language>
            <Challenges></Challenges>
            <Students></Students>
            <FindingSchools></FindingSchools>
        </Container>
    )
}
