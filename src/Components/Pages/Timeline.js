import React from 'react';
import {GlobalProvider} from '../../Context/GlobalState.js';
import Feed from '../Components/Feed.js';

export default function Timeline( ) {

    return (
        <GlobalProvider>
            <Feed></Feed>
        </GlobalProvider>
        
    )
}
