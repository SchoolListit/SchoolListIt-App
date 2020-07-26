import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import { Typography, Grid, Container, Card, Button, Paper } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Context } from '../../Context/Context.js';
import SearchBar from './SearchBar.js';
import SchoolClasses from './SchoolClasses.js';
import { Redirect, useHistory } from 'react-router-dom';





export default function FollowSomething( {clearSetUp, setShowFollow, context, changeContext, searchResults, setSearchResults, openGlobalForm, onCloseGlobalForm, theLink, onClickAdd, onClickHideForm} ) {
    const [state, setState] = useContext(Context);
    //const { profile } = state;
    const [terms, setTerms] = useState();
    const {sections} = state;
    const [schoolSections, setSchoolSections] = useState([]);
    const [gMapValue, setGMapValue] = useState(null);
    let history = useHistory();


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

    const onClickFindSchool = () => {
        let schoolDescription = gMapValue;
        let  theSchool = terms.filter( term => schoolDescription === term.description);
        theSchool = theSchool[0].name;
        let reducedSections = sections.filter( section => theSchool === section.schools);
        setSearchResults(reducedSections);
    }

    let showMeEverything = () => {
        setSearchResults(sections);
    }

    const doneWithSetUp = () => {
        if(context.profile !== 'undefined' && context.profile.first_time == 'true'){
            context.profile.first_time = false;
            changeContext(context);
        }
        setShowFollow(false);
    }
    if(state.profile.first_time == "false"){
        return null;
    }
    return (
        <Container>
            <Grid container justify="center" alignItems="center" alignContent="center" spacing={5}>
                <Grid item xs={12} style={{textAlign: 'center', maxWidth: '500px', padding: '50px'}}>
                    <Typography variant="h2" style={{fontWeight: '700'}}>SchooListIt</Typography>
                    <Typography variant="overline">the easiest way to track schoolwork on the planet</Typography>
                    <Typography variant="h5">Public education should be public. Easy access to homework and schoolwork is just the beginning. </Typography>
                </Grid>
                
                <Grid spacing={5} container justify="center" alignItems="center" alignContent="center" item xs={12}>
                    <Grid item xs={12} md={4} >
                    <Card style={{textAlign: 'center', padding: '30px', minHeight: '350px'}}>
                        <Typography variant="h2" style={{color: '#9e9e9e'}}><FontAwesomeIcon icon="bell"></FontAwesomeIcon></Typography>
                            <Typography variant="h6">Find your school</Typography>
                            <Typography paragraph variant="h6">follow classes</Typography>
                            <Grid container justify="center" alignItems="center" alignContent="center" >
                            <Grid item xs={12} style={{height: '100px'}}>
                                <SearchBar helperText="search Google Maps for your school" chooseSchool={chooseSchool}></SearchBar>
                            </Grid>
                            </Grid>
                           <Button 
                            onClick={(e) => onClickFindSchool()} 
                            variant="contained" 
                            color="primary" 
                            style={{minWidth: '90%'}}>
                                Follow Classes</Button>
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
                        <Typography variant="h2" style={{color: '#9e9e9e'}}><FontAwesomeIcon icon="heart"></FontAwesomeIcon></Typography>
                            <Typography variant="h6">I'm in a browsey</Typography>
                            <Typography paragraph variant="h6"> sorta mood</Typography>
                            <Grid container justify="center" alignItems="center" alignContent="center" >
                            <Grid item xs={12} style={{height: '100px'}}>
                                <Typography >I can't find my school</Typography>
                                <Typography paragraph> so just show me everything.</Typography>
                            </Grid>
                            </Grid>
                            <Button variant="contained" color="primary" style={{minWidth: '90%'}} onClick={ () => showMeEverything()}>follow classes</Button>
                        </Card>
                    </Grid>
                </Grid>
                </Grid>
                <Container>
                        <Grid container justify="center" alignItems="center" alignContent="center" spacing={5}>
                            <Grid item xs={12} style={{textAlign: 'center', maxWidth: '500px', padding: '50px  0'}}>
                                    <Typography paragraph variant="h5" style={{textAlign: 'center'}}>Welcome To SchooListIt</Typography>
                                    <Typography paragraph >Use the tools above to find or create some classes. Your class feed shows you all the classes you follow.</Typography>
                                    <Button variant="outlined" color="primary" onClick={() => clearSetUp()}>Take Me Home</Button>
                            </Grid>
                        </Grid>
                    </Container>
                
        </Container>
    )
}

