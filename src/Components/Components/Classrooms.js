import React, { useContext, useState } from 'react';
import { Context } from '../../Context/Context.js';
import ContentCard from './ContentCard.js';
import { Container, Grid, } from '@material-ui/core';
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

export default function Classrooms({ onClickAssignment }) {
    const [state, setState] = useContext(Context);
    const { sections } = state;
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const [showForm, setShowForm] = useState(initialShowForm);
    const [newPost, setNewPost] = useState('');


    const showNewPost = (newPost) => {
        setNewPost(newPost);
        setShowForm(initialShowForm);
    }

    const onClickAdd = (section) => {
        setShowForm(section);
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

    return (
            sections.map( (section, index) => {
                let link = encodeURI(section.schools+'-'+section.teachers+'-'+section.subjects+'-'+section.grades);
                return (
                    <Grid item xs={12} md={4}>
                        <ContentCard
                        key={index}
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
                                ></AddLesson>
                                : null
                            }
                            <ClassAssignments 
                                section={section} link={link} 
                            />
                    </ContentCard>
                    </Grid>
                    
                )
            })
        )
}