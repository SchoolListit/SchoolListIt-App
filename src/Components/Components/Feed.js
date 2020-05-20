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
    const [newPostData, setNewPostData] = useState('');
    const [newSectionData, setNewSectionData] = useState('');
    const { assignments } = state;
    const classes = useStyles();

    const showNewPostData = (newPost) => {
        setNewPostData(newPost);
        console.log(newPostData)
    }

    const showNewSection = (newSection) => {
        setNewSectionData(newSection);
        console.log(newSectionData)
    }

    return (
        <Container 
        maxWidth={false}
        style={{padding: '30px'}}
        >
            <Grid
                container 
                spacing={1} 
                >
                <Grid item xs={12} md={3} > 
                    <PostLesson 
                        section={false} 
                        grades={state.grades} 
                        teachers={state.teachers}
                        subjects={state.subjects}
                        schools={state.schools}
                        showNewPost={showNewPostData}
                        showNewSection={showNewSection}
                        ></PostLesson>
                </Grid>
                <Grid item xs={12} md={9} container > 
                    <Classrooms newPost={newPostData} showNewPost={showNewPostData} newSection={newSectionData} showNewSection={showNewSection}></Classrooms>
                </Grid>
            </Grid>
        </Container>
    )    
}
