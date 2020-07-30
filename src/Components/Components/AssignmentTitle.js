import React from 'react';
import { Grid, Typography} from '@material-ui/core';
import WilsonSpeak from '../Components/WatsonSpeak.js';



export default function AssignmentTitle( {postTitle, postExcerpt}) {
    return (
        <Grid container alignItems="center">
            <Grid item xs={10}>
                <Typography variant="body1" style={{textTransform: 'capitalize'}} >
                    {postTitle+" "}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <WilsonSpeak title={postTitle} excerpt={postExcerpt} style={{color: '#bdbdbd'}}></WilsonSpeak> 
            </Grid>
        </Grid>
    )
}
