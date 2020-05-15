import React, {useContext} from 'react';
import { Context } from '../../Context/Context.js';
import Feed from '../Components/Feed.js';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header.js';

export default function Timeline() {
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    

    
    return(
        <React.Fragment>
            <Header></Header>
            {(profile)
                ? <Feed></Feed>
                : <Redirect to="/sign-in" exact />
            }
        </React.Fragment>
       
    )
}
