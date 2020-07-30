import React, {useContext, useState} from 'react';
import axios from 'axios';
import {UserContext} from '../../Context/UserContext.js';
import { Container, Typography, Grid } from '@material-ui/core';
import SelectSimple from './SelectSimple.js';

export default function Language() {
    const [userState, setUserState] = useContext(UserContext);
    const [language, setLanguage] = useState('');

    /**
     * Passed down to the composite SelectSimple
     * select simple passes back up the new value and we update context
     */
    const handleChange = (e) =>{
        setLanguage(e.target.value);
        let newUserState = userState;
        newUserState.userLanguage = e.target.value;
        setUserState(newUserState);

        navigator.geolocation.getCurrentPosition( (position) => {
            //go out and get nearby schools from our server api
            const url = 'https://schoolistit.com/wp-json/schoolistit/v2/get_nearby_schools';
            axios.post(url, {lat: position.coords.latitude, lng: position.coords.longitude})
                .then( res => {
                    let newUserState = userState;
                    newUserState.nearbySchools = res.data;
                    newUserState.lat = position.coords.latitude;
                    newUserState.lng = position.coords.longitude;
                    setUserState(newUserState);
                });
            });
    }

    /**
     * TODO: these should be pulling the full discover from IBM Watsom
     * translation options...right now they are hard coded for speed
     */
    const menuItems = [
        {
            itemValue: 'english',
            itemDescription: 'English'
        },
        {
            itemValue: 'spanish',
            itemDescription: 'Spanish'
        },
        {
            itemValue: 'french',
            itemDescription: 'French'
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
                        <Typography variant="h2" style={{fontWeight: '700', textAlign: 'center'}}>Language</Typography>
                        <Typography variant="h3" style={{textAlign: 'center'}}>what's your first?</Typography>
                        <Typography variant="h5" style={{marginTop: '20px', textAlign: 'center'}}>We can translate english for you</Typography>
                        <Typography variant="h5" style={{textAlign: 'center'}}>to make it easier to learn and help others learn</Typography> 
                        <SelectSimple
                            handleChange={handleChange}
                            selectID="user-Language"
                            selectValue={language}
                            label="Language"
                            labelID="user-language-label"
                            menuItems={menuItems}
                        ></SelectSimple>
                   </Grid>
               </Grid>
        </Container>
    )
}
