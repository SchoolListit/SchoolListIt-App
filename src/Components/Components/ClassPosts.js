import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Button, Typography} from '@material-ui/core';
import TheAssignment from '../Components/TheAssignment.js';
import AddLesson from '../Forms/AddLesson.js';




export default function ClassPosts( { section, onClickAssignment, showForm, showNewPost} ) {
    const [ lessons, setLessonPlans ] = useState([]);
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const userID = profile.wpUserObj.wp_user.ID

    const showMore = () => {
        console.log('sow more')
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
            let url = 'http://localhost:8888/parentchecklist/wp-json/parent-checklist/v2/lesson-plans';
            let body = {
                show_assignments: true,
                teachers: section.teachers,
                grades: section.grades,
                subjects: section.subjects,
                number: '10'
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
                {console.log(objsEqual(showForm, section))}
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
                        <TheAssignment key={post.ID} post={post} userID={userID} onClickAssignment={onClickAssignment}></TheAssignment>
                    )
                 })
                }
                {(morePosts() !== false)
                    ? <div style={{textAlign: "right", padding: '10px'}}>
                            <Button onClick={() => showMore()} variant="outlined" size="small" color="primary">
                                <Typography >
                                    {morePosts()+" more"}
                                </Typography>
                            </Button>
                      </div>
                    : null
                }
            </List>
        )
    }
}
