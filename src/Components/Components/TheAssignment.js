import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Context } from '../../Context/Context.js';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, ListItem, ListItemText, ListItemSecondaryAction, ListItemAvatar, Avatar, Typography} from '@material-ui/core';
import MyCheckbox from './MyCheckBox.js';



const useStyles = makeStyles(() => ({
    listItemRoot: {
        display: 'block !important',
        //borderBottom: '1px solid #eeeeee',
        margin: '0',
        padding: '5px 10px 10px 10px'
    }
  }));



export default function TheAssignment( {post, onClickAssignment, userID }) {
    const classes = useStyles();
    const assignmentRequired = (post.mandatory === true) ? "requiredAssignment" : "optionalAssignment" ;
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));

    
    if(post === 'undefined'){
        return null
    } else {
        return (
            <React.Fragment key={"post_"+post.ID}>
            <ListItem key={"post-"+post.ID} button onClick={ () => onClickAssignment(post.ID)} className={classes.listItemRoot}>
                
                <Typography variant="subtitle2" style={{fontWeight: '700'}}>
                    
                    {moment(post.assigned_date).format('MM-DD dddd ')+" "} 
                    {(post.mandatory === 'false')
                        ? "Optional"
                        : null}
                    {(post.mandatory === 'true')
                        ? <React.Fragment>
                            due on {moment(post.due_date).format('MM-DD')}
                        </React.Fragment> 
                        : null
                    }   
                </Typography> 
                <Typography variant="body1" style={{textTransform: 'capitalize'}} >{post.post_title}</Typography>
                <Grid container justify="space-between" flexwrap="nowrap" alignItems="flex-start" spacing={2}>
                    <Grid item xs={2} >
                         <Avatar alt="Posted By" src={post.author_avatar}></Avatar>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="body2"  >{post.post_excerpt}</Typography>
                    </Grid>
                    <Grid item xs={2} zeroMinWidth style={{paddingLeft: '5px'}}>
                        <ListItemSecondaryAction >
                        {(userID !== 'undefined' )
                        ? <MyCheckbox
                            postID = {post.ID}
                            userID={userID}
                            initialChecked = {post.complete}
                            ></MyCheckbox>
                        : null
                        }
                        </ListItemSecondaryAction> 
                    </Grid>
                </Grid>
            </ListItem>
            
            </React.Fragment>
        )
    }
    
}
