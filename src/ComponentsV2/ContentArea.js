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
    const [contentState, setContentState] = useState('signOn');

    
        
    return (
        <Container >

            {(contentState === 'signOn')
                ? <SignOn userState={userState} setUserState={setUserState} setContentState={setContentState} ></SignOn>
                : null
            }
            {(contentState === 'AboutYou')
                ? <AboutYou userState={userState} setUserState={setUserState} setContentState={setContentState} ></AboutYou>
                : null
            }
            {(contentState === 'Language')
                ? <Language  userState={userState} setUserState={setUserState} setContentState={setContentState}></Language>
                : null
            }
            {(contentState === 'Challenges')
                ? <Challenges userState={userState} setUserState={setUserState} setContentState={setContentState}></Challenges>
                : null
            }
            {(contentState === 'Students')
                ? <Students userState={userState} setUserState={setUserState} setContentState={setContentState}></Students>
                : null
            }
            {(contentState === 'FindingSchools' )
                ? <FindingSchools
                    userState={userState} 
                    setUserState={setUserState} 
                    setContentState={setContentState}
                    >
                    </FindingSchools>
                : null
            }
        </Container>
    )
}
