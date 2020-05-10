import React, { useContext }  from 'react';
import { Card, Avatar } from '@material-ui/core';

export default function ContentCard( {mainTitle, subTitle, children}) {

    //const { profileUserPhoto, profileUserName } = useContext(GlobalContext);

    return (
        <React.Fragment>
            <Card elevation={3} style={{flexBasis: '300px', flexShrink: '0', margin: '15px'}}>
            <div className="entry-header" style={{display: 'flex' }}>
                    <Avatar alt={profileUserName} src={profileUserPhoto} style={{marginRight: '10px'}}></Avatar>
                    <div>
                        <h2 className="entry-title">{mainTitle}</h2>
                        <h3 className="entry-subtitle">{subTitle}</h3>
                    </div>
                </div> 
                <div className="entry-content" style={{maxHeight: '500px', overflow: 'auto', paddingRight: '20px'}}>
                    {children}
                </div> 
            </Card>     
        </React.Fragment>
    )
}
