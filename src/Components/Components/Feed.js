import React, { useEffect, useContext, useState, Profiler  } from 'react';
import axios from 'axios';
import { Dialog, Typography, Container, Grid } from '@material-ui/core';
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
    const [theStatus, setTheStatus] = useState('');
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

    const content = () => {
        if(profile === 'undefined' || profile === null){
            return null;
        }
        let userStatus;
        if(profile.first_time == 'true'){
            userStatus = 'firstTime';
        } else {
            if(searchResults.length >0){
                userStatus = 'searched';
            }
        }
        switch (userStatus) {
            case 'firstTime': 
                    return(
                        <React.Fragment>
                        <FollowSomething 
                            openGlobalForm={openGlobalForm}
                            following={following}
                        ></FollowSomething>
                        <Container>
                            <Grid container justify="center" alignItems="center" alignContent="center" spacing={5}>
                                <Grid item xs={12} style={{textAlign: 'center', maxWidth: '500px', padding: '50px'}}>
                                        <Typography variant="h5" >Welcome To SchooListIt</Typography>
                                        <Typography >This is your home feed. Use the tools above to find more classes to follow. When you follow a class it shows up in your home feed. </Typography>
                                </Grid>
                            </Grid>
                        </Container>
                        </React.Fragment>
                    );
                break; 
                default: 
                return null 
        }
    }


    if(sections === 'undefined' || profile === 'undefined'){
        return null;
    } else {
        return (
            <React.Fragment>
                {(profile.first_time == 'true')
                    ? <React.Fragment>
                    <FollowSomething
                        setSearchResults={setSearchResults} 
                        openGlobalForm={openGlobalForm}
                        following={following}
                    ></FollowSomething>
                    </React.Fragment>
                    : null
                }
                {(searchResults.length > 0)
                    ? <Typography variant="h5" style={{textAlign: 'center'}}>Search Results</Typography>
                    : null
                }
                <Classrooms  sections={searchResults} newPost={newPost} newSection={newSection} showNewPost={showNewPost} openGlobalForm={openGlobalForm} onCloseGlobalForm={onCloseGlobalForm}></Classrooms> 
                <Classrooms  sections={following} newPost={newPost} newSection={newSection} showNewPost={showNewPost} openGlobalForm={openGlobalForm} onCloseGlobalForm={onCloseGlobalForm}></Classrooms> 
            
                <Dialog open={showGlobalForm} onClose={(e) => onCloseGlobalForm()} disablePortal={true}>
                    <AddLesson section={false} onClickHideForm={onCloseGlobalForm} showNewPost={showNewPost} showNewSection={showNewSection}></AddLesson>
                </Dialog>
                
            </React.Fragment>
             
        )
    }
        
}
