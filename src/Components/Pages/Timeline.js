import React, {useContext} from 'react';
import { Context } from '../../Context/Context.js';
import Feed from '../Components/Feed.js';
import LandingPage from '../Pages/LandingPage.js';

export default function Timeline( props ) {
    //pull in context
    const [state] = useContext(Context);
    const { profileIsSaved } = state;    

    if(profileIsSaved){
        return <Feed></Feed>
    } else {
        return <LandingPage></LandingPage>
    }
}
