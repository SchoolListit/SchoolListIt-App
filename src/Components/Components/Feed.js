import React, { useContext} from 'react';
import { GlobalContext } from '../../Context/GlobalState.js';



export default function Feed() {

    const context = useContext(GlobalContext);
    console.log(context);
    return (
        <div>
            where is my data?
        </div>
    )
}
