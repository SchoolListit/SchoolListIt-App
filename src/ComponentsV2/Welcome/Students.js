import React from 'react';
import { Container, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


export default function Students() {
    return (
        <Container 
            fixed={true} 
            maxWidth={false}
            style={{height: '100vh', padding: '80px 0'}}
            >
               <Grid container  justify="center" alignContent="center" alignItems="center" style={{height: '100%'}}>
                   <Grid item  >
                        <Typography variant="h2" style={{fontWeight: '700', textAlign: 'center'}}>Students</Typography>
                        <Typography variant="h3" style={{textAlign: 'center'}}>add your student profiles</Typography>
                        <Typography variant="h5" style={{marginTop: '20px', textAlign: 'center'}}>the names of your students</Typography>
                        <Typography variant="h5" style={{textAlign: 'center'}}>are kept very secure only in your profile</Typography> 
                   </Grid>
               </Grid>
        </Container>
    )
}