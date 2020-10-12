import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import { Typography, Grid, Container, Card, Button, Paper } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Context } from '../../Context/Context.js';
import SearchBar from './SearchBar.js';
import TermSearch from './TermSearch.js';
import SchoolClasses from './SchoolClasses.js';
import OverdueCard from './homepage-cards/OverdueCard.js'
import { Redirect, useHistory } from 'react-router-dom';





export default function FollowSomething( {clearSetUp, setShowFollow, context, changeContext, searchResults, getSearchResults, openGlobalForm, onCloseGlobalForm, theLink, onClickAdd, onClickHideForm} ) {
    const [state, setState] = useContext(Context);
    const [terms, setTerms] = useState();
    const { schools, teachers, subjects } = state;
    const [schoolSections, setSchoolSections] = useState([]);
    const [gMapValue, setGMapValue] = useState(null);
    let history = useHistory();

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

    


    const goHere = (location) => {
        history.push(location);
    }
    

    const chooseSchool = (value) => {
        setGMapValue(value);
    }
/*
    useEffect( () => {
        let url = "https://schoolistit.com/wp-json/wp/v2/schools";
        axios.get(url).then( (res) => {
            let terms = res.data;
            setTerms(terms);
        })  
    }, [])
    */
/*
    const onClickFindSchool = () => {
        let schoolDescription = gMapValue;
        let  theSchool = terms.filter( term => schoolDescription === term.description);
        theSchool = theSchool[0].name;
        let reducedSections = sections.filter( section => theSchool === section.schools);
        setSearchResults(reducedSections);
    }
*/
    let showMeEverything = () => {
        //console.log(theState.sections);
       getSearchResults('all');
    }

    const doneWithSetUp = () => {
        if(context.profile !== 'undefined' && context.profile.first_time == 'true'){
            context.profile.first_time = false;
            changeContext(context);
        }
        setShowFollow(false);
    }
    
    return (
        <Container style={{paddingBottom: '40px'}}>
            <Grid container justify="center" alignItems="center" alignContent="center" spacing={5}>
                <Grid item xs={12} style={{textAlign: 'center', maxWidth: '500px', padding: '50px'}}>
                    <Typography variant="h2" style={{fontWeight: '700'}}>Schoo <span class="the-brand-blue">List</span> It</Typography>
                    <Typography variant="h5">What's due and when</Typography>
                    <Typography variant="h5"> for any school, anywhere</Typography>
                </Grid>
                
                <Grid spacing={5} container justify="center" alignItems="center" alignContent="center" item xs={12}>
                    <Grid item xs={12} md={4} >
                    <Card style={{textAlign: 'center', padding: '30px', minHeight: '350px'}}>
                        <Typography variant="h2" style={{color: '#9e9e9e'}}><FontAwesomeIcon icon="bell"></FontAwesomeIcon></Typography>
                            <Typography variant="h6">Find your school</Typography>
                            <Typography paragraph variant="h6">follow classes</Typography>
                            <Grid container justify="center" alignItems="center" alignContent="center" >
                            <Grid item xs={12} style={{height: '100px'}}>
                            <TermSearch data= {options} getSearchResults={getSearchResults} location="follow-something"></TermSearch>
                            </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card style={{textAlign: 'center', padding: '30px', minHeight: '350px'}}>
                        <Typography variant="h2" style={{color: '#9e9e9e'}}><FontAwesomeIcon icon="heart"></FontAwesomeIcon></Typography>
                            <Typography variant="h6">Give a teacher</Typography>
                            <Typography paragraph variant="h6">some love</Typography>
                            <Grid container justify="center" alignItems="center" alignContent="center" >
                            <Grid item xs={12} style={{height: '100px'}}>
                                <Typography >Can't find your classroom?</Typography>
                                <Typography paragraph> Help out by adding lessons.</Typography>
                            </Grid>
                            </Grid>
                            <Button variant="contained" color="primary" style={{minWidth: '90%'}} onClick={ () => openGlobalForm()}>Add A Lesson</Button>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4} style={{textAlign: 'center'}}>
                    <Card style={{textAlign: 'center', padding: '30px', minHeight: '350px'}}>
                        <Typography variant="h2" style={{color: '#9e9e9e'}}><FontAwesomeIcon icon="globe-americas"></FontAwesomeIcon></Typography>
                            <Typography variant="h6">I'm in a browsey</Typography>
                            <Typography paragraph variant="h6"> sorta mood</Typography>
                            <Grid container justify="center" alignItems="center" alignContent="center" >
                            <Grid item xs={12} style={{height: '100px'}}>
                                <Typography >I can't find my school</Typography>
                                <Typography paragraph> so just show me everything.</Typography>
                            </Grid>
                            </Grid>
                            <Button variant="contained" color="primary" style={{minWidth: '90%'}} onClick={ () => showMeEverything(state, getSearchResults)}>follow classes</Button>
                        </Card>
                    </Grid>
                </Grid>
                </Grid>
                
                
        </Container>
    )
}

//<SearchBar helperText="search Google Maps for your school" chooseSchool={chooseSchool}></SearchBar>


