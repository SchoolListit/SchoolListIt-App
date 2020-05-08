import React, { useContext} from 'react';
import { GlobalContext } from '../../Context/GlobalState.js';



export default function Feed() {

    const { grades, teachers, subjects, schools } = useContext(GlobalContext);
    
    return (
        <div>
            
        </div>
    )
}
