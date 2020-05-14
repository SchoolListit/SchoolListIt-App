import React, { useContext }  from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function ChooseWPTerm(props) {
    if(props.data === 'undefined'){
        return null
    } else {
        return (
            <React.Fragment>
                <Autocomplete
                    fullWidth={true}
                    id={props.taxonomy}
                    freeSolo
                    options={props.data.map((option) => option.name)}
                    renderInput={(params) => (
                    <TextField {...params} label={props.taxonomy} margin="normal" />
                    )}
                /> 
            </React.Fragment>
        )
    }
    
}
