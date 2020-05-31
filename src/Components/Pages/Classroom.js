import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Grid, Typography, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../../Context/Context.js';
import Header from '../Components/Header.js';
import { useHistory } from 'react-router-dom';
import ClassWeek from './../Components/ClassWeek.js';
import AddLesson from './../Forms/AddLesson.js';


function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const useStyles = makeStyles(() => ({
    root: {
        margin: '0',
        padding: '30px',
        
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
    const history = useHistory();
    const { classArgs } = useParams();
    const [state, setState] = useContext(Context);
    const { assignments, currentAssignment, loggedIn } = state; 
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const {userID} = profile;
    const [showGlobalForm, setShowGlobalForm] = useState(false);
    const [singlePostID, setSinglePostID] = useState('');
    const [newPost, setNewPost] = useState('');
    const [showForm, setShowForm] = useState(initialShowForm);
    const [newSection, setNewSection] = useState("undefined");
    const [thisWeek, setThisWeek] = useState(moment().format("YYYY-MM-DD"));


    const changeTheDate = (date) => {
        //console.log(e.target.value)
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

    const weekTitle = (stringDate) => {
        const theMoment = moment(stringDate);
        const theDate = moment(stringDate).format("MM-DD-YYYY")
        const weekNumber = moment(stringDate).format('ww');
        const startDate = moment(stringDate).startOf('week').format('dddd MM-DD-YYYY');
        const endDate = moment(stringDate).endOf('week').format('dddd MM-DD-YYYY');
        return (
            <React.Fragment>
                <Typography variant="h6">Week {weekNumber}: {theDate}</Typography>
                <Typography >{startDate+" - "+endDate}</Typography>
            </React.Fragment>
        )
    }

    const increments = [1, 2, 3, 4, 5];  


    return (
        <React.Fragment>
            <Header profile={profile} openGlobalForm={openGlobalForm} ></Header>
            <Container className={classes.root}>
                <ClassWeek newPost={newPost} section={section} week={thisWeek} userID={profile.userID} profile={profile} changeTheDate={changeTheDate} ></ClassWeek>
            </Container>
            <Dialog open={showGlobalForm} onClose={(e) => onCloseGlobalForm()} disablePortal={true}>
                <AddLesson section={section} onClickHideForm={onCloseGlobalForm} showNewPost={showNewPost} showNewSection={showNewSection}></AddLesson>
            </Dialog>
        </React.Fragment>
    );
    
}
    
    
