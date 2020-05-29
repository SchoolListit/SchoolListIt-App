import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Grid, Typography, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../../Context/Context.js';
import Header from '../Components/Header.js';
import { useHistory } from 'react-router-dom';
import DailyWork from './../Components/DailyWork.js';
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
                <Grid container style={{border: "1px solid #bdbdbd"}}>
                    <Grid key="section-header-row" item xs={12} container justify="space-between" className="entry-header">
                        <Grid key="not sure but hole cow" item xs={8} >
                        <Typography variant="h6">{section.schools+" "+ section.teachers}</Typography>
                        <Typography variant="h6">{section.grades+" "+ section.subjects}</Typography>
                        </Grid>
                        <Grid key="weektitle" item xs={4} style={{textAlign: 'right'}}>
                            {weekTitle('2020-05-15')}
                        </Grid>
                    </Grid>
                    <Grid key="assignment-table" item container xs={12} spacing={1} justify="space-between" >
                            {increments.map( increment => {
                                let theQueryDate = moment('2020-05-15').startOf('week').add(increment, 'days').format('YYYY-MM-DD');
                                let colTitle = moment('2020-05-15').startOf('week').add(increment, 'days').format("ddd MM-DD-YYYY");
                                return (
                                    <Grid item xs={2} key={"dailyAssignments-"+colTitle}>
                                        <Typography key={"theTitle-"+moment('2020-05-15').format('ww')} variant="subtitle1">{colTitle}</Typography>                                       
                                        <DailyWork key={"dailyWork-"+moment('2020-05-15').add(increment, 'days').format('YYYY-MM-DD')}  userID={userID} date={theQueryDate} section={section}></DailyWork>
                                    </Grid> 
                                )
                            })}
                    </Grid>
                </Grid>
                
            </Container>
            <Dialog open={showGlobalForm} onClose={(e) => onCloseGlobalForm()} disablePortal={true}>
                <AddLesson section={false} onClickHideForm={onCloseGlobalForm} showNewPost={showNewPost} showNewSection={showNewSection}></AddLesson>
            </Dialog>
        </React.Fragment>
        
    );
    
}
    
    
