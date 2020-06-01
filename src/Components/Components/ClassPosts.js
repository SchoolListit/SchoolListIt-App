import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Button, Typography, Grid, } from '@material-ui/core';
import TheAssignment from '../Components/TheAssignment.js';
import AddLesson from '../Forms/AddLesson.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';





export default function ClassPosts( { section, onClickAssignment, showForm, showNewPost, onClickAdd} ) {
    const [ lessons, setLessonPlans ] = useState([]);
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const { userID } = profile;

    const showMore = () => {
        console.log('sow more')
    }

    const link = {

    }

    const morePosts = () => {
        let query = lessons.assignments;
        //console.log(query);
        let diff = parseInt(query.total_posts) - parseInt(query.returned_posts);
        return (diff > 0)
            ? diff
            : false
        
    }

    const objsEqual = (a, b) => {
        delete a.key;
        delete b.key;
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

    /* Make API Call */
    useEffect(() => {
        let ignore = false;
        
        //console.log(body);

        async function fetchData() {
            let url = 'http://schoolistit.com/wp-json/schoolistit/v2/lesson-plans';
            let body = {
                show_assignments: true,
                teachers: section.teachers,
                grades: section.grades,
                subjects: section.subjects,
                number: "-1"
            }
            let formdata = new FormData();
            for (const property in body) {
                formdata.append(property, body[property]);
            }
            const result = await axios.post(url, formdata, )
            
            if (!ignore) setLessonPlans(result.data.assignments);
        }
        
        fetchData();
        return () => { ignore = true; }
    }, [section.grades, section.subjects, section.teachers]);
/**
 * Under here is the render.
 */
    if(lessons === 'undefined' || lessons.length === 0 ){
        return (
        <React.Fragment>
            <List >
            </List>
        </React.Fragment>
        )
    } else {
        const { posts } = lessons.assignments;
                
        return (
            <List>
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
                { 
                    posts.map( (post, index) => {
                    return (
                        <TheAssignment key={post.ID} section={section} post={post} userID={userID} onClickAssignment={onClickAssignment}></TheAssignment>
                    )
                 })
                }
                <Grid container justify="space-between" style={{padding: '10px'}}>
                    <Grid item>
                        <Button onClick={() => onClickAdd(section)} variant="outlined" size="small" color="primary">
                            <Typography>
                                <FontAwesomeIcon icon="plus-square"></FontAwesomeIcon>
                                {" Add"}
                            </Typography>
                        </Button>
                    </Grid>
                {(morePosts() !== false)
                    ? <Grid item>
                        <Button href={"/classrooms/:"+link} variant="outlined" size="small" color="primary">
                            <Typography >
                                {morePosts()+" more"}
                            </Typography>
                        </Button>
                      </Grid>
                    : null
                }
                </Grid>
            </List>
        )
    }
}
