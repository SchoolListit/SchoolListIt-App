import React, { useContext }  from 'react';
import { Context } from '../../Context/Context.js';
import { Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import  ListActions from '../Components/ListActions.js'



const useStyles = makeStyles(() => ({
    root: {
        flexBasis: '350px',
        margin: '0 10px 20px 10px',
    },
  }));

export default function ContentCard( {mainTitle, subTitle, children, icon, iconTo, onClickAdd, section}) {

    const [state, setState] = useContext(Context);
    const { profile } = state;
    const classes = useStyles();

//<Avatar alt={profile.name} src={profile.photo} style={{marginRight: '10px'}}></Avatar>


    return (
        <React.Fragment>
            <Paper className={classes.root} elevation={3} >
            <div className="entry-header" style={{display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <h2 className="entry-title">{mainTitle}</h2>
                        <h3 className="entry-subtitle">{subTitle}</h3>
                    </div> 
                        {(icon) 
                            ? <Button href={iconTo} ><FontAwesomeIcon icon={icon} style={{fontSize: '2em'}}></FontAwesomeIcon></Button>
                            : null}
                        
                    
                </div> 
                <div className="entry-content" >
                    {children}
                </div> 
                <ListActions onClickAdd={onClickAdd} section={section}></ListActions>
            </Paper>     
        </React.Fragment>
    )
}
