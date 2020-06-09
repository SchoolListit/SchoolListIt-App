import React from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export default function MyDialogTitle( {title, onClose, icon, subtitle}) {
    return (
        <Grid container justify="space-between" alignItems="center" style={{backgroundColor: '#ffca28', padding: '0 30px'}}>
            <Grid item>
                <Typography variant="h6">
                    {(icon !== false)
                        ?  <React.Fragment>
                                <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
                                {" "}
                            </React.Fragment> 
                        : null
                    }
                    {title}</Typography>
                    {(subtitle !== undefined && subtitle != '')
                        ? <Typography variant="subtitle1">
                            {subtitle}
                        </Typography>
                        : null
                    }  
            </Grid>
            <Grid item>
                <FontAwesomeIcon icon="window-close" onClick={onClose}></FontAwesomeIcon>
            </Grid>
        </Grid>
    )
}
