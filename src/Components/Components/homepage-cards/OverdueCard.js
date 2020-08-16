import React from 'react';
import moment from 'moment';
import { Grid, Typography, Card, Button  } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';







export default function OverdueCard(  ) {

    return (
        <Grid item xs={12} md={4}>
                        <Card style={{textAlign: 'center', padding: '30px', minHeight: '350px'}}>
                        <Typography variant="h2" style={{color: '#9e9e9e'}}><FontAwesomeIcon icon="exclamation-triangle"></FontAwesomeIcon></Typography>
                            <Typography variant="h6">Give a teacher</Typography>
                            <Typography paragraph variant="h6">some love</Typography>
                            <Grid container justify="center" alignItems="center" alignContent="center" >
                            <Grid item xs={12} style={{height: '100px'}}>
                                <Typography >Can't find your classroom?</Typography>
                                <Typography paragraph> Help out by adding lessons.</Typography>
                            </Grid>
                            </Grid>
                            <Button variant="contained" color="primary" style={{minWidth: '90%'}} >Add A Lesson</Button>
                        </Card>
                    </Grid>
    )
}