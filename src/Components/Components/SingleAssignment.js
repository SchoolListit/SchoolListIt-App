import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../../Context/Context.js'
import { Container, Grid, Paper, Typography} from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';

const useStyles = makeStyles(() => ({
    root: {
        padding: ' 0 20px 20px 20px',
        overflow: 'auto'
    },
    featuredImage: {
        width: '100%',
        maxWidth: '100%'
    },
    header: {
        background: '#bdbdbd',
        padding: '10px 20px'
    },
    due: {
        background: "#616161",
        padding: '0 20px',
        color: '#eeeeee'
    }

    

  }));

export default function SingleAssignment( {postID} ) {
    const classes = useStyles();
    const [state, setState] = useContext(Context);
    const [post, setPost] = useState("");
    
    useEffect ( () => {
        if(postID){
            let url = 'http://localhost:8888/parentchecklist/wp-json/wp/v2/assignments/'+postID;
            axios.get(url)
                .then( res => {
                    setPost(res.data);
                })
        }
    }, [postID, setPost])

    
    
    if(postID === "undefined" || post === ""){
        return null;
    } else {
        if(post !== 'undefined'){
            let excerpt = <div dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}></div>
            let postContent = <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
            return (
                <Container className={classes.root}>
                    <Paper>
                        <Grid className={classes.due} container wrap="nowrap" justify="space-between" >
                            <Grid item >
                                <Typography variant="subtitle2" style={{fontWeight: 'bold', color: '#eeeeee'}}>Date: {moment(post.date).format('dddd MM-DD-YYYY')}</Typography>
                            </Grid>
                            <Grid item >
                            {(post.mandatory === 'true')
                                ? <Typography variant="subtitle2" style={{fontWeight: 'bold', color: '#eeeeee'}}>Due On: {moment(post.due_date).format('MM-DD-YYYY')}</Typography>

                                : <Typography variant="subtitle2" style={{fontWeight: 'bold', color: '#eeeeee'}}>Optional</Typography>
                            }
                            </Grid>
                        </Grid>
                        <div className={classes.header} >
                            <Typography variant="h2">{post.title.rendered}</Typography>
                            <Typography variant="h3">{excerpt}</Typography>
                        </div>
                        
                        <Container className={classes.root}>
                            <div className="wp-post-content">    
                                {(post.imageUrl !== false)
                                    ?
                                    <img src={post.imageUrl} alt={"image of"+post.title.rendered} className={classes.featuredImage}/>
                                    :
                                    null
                                } 
                                {postContent}
                            </div>
                        </Container> 
                    </Paper>
                </Container>
                
            )
        } else {
            return null
        }
        
       
    }
    
}
