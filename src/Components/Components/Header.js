import React, {useContext} from 'react';
import { Context } from '../../Context/Context.js';
import { AppBar, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'rgba(192,192,192, 0.7)',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px 30px',
    },
    
  }));

export default function Header() {
    const [state, setState] = useContext(Context);
    const { profile } = state;
    const classes = useStyles();

   

    if(profile.email === ''){
        return null
    }
    return (
        <AppBar className={classes.root} position="static">
            <header id="masthead">
            <div style={{display: 'flex'}}>
            <img alt="dare county schools" src="https://resources.finalsite.net/images/f_auto,q_auto/v1521048827/darek12ncus/fqfcusy7dngivvz8yn6m/DCS_Icon_Full_Color_RGB.png" />
            <h2 style={{alignSelf: 'center', color: '#003745'}}>SchoListIt</h2>
            </div>
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
        </AppBar>
    )
}
