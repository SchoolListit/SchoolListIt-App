import React, {useContext } from 'react';
import { Context } from '../../Context/Context.js';
import { Grid, Avatar, Typography, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect, useHistory } from 'react-router-dom';
import TermSearch from './TermSearch.js';





    const useStyles = makeStyles((theme) => ({
        root: {
            background: 'none',
            position: 'fixed',
            position: '0',
            backgroundColor: '#ffca28',
            padding: '5px 30px',

        },
        menuIcon: {
            fontSize: '2em'
        }
        
    }));

    const goToSite = () => {
        window.location.href = 'https://schoolistit.com/about/';
    }

    const goToIssues = () => {
        window.location.href = 'https://github.com/megphillips91/SchooListIt-Issues/issues';
    }

      

  

  export default function Header( {openGlobalForm, getSearchResults} ) {
    const classes = useStyles();
    const [state, setState] = useContext(Context);
    const { schools, teachers, subjects } = state;
    let history = useHistory();
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));

    const goHere = (location) => {
        history.push(location);
    }


    const options = [];
    schools.map( school => {
        let option = {
            label: (school.description !== '') ? school.description : school.name,
            value: school.name
        }
        options.push(option);
    })
    teachers.map( teacher => {
        let option = {
            label: teacher.name,
            value: teacher.name
        }
        options.push(option);
    })
    subjects.map( subject =>{
        let option = {
            label: subject.name,
            value: subject.name
        }
        options.push(option);
    })

    

    const profileClick = () => {
        localStorage.removeItem('scholistit_profile');
        localStorage.removeItem('scholistit-profileStudents');
        let profile;
        state.profile = profile;
        setState(state);
        history.push("/sign-in");
      }
     
    //lets do business  
    if(profile === null){
        return <Redirect to="/sign-in" exact></Redirect>
    } else {
        return (
                <Grid container className={classes.root} justify="space-between" alignItems="center" alignContent="flex-start">
                    <Grid item xs={12} md={3} >
                        <Typography style={{ color: '#424242', fontWeight: '700', textAlign: 'center'}} variant="h6" component="h1" onClick={ () => goHere('/')}>School List It</Typography>
                    </Grid>
                     <Grid item xs={12} md={3}>
                         <TermSearch data= {options} getSearchResults={getSearchResults} location="header"></TermSearch>
                     </Grid>
                    
                    <Grid container wrap="nowrap" item xs={12} md={3} justify="flex-end" className="primary-menu-icons" style={{textAlign: 'center'}}>
                            <Grid item xs={3} className={classes.menuIcon}>
                                <FontAwesomeIcon icon="home" onClick={() => goHere("/")}></FontAwesomeIcon>
                            </Grid >
                            <Grid item xs={3} className={classes.menuIcon}>
                                <FontAwesomeIcon icon="plus-square" onClick={ () => openGlobalForm()}></FontAwesomeIcon>
                            </Grid>
                            <Grid item  xs={3} className={classes.menuIcon}>
                                <FontAwesomeIcon icon="question-circle" onClick={() => goToSite()}></FontAwesomeIcon>
                            </Grid>
                            <Grid item xs={3} className={classes.menuIcon}>
                                <Avatar onClick={ () => profileClick()} alt={profile.name} src={profile.photo}></Avatar>
                            </Grid>
                        
                    {/** end icons */}    
                    </Grid> 
             {/** end header grid */}   
            </Grid>
        )
    }
    
    
    
}
