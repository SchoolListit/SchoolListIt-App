import React, {useContext, useEffect, useState} from 'react';
import { Context } from '../../Context/Context.js';
import { Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        background: 'none',
        backgroundColor: 'rgba(192,192,192, 0.5)',
        overflow: 'hidden'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '5px 30px',
      flexWrap: 'wrap'
    }
  }));

  export default function Header() {
    const classes = useStyles();
    const [state, setState] = useContext(Context);
    const { profile } = state;


    const isLoggedIn = ( profile => {
        console.log(profile);
        if( profile.email === '' || profile.name === '' || profile.photo === ''){
            return false;
        }
    })
    if(isLoggedIn(profile) === false){
        return null;
    } else {
        return (
            <div className={classes.root} position="static">
                <header id="masthead" className={classes.header}>
                  <Typography style={{alignSelf: 'center', color: '#ffb74d', fontWeight: '700'}} variant="h6" component="h1">SchoListIt</Typography>
                <div className="primary-menu-icons" style={{flexBasis: '45%', display: 'flex', justifyContent: 'flex-end'}}>
                    <button >
                        <FontAwesomeIcon icon="home" ></FontAwesomeIcon>
                    </button>
                    
                    <button >
                        <FontAwesomeIcon icon="school" ></FontAwesomeIcon>
                    </button>
    
                    <button >
                        <FontAwesomeIcon icon="globe-americas" ></FontAwesomeIcon>
                    </button>
    
                    <Avatar alt={profile.name} src={profile.photo}></Avatar>
                    
                    <a href="/about">
                        <FontAwesomeIcon icon="question-circle" ></FontAwesomeIcon>
                    </a>
                    
                </div> 
                
            </header>
            </div>
        )
    }
    
}
