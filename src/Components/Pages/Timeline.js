import React, {useContext} from 'react';
import { Context } from '../../Context/Context.js';
import Feed from '../Pages/Feed.js';
import LandingPage from '../Pages/LandingPage.js';

export default function Timeline() {
    //pull in context
    const [state] = useContext(Context);
    const { profileIsSaved } = state;    

    return (
        (profileIsSaved === true) ? <Feed></Feed> : <LandingPage></LandingPage>
    )
}
