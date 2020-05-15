import React, {useContext} from 'react';
import { Context } from '../../Context/Context.js';
import Feed from '../Components/Feed.js';
import { Redirect } from 'react-router-dom';

export default function Timeline() {
    //pull in context
    const [state] = useContext(Context);
    const { profile, isLoggedIn } = state;   

    

    return(
        <React.Fragment>
            {(isLoggedIn(profile))
                ? <Feed></Feed>
                : <Redirect to="/sign-in" exact />
            }
        </React.Fragment>
       
    )
}
