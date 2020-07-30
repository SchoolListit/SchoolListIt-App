import React, {useContext, useState} from 'react';
import {UserContext} from '../../Context/UserContext.js';
import { Container, Typography, Grid, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@material-ui/core';

 
export default function Challenges() {
    const [userState, setUserState] = useContext(UserContext);
    const [challenges, setChallenges] = useState([]);

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
        let newUserState = userState;
        userState.userChallenges.push(event.target.value);
        setUserState(newUserState);
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
            itemValue: 'Single Parent',
            itemDescription: 'Single parent - need more time to help'
        },
        {
            itemValue: 'We both work',
            itemDescription: 'Dual income - need more time to help'
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
                        <FormControl style={{width: '100%', marginTop: '20px', height: '70px'}}>
                            <Select
                            multiple
                            native
                            variant="outlined"
                            value={[]}
                            onChange={handleChangeMultiple}
                            inputProps={{
                                id: 'select-challenges',
                            }}
                            >
                            {menuItems.map( (item, key) => {
                                return (<option style={{marginBottom: '10px'}} key={key} value={item.itemValue} >{item.itemDescription}</option>)
                            })}
                            </Select>
                        <FormHelperText>Select as many as apply</FormHelperText>
                        </FormControl>
                   </Grid>
               </Grid>
        </Container>
    )
}