import React from 'react';
import moment from 'moment';
import { Typography, ListItemAvatar, ListItem, ListItemText, Avatar } from '@material-ui/core';


const commentDate = (theDate) => {
    let prettyDate = moment(theDate).format("dddd, MM-DD-YY");
    return prettyDate
}

const commentorName = (username) => {
    let name = username.replace('.', ' ');
    return name;
}

let commentContent = (comment) => {
    return (<div dangerouslySetInnerHTML={{__html: comment}}></div>)
    }



export default function TheComment( {comment, isNew, profile}) {
    if(isNew === true){
        comment.author_name = profile.name;
        comment.content = {
            rendered: comment.comment_content}
        comment.author_avatar = profile.photo;
    }
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar alt={commentorName(comment.author_name)} src={comment.author_avatar.photoUrl} />
</ListItemAvatar>
            <ListItemText>
            <Typography variant="subtitle2" style={{textTransform: 'capitalize'}}>
                {commentorName(comment.author_name)+" on "+commentDate(comment.date)}
            </Typography>
                {commentContent(comment.content.rendered)}
            </ListItemText>
        </ListItem>
    )
}
