import React from 'react';
import moment from 'moment';
import { Grid, Typography, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles(() => ({
    loader: {
        display: 'flex'
    },
    header: {
        background: '#bdbdbd',
        padding: '10px 20px'
    },
    due: {
        background: "#ffc400",
        padding: '0 20px',
    }
  }));


export default function SinglePostHeader( {post, toggleIsOpen} ) {
    const classes = useStyles();

    
    if(post === '' || post === "undefined"){
        return null;
    } else {
        return (
                <React.Fragment>
                <Grid className={classes.due} container wrap="nowrap" justify="space-between" >
                    <Grid item xs={11}>
                        <Typography variant="h6" post={post} style={{fontWeight: 'bold'}}>Date: {moment(post.assigned_date).format('dddd MM-DD-YYYY')}
                        {(post.mandatory === 'true')
                            ? <React.Fragment >
                                    {" Due On: "+moment(post.due_date).format('MM-DD-YYYY')}
                                </React.Fragment>

                            : <React.Fragment>
                                    {" Optional"}
                            </React.Fragment>
                        }
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Button onClick={() => toggleIsOpen()} >
                            <FontAwesomeIcon icon="window-close"></FontAwesomeIcon>
                        </Button>
                    </Grid>
                </Grid>
                <div className={classes.header} >
                    <Typography variant="h2" post={post}>{post.post_title.rendered}</Typography>
                    <Typography variant="h6" excerpt={post.post_excerpt}>{post.post_excerpt}</Typography>
                </div>
            </React.Fragment>              
        )
    }
}