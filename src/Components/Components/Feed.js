import React, { useEffect, useContext, useState, Profiler  } from 'react';
import axios from 'axios';
import { Dialog, Typography, Button, Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Context } from '../../Context/Context.js';
import Classrooms from './Classrooms.js';
import FollowSomething from '../Components/FollowSomething.js';
import AddLesson from '../Forms/AddLesson.js';
import { emptyArray } from '../../Context/functions.js';


export default function Feed( {searchResults, setSearchResults, openGlobalForm, onCloseGlobalForm, showGlobalForm} ) {
    const [state, setState] = useContext(Context);
    const [newPost, setNewPost] = useState('');
    const [newSection, setNewSection] = useState("undefined");
    const {sections, following} = state;
    const [showFollow, setShowFollow] = useState('');
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    

    const showNewPost = (newPost) => {
        setNewPost(newPost);
    }

    const showNewSection = (section) => {
        setNewSection(section);
    }

    
    const calcStatus = () => {
        if(searchResults !== null) {
            return 'searched'
        }

        if(following.sections.length > 0 ){
            return 'followingSomething';
        }

        
    }

    const clearSearch = () =>{
        console.log('clearsearch');
        setSearchResults([]);
    }


    if(sections === 'undefined' || profile === 'undefined' || profile == null){
        return null;
    } else {
        return (
            <React.Fragment>
                {(showFollow !== false)
                    ? <React.Fragment>
                    <FollowSomething
                        setSearchResults={setSearchResults} 
                        openGlobalForm={openGlobalForm}
                        following={following}
                        changeContext={setState}
                        context={state}
                        setShowFollow={setShowFollow}
                    ></FollowSomething>
                    </React.Fragment>
                    : null
                }
                {(searchResults.length > 0)
                    ? <Grid container justify="space-between" style={{padding: '0 30px', background: '#eeeeee'}} >
                        <Grid item xs={10} >
                            <Typography variant="h5" >Search Results</Typography>
                        </Grid>
                        <Grid item xs={2} style={{textAlign: 'right'}}>
                            <Button onClick={() => clearSearch()}><FontAwesomeIcon icon="window-close"></FontAwesomeIcon></Button>
                        </Grid>
                        </Grid>
                    : null
                }
                <Classrooms  sections={searchResults} newPost={newPost} newSection={newSection} showNewPost={showNewPost} openGlobalForm={openGlobalForm} onCloseGlobalForm={onCloseGlobalForm}></Classrooms> 
                <Typography variant="h5" style={{padding: '0 30px', background: '#eeeeee'}}>Class Feed</Typography>
                <Classrooms  sections={following} newPost={newPost} newSection={newSection} showNewPost={showNewPost} openGlobalForm={openGlobalForm} onCloseGlobalForm={onCloseGlobalForm}></Classrooms> 
            
                <Dialog open={showGlobalForm} onClose={(e) => onCloseGlobalForm()} disablePortal={true}>
                    <AddLesson section={false} onClickHideForm={onCloseGlobalForm} showNewPost={showNewPost} showNewSection={showNewSection}></AddLesson>
                </Dialog>
                
            </React.Fragment>
             
        )
    }
        
}
