import React, {useContext, useState, useEffect} from 'react';
import { Context } from '../../Context/Context.js';
import { searchSections } from '../../Context/functions.js';
import FollowSomething from '../Components/Feed.js';
import { Redirect, useHistory } from 'react-router-dom';
import Header from '../Components/Header.js';

export default function Home() {
    const [state, setState] = useContext(Context);
    const { sections, profile } = state;
    const [showGlobalForm, setShowGlobalForm] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const history = useHistory();

    const sendToLogin = () => {
        history.push('/sign-in/');
    }

    const openGlobalForm = () => {
        setShowGlobalForm(true);
    }

    const onCloseGlobalForm = () => {
        setShowGlobalForm(false);
    }

    useEffect(() => {
        if(profile !== null){
            state.profile = profile;
            setState(state);
        }
        
    }, [profile, state, setState])

    const getSearchResults = (searchTerm) => {

        if(sections.length === 0){
            console.warn('the sections context is not yet propogated');
        } else {
            let results = searchSections(sections, searchTerm);
            setSearchResults(results);
        }
        
    }   

    return(
        <React.Fragment>
            <Header profile={profile} openGlobalForm={openGlobalForm} getSearchResults={getSearchResults}></Header>
            <FollowSomething profile={profile}></FollowSomething>
        </React.Fragment>
       
    )
}