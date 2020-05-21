import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Context } from '../../Context/Context.js';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, ListItem, Dialog, ListItemSecondaryAction, Slide, Avatar, Typography, ListItemText} from '@material-ui/core';
import MyCheckbox from './MyCheckBox.js';
import SingleAssignment from './SingleAssignment.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
export default function TheAssignment( {post, userID }) {
    const classes = useStyles();
    const assignmentRequired = (post.mandatory === true) ? "requiredAssignment" : "optionalAssignment" ;
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const [isOpen, setIsOpen] = useState(false);
    const [singlePostID, setSinglePostID] = useState('');


    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
        if(isOpen === false) {
            setSinglePostID('');
        }
    }

    const onDialogClose = (e, PostID) => {
        console.log(PostID)
    }

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });
    
    if(post === 'undefined'){
        return null
    } else {
        return (
            <React.Fragment key={"post_"+post.ID}>
            <ListItem key={"post-"+post.ID} className={classes.listItemRoot} button >
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
                <Typography variant="body1" style={{textTransform: 'capitalize'}} >
                    {post.post_title}
                </Typography>

                
                <Grid container justify="space-between" flexwrap="nowrap" alignItems="flex-start" spacing={2}>
                   
                    {/* AVATAR AND EXCERPT */}
                    <Grid item xs={2} >
                         <Avatar alt="Posted By" src={post.author_avatar} onClick={() => toggleIsOpen()}></Avatar>
                    </Grid>
                    <Grid item xs={8}>
                        <ListItemText onClick={() => toggleIsOpen()}>
                            <Typography variant="body2"  >{post.post_excerpt}</Typography>
                        </ListItemText>
                    </Grid>
                    

                    {/* HERE IS THE CHECKMARK */}
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
                {/* CLOSE GRID*/}

            </ListItem>
            {/* CLOSE LIST ITEM */}



            <Dialog key={"dialog-"+post.ID} fullScreen open={isOpen} onClose={e => onDialogClose(e, post.ID)} disablePortal={true}>
                <SingleAssignment postID={post.ID} toggleIsOpen={toggleIsOpen}></SingleAssignment>
            </Dialog>
            </React.Fragment>
        )
    }
    
}
