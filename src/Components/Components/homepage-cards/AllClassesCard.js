import React, {useState} from 'react';
import moment from 'moment';
import { Grid, Typography, Card, Button  } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect, useHistory } from 'react-router-dom';



export default function AllClassesCard( {sections, searchSections} ) {
    const [showEverything, setShowEverything] = useState('');
    const [classes, setClasses] = useState([]);
    const history = useHistory();

    const sendToTimeline = () => {
        history.push('/class-feed/');
    }

    const showEverythingNow = (search) => {
        setShowEverything('yes');
    }

    if(showEverything === 'yes'){
        return (
            <React.Fragment>{sendToTimeline()}</React.Fragment> 
        )
    } else {
        return (
            <Grid item xs={12} md={4} style={{textAlign: 'center'}}>
                <Card style={{textAlign: 'center', padding: '30px', minHeight: '350px'}}>
                <Typography variant="h2" style={{color: '#9e9e9e'}}><FontAwesomeIcon icon="heart"></FontAwesomeIcon></Typography>
                    <Typography variant="h6">I'm in a browsey</Typography>
                    <Typography paragraph variant="h6"> sorta mood</Typography>
                    <Grid container justify="center" alignItems="center" alignContent="center" >
                    <Grid item xs={12} style={{height: '100px'}}>
                        <Typography >I can't find my school</Typography>
                        <Typography paragraph> so just show me everything.</Typography>
                    </Grid>
                    </Grid>
                    <Button variant="contained" color="primary" style={{minWidth: '90%'}} onClick={ () => showEverythingNow()}>follow classes</Button>
                </Card>
            </Grid>
        )

    }

    
}