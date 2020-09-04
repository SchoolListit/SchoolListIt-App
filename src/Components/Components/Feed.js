import React, { useEffect, useContext, useState, Profiler  } from 'react';
import axios from 'axios';
import { Dialog, Typography, Button, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Context } from '../../Context/Context.js';
import Classrooms from './Classrooms.js';
import FollowSomething from '../Components/FollowSomething.js';
import AddLesson from '../Forms/AddLesson.js';
import { emptyArray } from '../../Context/functions.js';


export default function Feed( {searchResults, getSearchResults, setSearchResults, openGlobalForm, onCloseGlobalForm, showGlobalForm} ) {
    const [state, setState] = useContext(Context);
    const [newPost, setNewPost] = useState('');
    const [newSection, setNewSection] = useState("undefined");
    const {sections, following} = state;
    const [showFollow, setShowFollow] = useState(true);
    //const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const { profile } = state;

    

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
        setSearchResults([]);
    }

    const clearSetUp = () =>{
        setShowFollow(false);
        profile.first_time = false;
        setState(state);
    }


    if(sections === 'undefined' || profile === 'undefined' || profile == null || typeof profile === "undefined"){
        return null;
    } else {
        return (
            <React.Fragment>
                <React.Fragment>
                {(showFollow === true)
                    ? <React.Fragment>
                        <Grid container justify="space-between" style={{padding: '0 30px', background: '#eeeeee'}} >
                        <Grid item xs={10} >
                            <Typography variant="h5" >Good Morning :)</Typography>
                        </Grid>
                        <Grid item xs={2} style={{textAlign: 'right'}}>
                            <Button onClick={() => clearSetUp()}><FontAwesomeIcon icon="window-close"></FontAwesomeIcon></Button>
                        </Grid>
                        </Grid>
                    </React.Fragment>
                    : null
                    }
                        {(showFollow === true)
                            ? <FollowSomething
                                searchResults={searchResults}
                                getSearchResults={getSearchResults} 
                                openGlobalForm={openGlobalForm}
                                following={following}
                                changeContext={setState}
                                context={state}
                                setShowFollow={setShowFollow}
                                clearSetUp ={clearSetUp}
                            ></FollowSomething>
                            : null
                        } 
                    
                    </React.Fragment>
                    
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
                <Classrooms  sections={searchResults} newPost={newPost} newSection={newSection} showNewSection={showNewSection} showNewPost={showNewPost} openGlobalForm={openGlobalForm} onCloseGlobalForm={onCloseGlobalForm}></Classrooms> 
                <Typography variant="h5" style={{padding: '0 30px', background: '#eeeeee'}}>Class Feed</Typography>
                <Classrooms  sections={following} newPost={newPost} newSection={newSection} showNewPost={showNewPost} openGlobalForm={openGlobalForm} onCloseGlobalForm={onCloseGlobalForm}></Classrooms> 
                {(following.length < 1)
                    ? <Alert severity="warning">It seems your class feed is loading classes. If this message persists, maybe you have not followed any classes. If you dont see your class, you can create it by adding an assignment. If you don't know one, just call it "building the classroom"</Alert>
                    : null
                }
                <Dialog open={showGlobalForm} onClose={(e) => onCloseGlobalForm()} disablePortal={true}>
                    <AddLesson section={false} onClickHideForm={onCloseGlobalForm} showNewPost={showNewPost} showNewSection={showNewSection}></AddLesson>
                </Dialog>
                
            </React.Fragment>
             
        )
    }
        
}
