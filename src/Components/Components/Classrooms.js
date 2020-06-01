import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../Context/Context.js';
import ContentCard from './ContentCard.js';
import { Grid, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ClassAssignments from './ClassAssignments.js';
import NewAssignments from './NewAssignments.js';
import AddLesson from '../Forms/AddLesson.js';
import { emptyArray } from '../../Context/functions.js';

const initialShowForm = {
    teachers: '',
    grades: '',
    schools: '',
    subjects: ''
} 

const useStyles = makeStyles(() => ({
    root: {
        width: '100%'
    }
  }));

export default function Classrooms({ sections, newSection, showNewSection, onClickAssignment, showNewPost, newPost, openGlobalForm,  onCloseGlobalForm }) {
    const classes = useStyles();
    const [state, setState] = useContext(Context);
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const [showForm, setShowForm] = useState(initialShowForm);

    const onClickAdd = (section) => {
        setShowForm(section);
    }

    const onClickHideForm = () => {
        setShowForm(initialShowForm);
    }

    let theLink = ( theSection ) => {
        let link = encodeURI(theSection.schools+'-'+theSection.teachers+'-'+theSection.subjects+'-'+theSection.grades)
        return link;
    }

    let clearNewSection = () =>{
        showNewSection("undefined");
    }

    const objsEqual = (a, b) => {
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
        if (aProps.length != bProps.length) {
            return false;
        }
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
    }

    
    
/**
 *  the rendering of the components
 * */    
    if(sections === 'undefined'){
        return null;
    } else { 
        const styles={}
        if(sections.length == 0){
            styles.padding = '12px'
        } else {
           styles.padding = '30px'
        }
        return (
                
                <Grid
                    container
                    wrap="wrap"
                    className={classes.root}
                    spacing={3}
                    justify="flex-start"
                    alignItems="flex-start"
                    alignContent="flex-start"
                    style={styles}
                >
                {(newSection !== 'undefined')

                    ? <React.Fragment>
                        <Grid container justify="space-between" style={{padding: '0 30px', background: '#eeeeee'}} >
                    <Grid item xs={10} >
                        <Typography variant="h5" >New Classroom Created</Typography>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'right'}}>
                        <Button onClick={() => clearNewSection()}><FontAwesomeIcon icon="window-close"></FontAwesomeIcon></Button>
                    </Grid>
                    </Grid>
                        <Grid key={"grid-item-newSection"} item xs={12} sm={6} md={4}>
                            <ContentCard
                            key={"content-card-newSection"}
                            mainTitle={newSection.schools+" "+ newSection.teachers}
                            subTitle={newSection.grades+" "+ newSection.subjects}
                            icon="door-open"
                            iconTo={"/classrooms/:"+theLink(newSection)}
                            onClickAdd={onClickAdd}
                            section={newSection}
                            > 
                                <NewAssignments post={newPost} onClickAssignment={onClickAssignment} profile={profile} section={newSection}></NewAssignments>    
                                {(showForm !== 'undefined' && objsEqual(showForm, newSection))
                                    ? <AddLesson 
                                        section={newSection} 
                                        grades={newSection.grades} 
                                        teachers={newSection.teachers}
                                        subjects={newSection.subjects}
                                        schools={newSection.schools}
                                        showNewPost={showNewPost}
                                        showNewSection={false}
                                        onClickHideForm={onClickHideForm}
                                    ></AddLesson>
                                    : null
                                }
                                {(newSection != 'undefined')
                                    ? <ClassAssignments 
                                        section={newSection} 
                                        link={newSection} 
                                        onClickAdd={onClickAdd} 
                                        onClickHideForm={onClickHideForm}
                                        />
                                    : null
                                }
                                
                        </ContentCard>
                        </Grid>
                        </React.Fragment>
                    : null
                
                } 
        
            { sections.map( (section, index) => {
                    return (
                        <Grid key={"grid-item-"+index} item xs={12} sm={6} md={4}>
                            <ContentCard
                            key={"content-card-"+index}
                            mainTitle={section.schools+" "+ section.teachers}
                            subTitle={section.grades+" "+ section.subjects}
                            icon="door-open"
                            iconTo={"/classrooms/:"+theLink(section)}
                            onClickAdd={onClickAdd}
                            section={section}
                            > 
                                <NewAssignments post={newPost} onClickAssignment={onClickAssignment} profile={profile} section={section}></NewAssignments>    
                                {(showForm !== 'undefined' && objsEqual(showForm, section))
                                    ? <AddLesson 
                                        section={section} 
                                        grades={section.grades} 
                                        teachers={section.teachers}
                                        subjects={section.subjects}
                                        schools={section.schools}
                                        showNewPost={showNewPost}
                                        showNewSection={false}
                                        onClickHideForm={onClickHideForm}
                                    ></AddLesson>
                                    : null
                                }
                                <ClassAssignments 
                                    section={section} link={theLink(section)} onClickAdd={onClickAdd} onClickHideForm={onClickHideForm}
                                />
                        </ContentCard>
                        </Grid>
                        
                    )
                })
            }
        
        </Grid>
    )
 }//if sections are defined

      
} //ends the rfc