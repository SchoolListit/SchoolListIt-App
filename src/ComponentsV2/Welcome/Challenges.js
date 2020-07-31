import React, {useContext, useState} from 'react';
import {UserContext} from '../../Context/UserContext.js';
import { Container, Typography, Grid, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import ChallengeCheckboxes from './ChallengeCheckboxes.js'
 
export default function Challenges( {userState, setUserState, setContentState}) {
    /**
     * 
     * TODO: we need to wrap the whole content in the Grid so it
     * aligns center in the page instead of towards the bottom...
     */
    const setChallenges = (challenges) => {
        let newUserState = userState;
        newUserState.userChallenges = challenges;
        setUserState(newUserState);
        setContentState('Students');
    }
    /**
     * TODO: these should be pulling the full discover from IBM Watsom
     * translation options...right now they are hard coded for speed
     */
    const challenges = [
        {
            value: 'reading',
            description: 'Reading is hard for me',
            checked: (userState.userChallenges.indexOf('reading') !== -1)
        },
        {
            value: 'english',
            description: 'English is not my first language',
            checked: (userState.userChallenges.indexOf('english') !== -1)
        },
        {
            value: 'single parent',
            description: 'Single parent - need more time to help',
            checked: (userState.userChallenges.indexOf('single parent') !== -1)
        },
        {
            value: 'we both work',
            description: 'Dual income - need more time to help',
            checked: (userState.userChallenges.indexOf('we both work') !== -1)
        },
        {
            value: 'no-internet',
            description: 'No internet at home',
            checked: (userState.userChallenges.indexOf('no-internet') !== -1)
        },
        {
            value: 'other',
            description: 'Other',
            checked: (userState.userChallenges.indexOf('other') !== -1)
        },
        {
            value: 'blind',
            description: 'Sight challenges',
            checked: (userState.userChallenges.indexOf('blind') !== -1)
        },
        {
            value: 'deaf',
            description: 'Hearing challenges',
            checked: (userState.userChallenges.indexOf('deaf') !== -1)
        },
        {
            value: 'agility',
            description: 'I have physical challenges',
            checked: (userState.userChallenges.indexOf('agility') !== -1)
        }, 
        
    ];

    return (
        <Container 
            fixed={true} 
            maxWidth={false}
            style={{height: '100vh', padding: '80px 0'}}
            >
               <Grid container  justify="center"  alignItems="center" >
                   <Grid item  >
                        <Typography variant="h2" style={{fontWeight: '700', textAlign: 'center'}}>Challenges</Typography>
                        <Typography variant="h3" style={{textAlign: 'center'}}>how can we help?</Typography>
                        <Typography variant="h5" style={{marginTop: '20px', textAlign: 'center'}}>everyone has challenges</Typography>
                        <Typography variant="h5" style={{textAlign: 'center'}}>tell us how we can help</Typography> 
                        <FormControl style={{width: '100%', marginTop: '20px', height: '70px'}}>
                            <ChallengeCheckboxes setChallenges={setChallenges} challenges={challenges}></ChallengeCheckboxes>
                        </FormControl>
                   </Grid>
               </Grid>
        </Container>
    )
}