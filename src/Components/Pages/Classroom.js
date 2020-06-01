import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Grid, Typography, Dialog, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../../Context/Context.js';
import { searchSections } from '../../Context/functions.js';
import Header from '../Components/Header.js';
import Classrooms from '../Components/Classrooms.js'
import { useHistory } from 'react-router-dom';
import ClassWeek from './../Components/ClassWeek.js';
import AddLesson from './../Forms/AddLesson.js';


function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

 

const useStyles = makeStyles(() => ({
    root: {
        margin: '0',
        padding: '0'
    },
  })); 

  const initialShowForm = {
    teachers: '',
    grades: '',
    schools: '',
    subjects: ''
}   



export default function Classroom() {
    const classes = useStyles();
    const { classArgs } = useParams();
    const [state, setState] = useContext(Context);
    //const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const { profile } = state;
    const { userID } = profile;
    const [showGlobalForm, setShowGlobalForm] = useState(false);
    const [singlePostID, setSinglePostID] = useState('');
    const [newPost, setNewPost] = useState('');
    const [showForm, setShowForm] = useState(initialShowForm);
    const [newSection, setNewSection] = useState("undefined");
    const [thisWeek, setThisWeek] = useState(moment().format("YYYY-MM-DD"));
    const [searchResults, setSearchResults] = useState([]);


    const clearSearch = () =>{
        console.log('clearsearch');
        setSearchResults([]);
    } 


    const getSearchResults = (searchTerm) => {

        if(state.sections.length === 0){
            console.warn('the sections context is not yet propogated');
        } else {
            let results = searchSections(state.sections, searchTerm);
            setSearchResults(results);
        }
        
    }


    const changeTheDate = (date) => {
        setThisWeek(date);
    }

    const showNewPost = (newPost) => {
        setNewPost(newPost);
    }

    const showNewSection = (section) => {
        setNewSection(section);
    }

    const openGlobalForm = () => {
        setShowGlobalForm(true);
    }

    const onCloseGlobalForm = () => {
        setShowGlobalForm(false);
    }    
    
    let theClass = decodeURIComponent(classArgs).replace(":", "").split("-");
    
    const section = {
        schools: theClass[0],
        teachers: theClass[1],
        subjects: theClass[2],
        grades: theClass[3],
        key: theClass,
    }

    if(typeof userID === 'undefined' || userID === ''){
        console.log(userID);
        return null;
    } else {
        return (
            <React.Fragment>
                <Header profile={profile} openGlobalForm={openGlobalForm} getSearchResults={getSearchResults} ></Header>
                <Container className={classes.root}>
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
                    <Typography variant="h5" style={{padding: '0 30px', background: '#eeeeee'}}>Weekly Class Schedule</Typography>
                    <ClassWeek newPost={newPost} section={section} week={thisWeek} userID={state.profile.userID} profile={profile} changeTheDate={changeTheDate} ></ClassWeek>
                </Container>
                <Dialog open={showGlobalForm} onClose={(e) => onCloseGlobalForm()} disablePortal={true}>
                    <AddLesson section={section} onClickHideForm={onCloseGlobalForm} showNewPost={showNewPost} showNewSection={showNewSection}></AddLesson>
                </Dialog>
            </React.Fragment>
        );
    }
    
    
}
    
    
