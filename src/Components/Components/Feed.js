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
        maxHeight: '100vh',
        width: '100vw',
        maxWidth: 'none !important',
        overflow: 'scrollY'
    }
  }));



 

export default function Feed() {
    const [state, setState] = useContext(Context);
    const [newPost, setNewPost] = useState('');
    const [newSection, setNewSection] = useState('');
    const { assignments } = state;
    const classes = useStyles();

    

    const onClickAssignment = () => {
        //do nothing
    }

    return (
        <Container>
            <Classrooms onClickAssignment={onClickAssignment} newPost={newPost} newSection={newSection}></Classrooms>
        </Container>
        
        
    )    
}
