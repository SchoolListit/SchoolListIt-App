import React, {useContext } from 'react';
import { Context } from '../../Context/Context.js';
import { Avatar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';




const useStyles = makeStyles((theme) => ({
    root: {
        background: 'none',
        backgroundColor: 'rgba(192,192,192, 0.5)',
        overflow: 'hidden'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 30px',
      flexWrap: 'wrap'
    }
  }));

  

  export default function Header(  ) {
    const classes = useStyles();
    const [state, setState] = useContext(Context);
    let history = useHistory();
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));

    

    const profileClick = () => {
        localStorage.removeItem('scholistit_profile');
        let profile;
        state.profile = profile;
        setState(state);
        history.push("/sign-in");
      }
     
    //lets do business  
    if(profile === null){
        return <Redirect to="/sign-in" exact></Redirect>
    } else {
        return (
            <div className={classes.root} position="static">
                <header id="masthead" className={classes.header}>
                    <Typography style={{alignSelf: 'center', color: '#ffb74d', fontWeight: '700'}} variant="h6" component="h1">SchoListIt</Typography>
                <div className="primary-menu-icons" style={{flexBasis: '45%', display: 'flex', justifyContent: 'flex-end'}}>
                    <button >
                        <Link to="/">
                            <FontAwesomeIcon icon="home" ></FontAwesomeIcon>
                        </Link>
                    </button>
                    
                    <Button>
                        <Link to="/about">
                            <FontAwesomeIcon icon="question-circle" ></FontAwesomeIcon>
                        </Link>
                    </Button>
                        
                    <Button onClick={ () => profileClick()}>
                        <Avatar alt={profile.name} src={profile.photo}></Avatar>
                    </Button>
                    
                </div> 
                
            </header>
            </div>
        )
    }
    
    
    
}
