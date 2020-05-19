import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Context } from '../../Context/Context.js'
import { List, ListItem, ListItemText, ListItemSecondaryAction, ListItemAvatar, Avatar} from '@material-ui/core';
import MyCheckbox from './MyCheckBox.js';

export default function ClassPosts( { section, onClickAssignment} ) {
    const [ lessons, setLessonPlans ] = useState([]);
    const [state, setState] = useContext(Context);
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const userID = profile.wpUserObj.wp_user.ID
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
            <List>{
                    posts.map( (post, index) => {
                    return (
                        <React.Fragment key={"fragment"+post.ID}>
                        <ListItem key={post.ID} button onClick={ () => onClickAssignment(post.ID)}>
                            <ListItemAvatar>
                                <Avatar alt="Posted By" src={post.author_avatar}></Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                <h6>{moment(post.post_date).format('MM-DD')}</h6>
                                <p style={{textTransform: 'capitalize'}}>{post.ID+' '+post.post_title}</p>
                            </ListItemText>
                            <ListItemSecondaryAction>
                            {console.log(userID)}
                                {(userID !== 'undefined' )
                                ? <MyCheckbox
                                postID = {post.ID}
                                userID={userID}
                                initialChecked = {post.complete}
                            ></MyCheckbox>
                                    
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
