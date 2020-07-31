import React, {useContext} from 'react';
import {UserContext} from '../../Context/UserContext.js';
import { Container, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SIcon from './SIcon.js';
import MyGoogleLogin from './MyGoogleLogin.js';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        width: '100vw',
        minHeight: '100vh',
        maxHeight: 'none',
        justifyContent: 'center',
        maxWidth: 'none !important',
    },
}));


export default function SignOn( {userState, setUserState, setContentState} ) {
    const classes = useStyles();

    return (
        <Container 
            fixed={true} 
            maxWidth={false}
            style={{height: '100vh', padding: '80px 0'}}
            >
               <Grid container  justify="center" alignContent="center" alignItems="center" style={{height: '100%'}}>
                   <Grid item  >
                        <SIcon></SIcon>
                        <Typography variant="h2" style={{fontWeight: '700', textAlign: 'center'}}>SchoolListIt</Typography>
                        <Typography variant="h3" style={{textAlign: 'center'}}>what's due and when</Typography>
                        <Typography variant="h5" style={{marginTop: '20px', textAlign: 'center'}}>for any school anywhere</Typography>
                        <Typography variant="h5" style={{textAlign: 'center'}}>no matter how you school</Typography>    
                        <MyGoogleLogin userState={userState} setUserState={setUserState} setContentState={setContentState}></MyGoogleLogin>
                   </Grid>
               </Grid>
        </Container>
    )
}
