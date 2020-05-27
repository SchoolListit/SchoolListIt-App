import React, {useState, useContext} from 'react';
import { isFollowed } from '../../Context/functions.js';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Dialog } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FollowPopover from './Popovers/FollowPopover';
import CommentPopover from './Popovers/CommentPopover';
import SharePopover from './Popovers/SharePopover';
import { Context } from '../../Context/Context';
import { emptyArray } from '../../Context/functions.js'





const useStyles = makeStyles(() => ({
    root: {
        background: '#e0e0e0',
        padding: '0',
        fontSize: '1.5em'
    },
  }));



export default function ListActions( { section, shareLink } ) {
    const classes = useStyles();
    const [state] = useContext(Context);
    const { following } = state;
    const [openFollow, setOpenFollow] = useState(false);
    const [openComment, setOpenComment] = useState(false);
    const [openShare, setOpenShare] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const profile = JSON.parse(localStorage.getItem("scholistit_profile"))    
    

    const clickFollow = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenFollow(!openFollow);
    };

    const clickComment = (event) => {
        setOpenComment(!openComment);
    };

    const toggleFollow = () => {
        setOpenFollow(!openFollow);
    }

    const toggleComment = () => {
        setOpenComment(!openComment);
    }

    const toggleShare = () => {
        setOpenShare(!openShare);
    }
    const shareText = (section) => {
        return (
            'Follow '+section.teachers+" "+section.grades+" grade "+section.subjects+' class on SchooListIt, the easiest way to track schoolwork on the planet!'
        )
    }

    const sectionID = (theSection) => {
        if(!emptyArray(theSection)){
            return (
                theSection.schools.replace(" ", "-")+"_"+theSection.teachers.replace(" ", "-")+"_"+theSection.grades.replace(" ", "-")+"_"+theSection.subjects.replace(" ", "-")
            )
        } else {
            return null
        } 
    }
    
    const clickShare = (event) => {
        //setAnchorEl(event.currentTarget);
        //setOpenShare(!openShare);
        if(navigator.share){
            navigator.share({
                title: 'SchooListIt Classroom',
                text: shareText,
                url: 'http://localhost:3000/'+shareLink
              }).then(() => {
                console.log('Thanks for sharing!');
              })
              .catch(err => {
                console.log(`Couldn't share because of`, err.message);
              });
        } else {
            setAnchorEl(event.currentTarget);
            setOpenShare(!openShare);
        }
    };
    

    if(section === 'undefined'){
        return null
    } else {
        return (
            <Grid className={classes.root} container justify="space-between" alignItems="flex-start">
                
                <Grid item xs={4}>
                    {(isFollowed(state.following, section))
                        ?<Button key={"follow-"+sectionID(section)} id={"followButton-"+sectionID(section)} >
                            <Typography><FontAwesomeIcon icon="check"></FontAwesomeIcon> following</Typography>
                        </Button>
                        : <Button key={"follow-"+sectionID(section)} id={"followButton-"+sectionID(section)} onClick={(e) => clickFollow(e)}>
                                <Typography><FontAwesomeIcon icon="thumbs-up"></FontAwesomeIcon> follow</Typography>
                            </Button>
                    }
                    <FollowPopover anchorEl={anchorEl} id={sectionID(section)} profile={profile} object={section} open={openFollow} onClose={toggleFollow}></FollowPopover>
                </Grid>
                <Grid item xs={4}>
                    <Button key={"comment-"+sectionID(section)} id={"commentButton-"+sectionID(section)} onClick={(e) => clickComment(e)}>
                        <Typography><FontAwesomeIcon icon="comment-alt"></FontAwesomeIcon> Comment</Typography>
                    </Button>
                    <Dialog open={openComment} onClose={() =>toggleComment()}>
                        <CommentPopover section={section} onClose={toggleComment}></CommentPopover>
                    </Dialog>
                </Grid>
                <Grid item xs={3} >
                    <Button key={"share-"+sectionID(section)} id={"shareButton-"+sectionID(section)} onClick={(e) => clickShare(e, sectionID(section))}>
                        <Typography><FontAwesomeIcon icon="share"></FontAwesomeIcon> Share</Typography>
                        <SharePopover anchorEl={anchorEl} id={sectionID(section)} profile={profile} object={section} open={openShare} onClose={toggleShare} shareLink={shareLink}></SharePopover>
                    </Button>
                </Grid>
            </Grid>
            
        )
    }
}
