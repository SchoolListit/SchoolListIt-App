import React from 'react';
import { Grid, Typography, Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Footer() {
    return (
        <Container maxWidth={false} style={{padding: '0', margin: '0'}}>
            <Grid 
            container 
            spacing={0}
            justify="space-around"
            alignContent
            style={{
                position: "fixed",
                bottom: '0',
                paddingTop: '5px',
                width: '100%',
                height: '80px', 
                backgroundColor: '#bdbdbd',
                textAlign: 'center'
            }}>
            <Grid item  style={{padding: '0 20px 10px 20px'}}>
                <Typography variant="h4">
                    <FontAwesomeIcon icon="calendar-week"></FontAwesomeIcon>
                </Typography>
                <Typography>
                    Schedule
                </Typography>
            </Grid>
            <Grid  item style={{margin: '-40px', padding: '0 20px 10px 20px'}}>
                <div style={{borderRadius: '50%', padding: '20px', backgroundColor: '#bdbdbd', dispplay: 'block'}}>
                    <Typography variant="h3">
                        <FontAwesomeIcon icon="home" ></FontAwesomeIcon>
                    </Typography>
                
                    <Typography>
                        Home
                    </Typography>
                </div>
            </Grid>
            <Grid item  style={{padding: '0 20px 10px 20px'}}>
                <Typography variant="h4">
                    <FontAwesomeIcon icon="book"></FontAwesomeIcon>
                </Typography>
                <Typography>
                    Class Feed
                </Typography>
            </Grid>
        </Grid>
        </Container>
        
    )
}
