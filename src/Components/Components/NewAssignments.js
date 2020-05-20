import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Context } from '../../Context/Context.js'
import { List, ListItem, ListItemText, ListItemSecondaryAction, ListItemAvatar, Avatar} from '@material-ui/core';
import MyCheckbox from './MyCheckBox.js';

export default function NewAssignments( props ) {

    const { post, onClickAssignment } = props;
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const userID = profile.wpUserObj.wp_user.ID
    
    
    if(post === ""){
        return null
    } else {
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
                          
                                {(userID !== 'undefined' )
                                ? <MyCheckbox
                                postID = {post.ID}
                                userID={userID}
                                initialChecked = {[]}
                            ></MyCheckbox>
                                    
                                : null
                                }
                                </ListItemSecondaryAction>
                                
                            </ListItem>
                            </React.Fragment>
        )
    }
    
}
