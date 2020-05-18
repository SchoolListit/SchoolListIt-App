import React from 'react';


export default function SectionSubForm( props ) {
    if(section !== false){
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

            </React.Fragment>
        )
    }
}