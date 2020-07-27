import React from 'react';
import { Container, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


export default function Language() {
    return (
        <Container 
            fixed={true} 
            maxWidth={false}
            style={{height: '100vh', padding: '80px 0'}}
            >
               <Grid container  justify="center" alignContent="center" style={{height: '100%'}}>
                   <Grid item alignSelf="center" >
                        
                        <Typography variant="h2" style={{fontWeight: '700', textAlign: 'center'}}>Language</Typography>
                        <Typography variant="h3" style={{textAlign: 'center'}}>what's your first?</Typography>
                        <Typography variant="h5" style={{marginTop: '20px', textAlign: 'center'}}>We can translate english for you</Typography>
                        <Typography variant="h5" style={{textAlign: 'center'}}>to make it easier to learn and help others learn</Typography> 
                   </Grid>
               </Grid>
        </Container>
    )
}
