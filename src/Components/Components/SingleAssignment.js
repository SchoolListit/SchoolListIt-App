import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../../Context/Context.js'
import { Container, Grid, Paper, Typography, Button} from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles(() => ({
    root: {
        padding: '0',
        margin: '0',
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
        background: "#ffc400",
        padding: '0 20px',
    }

    

  }));

export default function SingleAssignment( {postID, toggleIsOpen} ) {
    const classes = useStyles();
    const [state, setState] = useContext(Context);
    const [post, setPost] = useState("");
    
    useEffect ( () => {
        if(postID){
            let url = 'http://schoolistit.com/wp-json/wp/v2/assignments/'+postID;
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
                <Container className={classes.root} maxWidth={false}>
                    <Paper>
                        <Grid className={classes.due} container wrap="nowrap" justify="space-between" >
                            <Grid item >
                                <Typography variant="h6" style={{fontWeight: 'bold'}}>Date: {moment(post.date).format('dddd MM-DD-YYYY')}
                                {(post.mandatory === 'true')
                                    ? <React.Fragment>
                                         {"Due On: "+moment(post.due_date).format('MM-DD-YYYY')}
                                        </React.Fragment>

                                    : <React.Fragment>
                                         {" Optional"}
                                    </React.Fragment>
                                }
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => toggleIsOpen()} >
                                    <FontAwesomeIcon icon="window-close"></FontAwesomeIcon>
                                </Button>
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
