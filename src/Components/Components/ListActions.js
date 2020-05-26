import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Dialog } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FollowPopover from './Popovers/FollowPopover';
import CommentPopover from './Popovers/CommentPopover';
import SharePopover from './Popovers/SharePopover';





const useStyles = makeStyles(() => ({
    root: {
        background: '#e0e0e0',
        padding: '0',
        fontSize: '1.5em'
    },
  }));



export default function ListActions( {section, shareLink, following} ) {
    const classes = useStyles();
    const [openFollow, setOpenFollow] = useState(false);
    const [openComment, setOpenComment] = useState(false);
    const [openShare, setOpenShare] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const profile = JSON.parse(localStorage.getItem("scholistit_profile"))

    const isFollowed = following.filter( followed => followed.section === section);
    console.log(isFollowed)

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

    const sectionID = section.schools.replace(" ", "-")+"_"+section.teachers.replace(" ", "-")+"_"+section.grades.replace(" ", "-")+"_"+section.subjects.replace(" ", "-");

    return (
        <Grid className={classes.root} container justify="space-between" alignItems="flex-start">
            
            <Grid item xs={4}>
                <Button key={"follow-"+sectionID} id={"followButton-"+sectionID} onClick={(e) => clickFollow(e)}>
                    {/**here we will decide if already followed */}
                    <Typography><FontAwesomeIcon icon="thumbs-up"></FontAwesomeIcon> Follow</Typography>
                    <FollowPopover anchorEl={anchorEl} id={sectionID} profile={profile} object={sectionID} open={openFollow} onClose={toggleFollow}></FollowPopover>
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Button key={"comment-"+sectionID} id={"commentButton-"+sectionID} onClick={(e) => clickComment(e)}>
                    <Typography><FontAwesomeIcon icon="comment-alt"></FontAwesomeIcon> Comment</Typography>
                </Button>
                <Dialog open={openComment} onClose={() =>toggleComment()}>
                    <CommentPopover section={section} onClose={toggleComment}></CommentPopover>
                </Dialog>
            </Grid>
            <Grid item xs={3} >
                <Button key={"share-"+sectionID} id={"shareButton-"+sectionID} onClick={(e) => clickShare(e, sectionID)}>
                    <Typography><FontAwesomeIcon icon="share"></FontAwesomeIcon> Share</Typography>
                    <SharePopover anchorEl={anchorEl} id={sectionID} profile={profile} object={section} open={openShare} onClose={toggleShare} shareLink={shareLink}></SharePopover>
                </Button>
            </Grid>
            
        </Grid>
        
    )
}
