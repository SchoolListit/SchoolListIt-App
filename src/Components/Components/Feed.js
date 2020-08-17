import React, {  useContext, useState  } from 'react';
import { Dialog } from '@material-ui/core';
import { Context } from '../../Context/Context.js';
import Classrooms from './Classrooms.js';
import AddLesson from '../Forms/AddLesson.js';
import SectionTitle from './SectionTitle.js';


export default function Feed( {searchResults, setSearchResults, openGlobalForm, onCloseGlobalForm, showGlobalForm} ) {
    const [state] = useContext(Context);
    const [newPost, setNewPost] = useState('');
    const [newSection, setNewSection] = useState("undefined");
    const {sections, following} = state;
    const { profile } = state;

    

    const showNewPost = (newPost) => {
        setNewPost(newPost);
    }

    const showNewSection = (section) => {
        setNewSection(section);
    }

    const clearSearchResults = () =>{
        setSearchResults([]);
    }

    const closeSection = (section) =>{
        //in here we write proper state handling code to close the section
        switch (section) {
            case 'Search Results':
                clearSearchResults();
            break;
            default: 
                console.log("closeSection section not found");    
        }
    }


    if(sections === 'undefined' || profile === 'undefined' || profile == null || typeof profile === "undefined"){
        return null;
    } else {
        return (
            <React.Fragment>
                {(searchResults.length > 0)
                    ? <SectionTitle section="Search Results" canClose="yes" closeSection={closeSection}></SectionTitle>
                    : null
                }
                <Classrooms  sections={searchResults} newPost={newPost} newSection={newSection} showNewSection={showNewSection} showNewPost={showNewPost} openGlobalForm={openGlobalForm} onCloseGlobalForm={onCloseGlobalForm}></Classrooms> 
                <SectionTitle section="Class Feed" canClose="no" closeSection={closeSection}></SectionTitle>
                <Classrooms  sections={following} newPost={newPost} newSection={newSection} showNewPost={showNewPost} openGlobalForm={openGlobalForm} onCloseGlobalForm={onCloseGlobalForm}></Classrooms> 
                <Dialog open={showGlobalForm} onClose={(e) => onCloseGlobalForm()} disablePortal={true}>
                    <AddLesson section={false} onClickHideForm={onCloseGlobalForm} showNewPost={showNewPost} showNewSection={showNewSection}></AddLesson>
                </Dialog>
            </React.Fragment>
             
        )
    }
        
}
