import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import { Typography, Popover, Container, Dialog, List, ListItem, ListItemText } from '@material-ui/core';
import PostComments from './PostComments';
import MyDialogTitle from '../MyDialogTitle';



export default function CommentDialog( { open, posts_per_page, profile, section, onClose, dates, classView }) {
    const students = profile;
    const [newComment, setNewComment] = useState("");
    const [ lessons, setLessonPlans ] = useState([]);
    const [commentsOpen, toggleCommentsOpen] = useState(false);

    const number = (classView) => {
        if(classView === true){
            return "-1"
        } else {
            number = posts_per_page
        }
    }
    /**
     * Comments are within the scope of post. Every comment needs to be associated with an assignment or lesson - not with a classroom
     * as the Classroom appears to be but is not really a WP object. It is a unique array of custom taxonomy terms
     */
    /* Make API Call */
    useEffect(() => {
        
        let ignore = false;
        async function fetchData() {
            let url = 'https://schoolistit.com/wp-json/schoolistit/v2/lesson-plans';
            let body = {
                show_assignments: true,
                teachers: section.teachers,
                grades: section.grades,
                subjects: section.subjects,
                number: "-1"
            }
            if(classView === true){
                body.dates = dates;
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
    
    
    const openComments = () => {
        toggleCommentsOpen(true);
    }

    const closeComments = () => {
        toggleCommentsOpen(false);
    }
   


    /**
     * return popover content
     */

    if(lessons === 'undefined' || lessons.length === 0 ){
        return null
    } else {
        return (
            <React.Fragment>
                <MyDialogTitle title="Comments" icon={false} onClose={onClose}></MyDialogTitle>
                <Container>
                <List key="the list of assignments on which you could comment">    
                    {
                        lessons.assignments.posts.map( post => {
                            return (
                                
                                    <ListItem key={"comment-on-post-"+post.ID} button onClick={() => openComments()}>
                                        <ListItemText>
                                            <Typography variant="h6">{post.post_title+" "+post.assigned_date+" "}
                                                <Typography variant="overline">( {post.comment_count+" comments"})</Typography>
                                            </Typography>
                                            <PostComments post={post} profile={profile} section={section}></PostComments>
                                        </ListItemText>
                                    </ListItem>
                            )
                        }) //end posts map
                        
                    }
                </List>
            </Container>
            </React.Fragment>
            
        
        )
    }
    
}
