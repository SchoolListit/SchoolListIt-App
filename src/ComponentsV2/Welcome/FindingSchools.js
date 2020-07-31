import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Dialog, DialogTitle, TextField, DialogActions, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckSchools from './CheckSchools';


export default function FindingSchools( { userState, setUserState, setContentState} ) {
    const [schoolOptions, setSchoolOptions] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);


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

    const letsGo = () => {setContentState('home')}

    const saveSchool = (userState) => {
        let school = {
            name: document.getElementById('add-school').value,
            address: ''
        }
        let newuser = userState;
        newuser.mySchools.push(school);
        setUserState(newuser);
        setDialogOpen(!dialogOpen);
    }

    const closeDialog = () => {

    }

   const openDialog = () => {
        setDialogOpen(!dialogOpen);
   }
    
            
    return (
        <Container 
            fixed={true} 
            maxWidth={false}
            style={{height: '100vh', padding: '80px 0'}}
            >
               <Grid container  justify="center" alignContent="center" alignItems="center" style={{height: '100%'}}>
                   <Grid item  xs={12}>
                        <Typography variant="h2" style={{fontWeight: '700', textAlign: 'center'}}>Schools</Typography>
                        <Typography variant="h3" style={{textAlign: 'center'}}>finding nearby schools</Typography>
                        <Typography variant="h5" style={{marginTop: '20px', textAlign: 'center'}}>we're checking with Google</Typography>
                        <Typography variant="h5" style={{textAlign: 'center'}}>to find schools nearby you</Typography> 
                        {(schoolOptions === 'undefined' || schoolOptions.length === 0)
                            ? <Container style={{height: '200px', textAlign: 'center'}}>
                                    <CircularProgress color="secondary"></CircularProgress>
                                </Container>
                            : <CheckSchools userState={userState} setUserState={setUserState} setContentState={setContentState} schoolOptions={schoolOptions}></CheckSchools>
                        }
                        </Grid>
                         {/**
             * Below here is what opens in the dialog box to add the students. 
             * TODO: pull this into a standalone component. It is a little too much here.
             */}
                    <Grid item xs={12} style={{textAlign: 'center'}}> 
                        <Typography variant="subtitle1">If you don't see your school, no problem. </Typography>
                        <Typography variant="subtitle1">Just enter it </Typography>
                        <Button onClick={openDialog} > Add School
                            <FontAwesomeIcon icon="plus-square"></FontAwesomeIcon>
                        </Button>
                   </Grid>
                   <Grid item xs={12} style={{textAlign: 'center'}}>
                        <Button onClick={(e) => letsGo()} variant="contained" style={{marginTop: '20px'}} color="primary">That's It. Lets Go.</Button>
                    </Grid>
               </Grid>
        
        <Dialog open={dialogOpen} onClose={closeDialog} keepMounted={true} >
            <Container style={{padding: '50px',}}>
            <DialogTitle>Add School</DialogTitle>
                <TextField 
                    fullWidth={true}
                    required 
                    id='add-school'
                    name='add-school'
                    label="School Name"
                    helperText="Add School"  
                ></TextField> 
                <DialogActions>
                <Button onClick={(e) => saveSchool(userState)} color="primary">
                    Save School
                </Button>
            </DialogActions>
            </Container>
      </Dialog>
      </Container>
    )
    
} 

