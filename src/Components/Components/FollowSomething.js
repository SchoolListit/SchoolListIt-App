import React from 'react';
import { Typography, Grid, Container, Card, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from './SearchBar.js';




export default function FollowSomething() {
    return (
        <Container>
            <Grid container justify="center" alignItems="center" alignContent="center">
                <Grid item xs={12} style={{textAlign: 'center', maxWidth: '500px', padding: '50px'}}>
                    <Typography variant="h2" style={{fontWeight: '700'}}>SchooListIt</Typography>
                    <Typography variant="overline">the easiest way to track schoolwork on the planet</Typography>
                    <Typography variant="h5">Public education should be public. Easy access to homework and schoolwork is just the beginning. </Typography>
                </Grid>
                <Grid spacing={5} container justify="center" alignItems="center" alignContent="center" item xs={12}>
                    <Grid item xs={12} md={4} >
                    <Card style={{textAlign: 'center', padding: '30px', minHeight: '350px'}}>
                        <Typography variant="h2" style={{color: '#9e9e9e'}}><FontAwesomeIcon icon="bell"></FontAwesomeIcon></Typography>
                            <Typography variant="h6">Find your school</Typography>
                            <Typography paragraph variant="h6">follow classes</Typography>
                            <Typography paragraph>Search here for your school and click "follow" on your classes. Its just that easy.</Typography>
                           <SearchBar width="90%" background='#FFCB28'></SearchBar>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card style={{textAlign: 'center', padding: '30px', minHeight: '350px'}}>
                        <Typography variant="h2" style={{color: '#9e9e9e'}}><FontAwesomeIcon icon="heart"></FontAwesomeIcon></Typography>
                            <Typography variant="h6">Give a teacher</Typography>
                            <Typography paragraph variant="h6">some love</Typography>

                            <Typography paragraph>Can't find your classroom? Help out your teachers by adding the lessons. </Typography>
                            <Button variant="contained" color="primary" >Add A Lesson</Button>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
