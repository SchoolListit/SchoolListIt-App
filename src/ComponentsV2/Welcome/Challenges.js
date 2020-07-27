import React from 'react';
import { Container, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


export default function Challenges() {
    return (
        <Container 
            fixed={true} 
            maxWidth={false}
            style={{height: '100vh', padding: '80px 0'}}
            >
               <Grid container  justify="center" alignContent="center" style={{height: '100%'}}>
                   <Grid item alignSelf="center" >
                        
                        <Typography variant="h2" style={{fontWeight: '700', textAlign: 'center'}}>Challenges</Typography>
                        <Typography variant="h3" style={{textAlign: 'center'}}>how can we help?</Typography>
                        <Typography variant="h5" style={{marginTop: '20px', textAlign: 'center'}}>everyone has challenges</Typography>
                        <Typography variant="h5" style={{textAlign: 'center'}}>tell us how we can help</Typography> 
                   </Grid>
               </Grid>
        </Container>
    )
}