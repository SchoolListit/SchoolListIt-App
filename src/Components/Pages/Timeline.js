import React, {useContext, useState} from 'react';
import { Context } from '../../Context/Context.js';
import Feed from '../Components/Feed.js';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header.js';

export default function Timeline() {
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const [showGlobalForm, setShowGlobalForm] = useState(false);

    const openGlobalForm = () => {
        setShowGlobalForm(true);
    }

    const onCloseGlobalForm = () => {
        setShowGlobalForm(false);
    }
    
    return(
        <React.Fragment>
            <Header profile={profile} openGlobalForm={openGlobalForm}></Header>
            {(profile)
             
                ? <Feed showGlobalForm={showGlobalForm} onCloseGlobalForm={onCloseGlobalForm}></Feed>
                : <Redirect to="/sign-in" exact />
            }
        </React.Fragment>
       
    )
}
