import React, {useState, useEffect} from 'react';
import { Container, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


export default function FindingSchools( { nearbySchools } ) {


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
                   </Grid>
               </Grid>
        </Container>
    )
}
