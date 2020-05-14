import React, { useContext, useState } from 'react';
import { Container, Grid, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../../Context/Context.js';
import Classrooms from './Classrooms.js';
import AddLessonPlan from '../Forms/AddLessonPlan.js'
import ContentCard from './ContentCard.js';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        maxHeight: 'none',
        width: '100vw',
        maxWidth: 'none !important',
        overflow: 'auto'
    },
  }));

export default function Feed() {
    const [state, setState] = useContext(Context);
    const { assignments } = state;
    const classes = useStyles();

    
    return (
        <Container 
        fixed={true} 
        maxWidth={false}
        className={classes.root}
        >
            <Classrooms></Classrooms>
            <AddLessonPlan></AddLessonPlan>
        </Container>
    )    
}
