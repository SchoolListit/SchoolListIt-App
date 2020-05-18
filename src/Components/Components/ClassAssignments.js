import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Context } from '../../Context/Context.js'
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, ListItemAvatar, Avatar} from '@material-ui/core';
import MyCheckBox from '../Components/MyCheckBox.js'


export default function ClassAssignments( { section, link } ) {
    const [ lessons, setLessonPlans ] = useState([]);
    const [checked, setChecked] = useState([1]);
    const [state, setState] = useContext(Context);
    const { currentAssignment } = state; 
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const userID = profile.wpUserObj.wp_user.ID

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        let body = {
            post_id: value,
            user_id: profile.wpUserObj.user.ID,
            action: 'insert' 
         }
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
            body.action = 'delete'
        }
        setChecked(newChecked);
        //handle db insert
        let url = "http://localhost:8888/parentchecklist/wp-json/parent-checklist-rest/v2/mark_complete";
        
        
        axios.get(url, body)
            .then( (res) => {
                const salt = res.data['salt'];
                const key = 'aVdG#D.KRFXw)dr!37}BrpkxdQM8N4';
                const authHeader = salt+"_"+key;
                let formdata = new FormData();
                const headers = {
                "X-Scholistit-Auth": authHeader,
                "Content-Type": "multipart/form-data"
                }
                for (const property in body) {
                    formdata.append(property, body[property]);
                }
                
                //make 2nd call
                axios.post(url, formdata, {headers: headers})
                .then( (res) => {
                    //DOIT: now here we need to handle errors
                });
                
            });
            
        
        
    };

    


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
    }, []);
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
