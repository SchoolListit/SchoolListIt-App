import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Container, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckSchools from './CheckSchools';


export default function FindingSchools( { userState, setUserState, setContentState} ) {
    const [schoolOptions, setSchoolOptions] = useState([]);

    useEffect( () => {
        const url = 'https://schoolistit.com/wp-json/schoolistit/v2/get_nearby_schools';            
        const schools = axios.post(url, {lat: "35.49152", lng: "-75.503700"}).then( res => {
        console.log(res.data);
        let schoolArray = [];
        for (const [key, value] of Object.entries(res.data)) {
            //console.log(`${key}: ${value}`);
            schoolArray.push(value);
            }
        setSchoolOptions(schoolArray);
    })
    }, [setSchoolOptions])
    
            
    return (
        <Container 
            fixed={true} 
            maxWidth={false}
            style={{height: '100vh', padding: '80px 0'}}
            >
               <Grid container  justify="center" alignContent="center" alignItems="center" style={{height: '100%'}}>
                   <Grid item  >
                        <Typography variant="h2" style={{fontWeight: '700', textAlign: 'center'}}>Schools</Typography>
                        <Typography variant="h3" style={{textAlign: 'center'}}>finding nearby schools</Typography>
                        <Typography variant="h5" style={{marginTop: '20px', textAlign: 'center'}}>we're checking with Google</Typography>
                        <Typography variant="h5" style={{textAlign: 'center'}}>to find schools nearby you</Typography> 
                        {(schoolOptions === 'undefined' || schoolOptions.length === 0)
                            ? <Typography>...loading schools</Typography>
                            : <CheckSchools userState={userState} setUserState={setUserState} setContentState={setContentState} schoolOptions={schoolOptions}></CheckSchools>
                        }
                        <Typography>Add School <FontAwesomeIcon icon="plus-square"></FontAwesomeIcon></Typography>
                   </Grid>
               </Grid>
        </Container>
    )
    
} 

