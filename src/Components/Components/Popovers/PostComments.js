import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Typography, Popover, Container, TextField, Button, FormControl, List, ListItem, Checkbox, ListItemText } from '@material-ui/core';
import MyDialogTitle from '../MyDialogTitle';
import TheComment from '../TheComment.js'


export default function PostComments( {post, section} ) {
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState("");
    const profile = JSON.parse(localStorage.getItem("scholistit_profile"));
    const userID = profile.wpUserObj.user.data.ID;

    /* Make API Call */
    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            let url = 'http://localhost:8888/parentchecklist/wp-json/wp/v2/comments?post='+post.ID;
            const result = await axios.get(url )
            if (!ignore) setComments(result.data);
        }

        fetchData();
        return () => { ignore = true; }
    }, []);

    /**
     * 
     * submit the new comment to WP
     */
    const onSubmit = (e) => {
        let body = {
            comment: document.getElementById("comment-"+post.ID).value,
            author: userID,
            post: post.ID,
            section: section
        }
        document.getElementById("addComment-"+post.ID).reset();
        const url = 'http://localhost:8888/parentchecklist/wp-json/parent-checklist-rest/v2/comments/post';
        axios.get(url, body)
         .then( (res) => {
             const salt = res.data['salt'];
             const key = 'aVdG#D.KRFXw)dr!37}BrpkxdQM8N4';
             //const authHeader = btoa(salt+"_"+key);
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
                let newComment = res.data.comment;
                console.log(newComment);
                setNewComment(newComment);
             })
         });
         
    }

    const commentsList = (comments) => {
        if(comments.length > 0){
            return (
                comments.map( (comment, index) => {
                    return (
                        <TheComment key={"comment-"+index} comment={comment} isTrue={false} profile={profile}></TheComment>
                    )
                })
            ) 
        } else {
            return null
        }
    }

    if(comments !== null){
        return (
            <React.Fragment>
                <List>
                    {/** in here we will map through existing comments and also show the new comment once entered */}
                    {commentsList(comments)}
                    {(newComment !== '')
                        ?   <TheComment key="comment-new" comment={newComment} isNew={true} profile={profile}></TheComment>
                        : null
                    }
                </List>
                <form id={"addComment-"+post.ID}>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            id={"comment-"+post.ID}
                            label="Comment"
                            helperText={"comment on "+post.post_title}
                            multiline
                            rows={5}
                            variant="outlined"
                        ></TextField>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <Button onClick={(e) => onSubmit(e)} variant="outlined" color="primary">Comment</Button>    
                    </FormControl>
                </form>
        </React.Fragment>
        )
        

    } else {
        return null
    }
    
}
