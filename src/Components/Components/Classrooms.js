import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../Context/Context.js';
import ContentCard from './ContentCard.js';
import { Container, Grid, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClassAssignments from './ClassAssignments.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewAssignments from './NewAssignments.js';
import AddLesson from '../Forms/AddLesson.js';

const initialShowForm = {
    teachers: '',
    grades: '',
    schools: '',
    subjects: ''
} 

const useStyles = makeStyles(() => ({
    root: {
        height: '200vh',
        maxHeight: '200vh',
        width: '100%',
        padding: '30px'
    }
  }));

export default function Classrooms({ newSection, onClickAssignment, showNewPost }) {
    const classes = useStyles();
    const [state, setState] = useContext(Context);
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const [showForm, setShowForm] = useState(initialShowForm);
    const [newPost, setNewPost] = useState('');
    const [localSections, setLocalSections] = useState([]);

    const onClickAdd = (section) => {
        setShowForm(section);
    }

    const onClickHideForm = () => {
        setShowForm(initialShowForm);
    }

    const link = (theSection) => {
        return encodeURI(theSection.schools+'-'+theSection.teachers+'-'+theSection.subjects+'-'+theSection.grades);
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
    if(state.sections.length < 1){

        return null;

    } else {
        
        return (
            
                <Grid
                    container
                    wrap="wrap"
                    className={classes.root}
                    spacing={3}
                    justify="flex-start"
                    alignItems="flex-start"
                    alignContent="flex-start"
                >
                {(newSection !== 'undefined')
                    ? <Grid key={"grid-item-newSection"} item xs={12} sm={6} md={4}>
                            <ContentCard
                            key={"content-card-newSection"}
                            mainTitle={newSection.schools+" "+ newSection.teachers}
                            subTitle={newSection.grades+" "+ newSection.subjects}
                            icon="door-open"
                            iconTo={"/classrooms/:"+link(newSection)}
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
                    : null
                
                }   
            { state.sections.map( (section, index) => {
                    return (
                        <Grid key={"grid-item-"+index} item xs={12} sm={6} md={4}>
                            <ContentCard
                            key={"content-card-"+index}
                            mainTitle={section.schools+" "+ section.teachers}
                            subTitle={section.grades+" "+ section.subjects}
                            icon="door-open"
                            iconTo={"/classrooms/:"+link}
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
                                    section={section} link={link(section)} onClickAdd={onClickAdd} onClickHideForm={onClickHideForm}
                                />
                        </ContentCard>
                        </Grid>
                        
                    )
                })
                }
                </Grid>
            )

    }  // ends the if else render null  
} //ends the rfc