import React, { useState, useEffect, useRef} from 'react';
import axios, { CancelToken } from "axios";
import { Grid, Typography, FormControlLabel, Checkbox, useMediaQuery } from '@material-ui/core';



export default function CheckSchools( { userState, setUserState, setContentState, schoolOptions } ) {   
    const [mySchools, setMySchools] = useState([]);
    const [checkboxes, setSchoolCheckboxes] = useState('');
    const matches = useMediaQuery('(min-width:780px)')

    
    const addSchool = (school) => {
        let newUser = userState;
        newUser.mySchools.push(school);
        setUserState(newUser);
    }
    const distinct = (value, index, self) => { 
        return self.indexOf(value) === index;
    }

    const gridDirection = (matches) => {
        console.log(matches);
        if(matches === true){
            return 'column';
        } else {
            return 'row';
        }

    }
    
    return (
        <Grid container  direction={gridDirection(matches)} style={{height: '250px', maxWidth: '90%'}}  >
            {schoolOptions.map( (school, key) => {
                return(
                        <Grid item key={key} >
                        <FormControlLabel key={key}
                            control={<Checkbox key={key} onChange={(e) => addSchool(e, key, school)}  />}
                            label={school.name}
                            />
                        </Grid>
                    )
                }) 
            }
        </Grid>
    )
    
}
