import React, {useState, useContext} from 'react';
import { CssBaseline, Container } from '@material-ui/core';
import SignOn from './Welcome/SignOn.js';
import AboutYou from './Welcome/AboutYou.js';
import Language from './Welcome/Language.js';
import Challenges from './Welcome/Challenges.js';
import Students from './Welcome/Students.js';



export default function ContentArea() {
    const [profileSetup, setProfileSetup] = useState(false);
    const [profile, setProfile] = useState();



    return (
        <Container >
            <SignOn ></SignOn>
            <AboutYou></AboutYou>
            <Language></Language>
            <Challenges></Challenges>
            <Students></Students>
        </Container>
    )
}
