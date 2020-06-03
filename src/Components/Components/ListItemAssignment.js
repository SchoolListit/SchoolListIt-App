import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Context } from '../../Context/Context.js';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, ListItem, ListItemText, ListItemSecondaryAction, ListItemAvatar, Avatar, Typography} from '@material-ui/core';
import MyCheckbox from './MyCheckBox.js';


const useStyles = makeStyles(() => ({
    optionalAssignment: {
        backgroundColor: '#bdbdbd'
    },
  }));


/**
 * 
 * this is Deprecated and not in circulation as far as I know.
 */
export default function ListItemAssignment( {post, onClickAssignment, userID }) {
    const classes = useStyles();
    const assignmentRequired = (post.mandatory === true) ? "requiredAssignment" : "optionalAssignment" ;

    if(post === 'undefined'){
        return null
    } else {
        return (
            <React.Fragment key={"post_"+post.ID}>
            <ListItem key={"post-"+post.ID} button onClick={ () => onClickAssignment(post.ID)} >
                <ListItemAvatar>
                    <Avatar alt="Posted By" src={post.author_avatar}></Avatar>
                </ListItemAvatar>
                <ListItemText>
                {(post.mandatory === 'false')
                    ? <Typography variant="caption" style={{fontWeight: '500'}}>OPTIONAL: </Typography>
                    : null}
                    <Typography variant="subtitle2" >{moment(post.assigned_date).format('dddd MM-DD')+" "} 
                    {(post.mandatory === 'true')
                        ? <React.Fragment>
                            Due On {moment(post.due_date).format('MM-DD')}
                        </React.Fragment> 
                        : null
                    }   
                    </Typography> 
                    <Typography variant="body1" style={{textTransform: 'capitalize'}} >{post.post_title}</Typography>
                    <Typography variant="body2" style={{textTransform: 'capitalize'}} >{post.post_excerpt}</Typography>

                </ListItemText>
                <ListItemSecondaryAction>
          
                    {(userID !== 'undefined' )
                    ? <MyCheckbox
                    postID = {post.ID}
                    userID={userID}
                    initialChecked = {post.completed}
                ></MyCheckbox>
                        
                    : null
                    }
                </ListItemSecondaryAction>
                
            </ListItem>
            
            </React.Fragment>
        )
    }
    
}
