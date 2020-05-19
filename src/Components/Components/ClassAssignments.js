import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Context } from '../../Context/Context.js'
import { List, ListItem, ListItemText, ListItemSecondaryAction, ListItemAvatar, Avatar} from '@material-ui/core';
import MyCheckBox from '../Components/MyCheckBox.js'


export default function ClassAssignments( { section, link } ) {
    const [ lessons, setLessonPlans ] = useState([]);
    const [state] = useContext(Context);
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const userID = profile.wpUserObj.wp_user.ID

    
    /* Make API Call */
    useEffect(() => {
        let ignore = false;
        async function fetchData() {
            let url = 'http://localhost:8888/parentchecklist/wp-json/parent-checklist/v2/lesson-plans';
            let body = {
                show_assignments: true,
                teachers: section.teachers,
                grades: section.grades,
                subjects: section.subjects
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
            <List>{
                    
                    posts.map( (post, index) => {
                    return (
                        <React.Fragment key={"fragment"+post.ID}>
                        <ListItem key={post.ID} button >
                           
                            <ListItemAvatar>
                                <Avatar alt="Posted By" src={post.author_avatar}></Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                <h6>{moment(post.post_date).format('MM-DD')}</h6>
                                <p style={{textTransform: 'capitalize'}}>{post.post_title}</p>
                            </ListItemText>
                           
                            <ListItemSecondaryAction>
                                {(state.initialChecked !== 'undefined' && userID !== 'undefined')
                                    ? <MyCheckBox
                                        postID = {post.ID}
                                        userID={userID}
                                        initialChecked = {post.complete}
                                        ></MyCheckBox>
                                    : null
                                }
                            </ListItemSecondaryAction>
                        </ListItem>
                        </React.Fragment>
                    )
                 })
                }
            </List>
        )
    }
}
