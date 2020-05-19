import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../../Context/Context.js'
import { Container, Card, Paper, Typography} from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(() => ({
    root: {
        padding: '0',
    },
    featuredImage: {
        width: '100%'
    },
    wpPostContent: {
        padding: '20px',
    }

  }));

export default function SingleAssignment( {postID} ) {
    const classes = useStyles();
    const [state, setState] = useContext(Context);
    const { assignments } = state; 
    
    if(postID === ""){
        return null;
    } else {
        const posts = assignments.filter( assignment => assignment.id === postID)
        let post = posts[0];
        let excerpt = <div dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}></div>
        let postContent = <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
        return (
            <Container className={classes.root}>
                <Paper>
                    <div className="entry-header" style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <Typography variant="h2">{post.title.rendered}</Typography>
                            <Typography variant="h3">{excerpt}</Typography>
                        </div>
                        <div style={{alignSelf: 'center'}}>
                            <Typography>Date: {moment(post.date).format('MM-DD-YYYY')}</Typography>
                            <Typography style={{fontWeight: 'bold'}}>Due Date: {moment(post.due_date).format('MM-DD-YYYY')}</Typography>

                        </div>
                    </div>
                    
                     
                    <div className="wp-post-content">
                        {(post.imageUrl !== false)
                            ?
                            <img src={post.imageUrl} alt={"image of"+post.title.rendered} className={classes.featuredImage}/>
                            :
                            null
                        } 
                        {postContent}
                    </div>
                    
                </Paper>
            </Container>
            
        )
    }
    
}
