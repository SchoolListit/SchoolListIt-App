import React, { useEffect, useContext, useState  } from 'react';
import { Dialog } from '@material-ui/core';
import { Context } from '../../Context/Context.js';
import Classrooms from './Classrooms.js';
import AddLesson from '../Forms/AddLesson.js';


export default function Feed( {showGlobalForm, onCloseGlobalForm} ) {
    const [state, setState] = useContext(Context);
    const [newPost, setNewPost] = useState('');
    const [newSection, setNewSection] = useState("undefined");

    
    const showNewPost = (newPost) => {
        setNewPost(newPost);
    }

    const showNewSection = (section) => {
        setNewSection(section);
    }

    return (
        <React.Fragment>
            <Classrooms  newPost={newPost} newSection={newSection} showNewPost={showNewPost} ></Classrooms> 
            <Dialog open={showGlobalForm} onClose={(e) => onCloseGlobalForm()} disablePortal={true}>
                <AddLesson section={false} onClickHideForm={onCloseGlobalForm} showNewPost={showNewPost} showNewSection={showNewSection}></AddLesson>
            </Dialog> 
        </React.Fragment>
         
    )    
}
