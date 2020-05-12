import React, {useContext} from 'react';
import { Context } from '../../Context/Context.js';
import Feed from '../Pages/Feed.js';
import LandingPage from '../Pages/LandingPage.js';
import { Redirect } from 'react-router-dom';

export default function Timeline() {
    //pull in context
    const [state] = useContext(Context);
    const { profileIsSaved, loginVerified, profile } = state;    

   if(loginVerified !== true || profileIsSaved !== true || profile.email === '' ){
       return (<Redirect to="/sign-in" />)
   }
    return (
        <Feed></Feed>
    )

    
}
