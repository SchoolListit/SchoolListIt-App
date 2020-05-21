import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Button, Typography} from '@material-ui/core';
import TheAssignment from '../Components/TheAssignment.js';


export default function ClassAssignments( { section, link, newPost, showNewPost, newSection, ShowNewSection } ) {
    const [ lessons, setLessonPlans ] = useState([]);
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const userID = profile.wpUserObj.wp_user.ID

    const onClickAssignment = () => {
        
    }

    const morePosts = () => {
        let query = lessons.assignments;
        //console.log(query);
        let diff = parseInt(query.total_posts) - parseInt(query.returned_posts);
        return (diff > 0)
            ? diff
            : false
    }
    
    /* Make API Call */
    useEffect(() => {
        let ignore = false;
        async function fetchData() {
            let url = 'http://localhost:8888/parentchecklist/wp-json/parent-checklist/v2/lesson-plans';
            let body = {
                show_assignments: true,
                teachers: section.teachers,
                grades: section.grades,
                subjects: section.subjects,
                number: "5"
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
    }, [section.teachers, section.grades, section.subjects]);
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
            <React.Fragment>
                <List style={{paddingTop: '0px'}}>
                    {posts.map( (post, index) => {
                        return (
                            <TheAssignment key={post.ID} post={post} userID={userID} onClickAssignment={onClickAssignment}></TheAssignment>
                            )
                        })
                    }
                </List>
                {(morePosts() !== false)
                    ? <div style={{textAlign: "right", padding: '10px'}}>
                            <Button href={"/classrooms/:"+link} variant="outlined" size="small" color="primary">
                                <Typography >
                                    {morePosts()+" more"}
                                </Typography>
                            </Button>
                      </div>
                    : null
                }
                
            </React.Fragment>
            
        )
    }
}
