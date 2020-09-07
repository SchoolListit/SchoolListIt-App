import React from 'react';
import { Grid, Typography} from '@material-ui/core';
import WilsonSpeak from '../Components/WatsonSpeak.js';



export default function AssignmentTitle( {postTitle, postExcerpt, onclick, post}) {
    return (
        <Grid container justify="space-between" >
            <Grid style={{cursor: 'pointer'}} item xs={10}>
                <Typography style={{cursor: 'pointer'}} onClick={() => onclick(post)}  onclickvariant="body1" style={{textTransform: 'capitalize'}} >
                    {postTitle+" "}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <WilsonSpeak title={postTitle} excerpt={postExcerpt} style={{color: '#bdbdbd'}}></WilsonSpeak> 
            </Grid>
        </Grid>
    )
}
