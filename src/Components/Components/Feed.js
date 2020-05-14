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
        height: '100vh',
        width: '100vw',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        background: "url('https://msp-media.org/wp-content/images/robert-collins-tvc5imO5pXk-unsplash.jpg')",
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
