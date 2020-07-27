import React from 'react';
import { Container, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function AboutYou() {
    return (
        <Container 
            fixed={true} 
            maxWidth={false}
            style={{height: '100vh', padding: '80px 0'}}
            >
               <Grid container  justify="center" alignContent="center" style={{height: '100%'}}>
                   <Grid item alignSelf="center" >
                        
                        <Typography variant="h2" style={{fontWeight: '700', textAlign: 'center'}}>About You</Typography>
                        <Typography variant="h3" style={{textAlign: 'center'}}>we are all learners</Typography>
                        <Typography variant="h5" style={{marginTop: '20px', textAlign: 'center'}}>Are you also helping a student</Typography>
                        <Typography variant="h5" style={{textAlign: 'center'}}>as a parent, grandparent, neighbor, family friend?</Typography> 
                   </Grid>
               </Grid>
        </Container>
    )
}
