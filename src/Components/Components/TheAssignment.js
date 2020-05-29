import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Context } from '../../Context/Context.js';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, ListItem, Dialog, ListItemSecondaryAction, Slide, Avatar, Typography, ListItemText} from '@material-ui/core';
import MyCheckbox from './MyCheckBox.js';
import SingleAssignment from './SingleAssignment.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddLesson from '../Forms/AddLesson.js';
import EditListItem from '../Forms/EditListItem.js';
import MyDialogTitle from './MyDialogTitle.js';

const useStyles = makeStyles(() => ({
    listItemRoot: {
        display: 'block !important',
        //borderBottom: '1px solid #eeeeee',
        margin: '0',
        padding: '5px 10px 10px 10px'
    }
  }));




/**
 * Render starts here
 * 
 */
export default function TheAssignment( {post, userID, section, classView }) {
    const classes = useStyles();
    const assignmentRequired = (post.mandatory === true) ? "requiredAssignment" : "optionalAssignment" ;
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const [isOpen, setIsOpen] = useState(false);
    const [singlePostID, setSinglePostID] = useState('');
    const [editItem, setEditItem] = useState(false);
    const [thePost, setThePost] = useState(post);


    const openEditItem = (postID, section) => {
        setEditItem(!editItem);
    }  
    
    const closeEditItem = () => {
        setEditItem(!editItem);
    }

    const onChanged = (result) => {
        console.log(result);
        if (result.deleted == 'true'){
            let post = 'undefined';
            setThePost(post);
        } else {
            let changedPost = result.post;
            setThePost(changedPost);
        }
        
    }

    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
        if(isOpen === false) {
            setSinglePostID('');
        }
    }

    const onDialogClose = (e, PostID) => {
       //console.log(PostID)
    }

    const itemPadding = (classView === true) ? "0": "5px 10px 10px 10px";

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });
    
    if(thePost === 'undefined'){
        return null
    } else {
        return (
            <React.Fragment key={"post_"+thePost.ID}>
            <ListItem key={"post-"+thePost.ID} className={classes.listItemRoot} style={{padding: itemPadding}} button >
                {/** due date, edit and title */}
                <Grid container alignItems="flex-start" justify="space-between">
                    <Grid item xs={10}>
                        <Typography variant="subtitle2" style={{fontWeight: '700'}}>
                        
                        {(classView === true)
                            ? null
                            : moment(thePost.assigned_date).format('MM-DD ddd ')+" "
                        } 
                        {(thePost.mandatory === 'true')
                            ? <React.Fragment>
                                Due on {moment(thePost.due_date).format('MM-DD')}
                            </React.Fragment> 
                            : <span style={{color: '#00c853'}}>Optional</span>
                        }   
                        </Typography> 
                        <Typography variant="body1" style={{textTransform: 'capitalize'}} >
                            {thePost.post_title}
                        </Typography>
                    </Grid>
                    {(thePost.post_author == userID)
                        ? <Grid item xs={1} >
                                    <FontAwesomeIcon icon="ellipsis-h" onClick={() => openEditItem(thePost.ID, section)} style={{color: "#bdbdbd"}}></FontAwesomeIcon>
                                    <Dialog open={editItem} onClose={() => closeEditItem()}>
                                        <MyDialogTitle title="Edit This Assignment" onClose={closeEditItem} icon={false}></MyDialogTitle>
                                        <EditListItem post={thePost} userID={userID} section={section} onChanged={onChanged} closeEditItem={closeEditItem}></EditListItem>
                                    </Dialog>
                            </Grid>
                        : null
                    }
                    
                </Grid>
                
                <Grid container justify="space-between" flexwrap="nowrap" alignItems="flex-start" spacing={2}>
                   
                    {/* AVATAR AND EXCERPT */}
                    {(classView === true)
                        ? null
                        : <Grid item xs={2} >
                            <Avatar alt="Posted By" src={thePost.author_avatar} onClick={() => toggleIsOpen()}></Avatar>
                            </Grid>
                        
                    }
                    <Grid item xs={7}>
                        <ListItemText onClick={() => toggleIsOpen()}>
                            <Typography variant="body2"  >{post.post_excerpt}</Typography>
                            <Typography variant="overline">Posted By: {thePost.post_author}</Typography>
                        </ListItemText>
                    </Grid>
                    

                    {/* HERE IS THE CHECKMARK */}
                    <Grid item xs={2} zeroMinWidth style={{paddingLeft: '5px'}}>
                        <ListItemSecondaryAction >
                        {(userID !== 'undefined' )
                        ? <MyCheckbox
                            postID = {thePost.ID}
                            userID={userID}
                            initialChecked = {thePost.complete}
                            ></MyCheckbox>
                        : null
                        }
                        </ListItemSecondaryAction> 
                    </Grid>
                </Grid>
                {/* CLOSE GRID*/}

            </ListItem>
            {/* CLOSE LIST ITEM */}

            <Dialog key={"dialog-"+thePost.ID} fullScreen open={isOpen} onClose={e => onDialogClose(e, thePost.ID)} disablePortal={true}>
                <SingleAssignment postID={thePost.ID} toggleIsOpen={toggleIsOpen}></SingleAssignment>
            </Dialog>
            </React.Fragment>
        )
    }
    
}

