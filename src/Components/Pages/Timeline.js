import React, {useContext, useState, useEffect} from 'react';
import { Context } from '../../Context/Context.js';
import { searchSections } from '../../Context/functions.js';
import Feed from '../Components/Feed.js';
import { Redirect, useHistory } from 'react-router-dom';
import Header from '../Components/Header.js';

export default function Timeline() {
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

    const getSearchResults = (searchTerm) => {
        if (searchTerm === 'all'){
            setSearchResults(sections);
        }
         else if(sections.length === 0){
            console.warn('the sections context is not yet propogated');
        } else {
            let results = searchSections(sections, searchTerm);
            setSearchResults(results);
        }
        
    }  
    
    useEffect(() => {
        if(profile !== null){
            state.profile = profile;
            setState(state);
        }
        
    }, [profile, state, setState])

    useEffect(() => {
        window.scrollTo(0,0);
    }, [setSearchResults, searchResults])

    return(
        <React.Fragment>
            <Header profile={profile} openGlobalForm={openGlobalForm} getSearchResults={getSearchResults}></Header>
            { (profile === null || profile === 'undefined') 
                ? <React.Fragment>{sendToLogin()}</React.Fragment> 
                : <React.Fragment>
                    <Feed searchResults={searchResults} getSearchResults={getSearchResults} setSearchResults={setSearchResults} showGlobalForm={showGlobalForm} onCloseGlobalForm={onCloseGlobalForm} openGlobalForm={openGlobalForm}></Feed>
                    </React.Fragment>
            }
        </React.Fragment>
       
    )
}
