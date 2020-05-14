import React, {useContext} from 'react';
import { Context } from '../../Context/Context.js';
import { AppBar, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
    const [state, setState] = useContext(Context);
    const { profile } = state;
    const classes = useStyles();

   

    if(profile.email === ''){
        return null
    }
    return (
        <div className={classes.root} position="static">
            <header id="masthead" className={classes.header}>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
              <h2 style={{alignSelf: 'center', color: '#ffb74d'}}>SchoListIt</h2>
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
        </div>
    )
}
