import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../../Context/Context.js';
import Classrooms from './Classrooms.js';
import AddLessonPlan from '../Forms/AddLessonPlan.js'
import ContentCard from './ContentCard.js';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',  
        justifyContent: 'spaceEvenly', 
        flexWrap: 'wrap',
    },
  }));

export default function Feed() {
    const [state, setState] = useContext(Context);
    const { assignments } = state;
    const classes = useStyles();

    
    return (
        <div className={classes.root}  >
        <Classrooms></Classrooms>
        <AddLessonPlan></AddLessonPlan>

    </div>
    )    
}
