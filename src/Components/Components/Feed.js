import React, { useContext, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../../Context/Context.js';
import Classrooms from './Classrooms.js';
import PostLesson from '../Forms/PostLesson.js'
import ContentCard from './ContentCard.js';

const useStyles = makeStyles(() => ({
    root: {
        minHeight: '100vh',
        maxHeight: 'none',
        width: '100vw',
        maxWidth: 'none !important',
        overflow: 'auto'
    },
    classGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
    }
  }));

export default function Feed() {
    const [state, setState] = useContext(Context);
    const { assignments } = state;
    const classes = useStyles();

    
    return (
        <Container 
        maxWidth={false}
        style={{padding: '30px'}}
        >
            <Grid
                container 
                spacing={1} 
                >
                <Grid item xs={12} md={4} > 
                    <PostLesson 
                        section={false} 
                        grades={state.grades} 
                        teachers={state.teachers}
                        subjects={state.subjects}
                        schools={state.schools}
                        ></PostLesson>
                </Grid>
                <Grid item xs={12} md={8} container > 
                    <Classrooms></Classrooms>
                </Grid>
            </Grid>
        </Container>
    )    
}
