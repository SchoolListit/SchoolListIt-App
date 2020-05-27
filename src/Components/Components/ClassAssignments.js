import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Button, Typography, Grid} from '@material-ui/core';
import TheAssignment from '../Components/TheAssignment.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export default function ClassAssignments( { section, link, onClickAdd, onCLickHideForm } ) {
    const [ lessons, setLessonPlans ] = useState([]);
    const [ changed, setChanged ] = useState([]);
    const [count, setCount] = useState(3);
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const {userID} = profile;
    
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
                number: count
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
    }, [section.teachers, section.grades, section.subjects, count, setCount]);


    const showMore = () => {
        setCount(count + 3);
    }



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
                            <TheAssignment key={post.ID} post={post} userID={userID} section={section}></TheAssignment>
                            )
                        })
                    }
                </List>
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
                        <Button onClick={() => showMore()} variant="outlined" size="small" color="primary">
                            <Typography >
                                {morePosts()+" more"}
                            </Typography>
                        </Button>
                      </Grid>
                    : null
                }
                </Grid>
            </React.Fragment>
            
        )
    }
}
