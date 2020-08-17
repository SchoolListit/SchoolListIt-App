import React, { useEffect, useContext, useState, Profiler  } from 'react';
import axios from 'axios';
import { Dialog, Typography, Button, Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Context } from '../../Context/Context.js';
import Classrooms from './Classrooms.js';
import FollowSomething from '../Components/FollowSomething.js';
import AddLesson from '../Forms/AddLesson.js';
import { emptyArray } from '../../Context/functions.js';

export default function SectionTitle( {canClose, closeSection, section} ) {


    return (
        <React.Fragment>
        <Grid container justify="space-between" style={{padding: '0 30px', background: '#eeeeee'}} >
            <Grid item xs={10} >
                <Typography variant="h5" >{section}</Typography>
            </Grid>
            {(canClose === 'yes')
                ? <Grid item xs={2} style={{textAlign: 'right'}}>
                    <Button onClick={() => closeSection(section)}>
                        <FontAwesomeIcon icon="window-close"></FontAwesomeIcon>
                    </Button>
                </Grid>
                : null
            }
        </Grid>    
        </React.Fragment>
    );
}