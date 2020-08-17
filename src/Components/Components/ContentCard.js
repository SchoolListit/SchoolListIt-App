import React, { useContext }  from 'react';
import { Context } from '../../Context/Context.js';
import { Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  ListActions from '../Components/ListActions.js';



const useStyles = makeStyles(() => ({
    root: {
        flexBasis: '350px',
        margin: '0 10px 20px 10px',
    },
  }));

export default function ContentCard( {following, mainTitle, subTitle, children, icon, iconTo, section} ) {
    const classes = useStyles();
    const [state] = useContext(Context);
    const { profile } = state;


   

    
    if(profile == 'undefined'){
        return null;
    }
    if(following == 'undefined'){
        return null;
    }
    
        return (
            <React.Fragment>
                <Paper className={classes.root} elevation={3} >
                <div className="entry-header" style={{display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h2 className="entry-title">{mainTitle}</h2>
                            <h3 className="entry-subtitle">{subTitle}</h3>
                        </div> 
                        {/** this is the door icon on the classroom in the feed view */}
                        {(icon) 
                            ? <Button href={iconTo} >
                                <FontAwesomeIcon icon={icon} style={{fontSize: '2em'}}></FontAwesomeIcon>
                                </Button>
                            : null}
                    </div> 
                    <div className="entry-content" >
                        {children}
                    </div> 
                    <ListActions following={following} section={section} profile={profile} shareLink={iconTo}></ListActions>
                </Paper>     
            </React.Fragment>
        )    
    
}
