import React, { useContext, useState }  from 'react';
import {UserContext} from '../Context/UserContext.js';
import { AppBar, Typography, Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Search from './Search.js';

const useStyles = makeStyles((theme) => ({
    
    })
);

export default function Header() {
    const classes = useStyles();
    const [userState, setUserState] = useContext(UserContext);
    const [showProfile, setShowProfile] = useState(false);
    
    const profile = {

    }

    const onClickAvatar = (e) => {
      let showProfileNow = !showProfile;
      setShowProfile(showProfileNow);
    }

    return (  
        <AppBar>
            <Grid container justify="space-between" >
                    <Grid item xs={9}  >
                        <Typography style={{ color: '#424242', fontWeight: '700'}} variant="h5" component="h1" >SchoolListIt</Typography>
                    </Grid>
                    <Grid item xs={1} >
                        <Typography variant="h4" style={{color: '#eeeeee', textAlign: 'right', margin: '10px'}}>
                            <FontAwesomeIcon icon="bell"></FontAwesomeIcon>
                        </Typography>
                    </Grid>
                    <Grid item xs={1} >
                        <Avatar src={userState.userPhoto} onClick={(e) => onClickAvatar(e)}></Avatar>   
                    </Grid>
            </Grid>
        </AppBar>        
    )
}
