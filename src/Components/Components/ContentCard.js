import React, { useContext }  from 'react';
import { Context } from '../../Context/Context.js';
import { Card, Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';



const useStyles = makeStyles(() => ({
    root: {
        maxHeight: '300px',
        overflow: 'scroll-y'
    },
  }));

export default function ContentCard( {mainTitle, subTitle, children, icon, iconTo}) {

    const [state, setState] = useContext(Context);
    const { profile } = state;
    const classes = useStyles();

//<Avatar alt={profile.name} src={profile.photo} style={{marginRight: '10px'}}></Avatar>


    return (
        <React.Fragment>
            <Card className={classes.root} elevation={3} style={{flexBasis: '300px', flexShrink: '0', margin: '15px'}}>
            <div className="entry-header" style={{display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <h2 className="entry-title">{mainTitle}</h2>
                        <h3 className="entry-subtitle">{subTitle}</h3>
                        </div>    
                        {(icon) 
                            ? <Link to={iconTo}><FontAwesomeIcon icon={icon} style={{fontSize: '2em'}}></FontAwesomeIcon></Link>
                            : null}
                    
                </div> 
                <div className="entry-content" style={{maxHeight: '500px', overflow: 'auto', paddingRight: '20px'}}>
                    {children}
                </div> 
            </Card>     
        </React.Fragment>
    )
}
