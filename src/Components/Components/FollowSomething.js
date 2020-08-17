import React, {useState, useContext} from 'react';
import { Typography, Grid, Container, Card, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Context } from '../../Context/Context.js';
import { searchSections } from '../../Context/functions.js';
import SearchBar from './SearchBar.js';
import OverdueCard from './homepage-cards/OverdueCard.js';
import AllClassesCard from './homepage-cards/AllClassesCard.js'
import { useHistory } from 'react-router-dom';





export default function FollowSomething( {clearSetUp, setShowFollow, changeContext, searchResults, setSearchResults, openGlobalForm, onCloseGlobalForm, theLink, onClickAdd, onClickHideForm} ) {
    const [state] = useContext(Context);
    //const { profile } = state;
    const [terms] = useState();
    const {sections} = state;
    const [gMapValue, setGMapValue] = useState(null);
    let history = useHistory();

/*
    const goHere = (location) => {
        history.push(location);
    }
    */
    

    const chooseSchool = (value) => {
        setGMapValue(value);
    }

    const onClickFindSchool = () => {
        let schoolDescription = gMapValue;
        let  theSchool = terms.filter( term => schoolDescription === term.description);
        theSchool = theSchool[0].name;
        let reducedSections = sections.filter( section => theSchool === section.schools);
        setSearchResults(reducedSections);
    }

    return (
        <Container>
            <Grid container justify="center" alignItems="center" alignContent="center" spacing={5}>
                <Grid item xs={12} style={{textAlign: 'center', maxWidth: '500px', padding: '50px'}}>
                    <Typography variant="h2" style={{fontWeight: '700'}}>SchooListIt</Typography>
                    <Typography variant="h5">What's due and when</Typography>
                    <Typography variant="h5"> for any school, anywhere</Typography>
                </Grid>
                
                <Grid spacing={5} container justify="center" alignItems="center" alignContent="center" item xs={12}>
                    <OverdueCard></OverdueCard>
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
                    <AllClassesCard sections={sections} searchSections={searchSections}></AllClassesCard>
                </Grid>
                </Grid>
        </Container>
    )
}

