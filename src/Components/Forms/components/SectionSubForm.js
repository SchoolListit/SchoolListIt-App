import React, {useContext} from 'react';
import {  TextField  } from '@material-ui/core';
import { Context } from '../../../Context/Context.js';
import ChooseWPTerm from './ChooseWPTerm.js';

export default function SectionSubForm( props ) {
    const [state] = useContext(Context);
    
    // eslint-disable-next-line no-unused-vars
    const grades = [
       'Pre-K', 'K', '1st', '2nd', '3rd', '4th', 
       '5th', '6th', '7th', '8th', '9th',
       '10th', '11th', '12th', 'Undergraduate', 'Graduate'
     ]

    if(props.section !== false){
        return (
            <React.Fragment>
                <TextField type="hidden" value={props.section.schools} id="schools"></TextField>
                <TextField type="hidden" value={props.section.teachers} id="teachers"></TextField>
                <TextField type="hidden" value={props.section.grades} id="grades"></TextField>
                <TextField type="hidden" value={props.section.subjects} id="subjects"></TextField>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <ChooseWPTerm taxonomy="schools" data={state.schools}></ChooseWPTerm>
                <ChooseWPTerm taxonomy="teachers" data={state.teachers}></ChooseWPTerm>
                <ChooseWPTerm taxonomy="grades" data={state.grades}></ChooseWPTerm>
                <ChooseWPTerm taxonomy="subjects" data={state.subjects}></ChooseWPTerm>
            </React.Fragment>
        )
        
    }
    
}