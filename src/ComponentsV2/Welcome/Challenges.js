import React, {useContext, useState} from 'react';
import {UserContext} from '../../Context/UserContext.js';
import { Container, Typography, Grid } from '@material-ui/core';
import SelectMulti from './SelectMulti.js';

 
export default function Challenges() {
    const [userState, setUserState] = useContext(UserContext);
    const [challenges, setChallenges] = useState('');

    /**
     * Passed down to the composite SelectSimple
     * select simple passes back up the new value and we update context
     */
    const handleChange = (e) =>{
        setChallenges(e.target.value);
        let newUserState = userState;
        newUserState.userLanguage = e.target.value;
        setUserState(newUserState);
    }

    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        setChallenges(value);
      };

    /**
     * TODO: these should be pulling the full discover from IBM Watsom
     * translation options...right now they are hard coded for speed
     */
    const menuItems = [
        {
            itemValue: 'reading',
            itemDescription: 'Reading is hard for me'
        },
        {
            itemValue: 'english',
            itemDescription: 'English is not my first language'
        },
        {
            itemValue: 'time',
            itemDescription: 'Single parent so I need more time'
        },
        {
            itemValue: 'time',
            itemDescription: 'Dual income so no time to homeschooling'
        },
        {
            itemValue: 'no-internet',
            itemDescription: 'No internet at home'
        },
        {
            itemValue: 'blind',
            itemDescription: 'Sight challenges'
        },
        {
            itemValue: 'deaf',
            itemDescription: 'Hearing challenges'
        },
        {
            itemValue: 'agility',
            itemDescription: 'I have physical challenges'
        }, 
        {
            itemValue: 'other',
            itemDescription: 'Other'
        },
    ];



    return (
        <Container 
            fixed={true} 
            maxWidth={false}
            style={{height: '100vh', padding: '80px 0'}}
            >
               <Grid container  justify="center" alignContent="center" alignItems="center"  style={{height: '100%'}}>
                   <Grid item  >
                        <Typography variant="h2" style={{fontWeight: '700', textAlign: 'center'}}>Challenges</Typography>
                        <Typography variant="h3" style={{textAlign: 'center'}}>how can we help?</Typography>
                        <Typography variant="h5" style={{marginTop: '20px', textAlign: 'center'}}>everyone has challenges</Typography>
                        <Typography variant="h5" style={{textAlign: 'center'}}>tell us how we can help</Typography> 
                        <SelectMulti
                            handleChange={handleChange}
                            selectID="user-challenges"
                            selectValue={challenges}
                            label="Any Challenges"
                            labelID="user-challenge-label"
                            menuItems={menuItems}
                        ></SelectMulti>
                   </Grid>
               </Grid>
        </Container>
    )
}