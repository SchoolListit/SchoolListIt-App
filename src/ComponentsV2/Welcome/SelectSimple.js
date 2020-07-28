import React from 'react';
import { makeStyles, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        marginTop: '30px',
        minWidth: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


export default function SelectSimple( {handleChange, setUserState, menuItems, labelId, label, selectId, selectValue} ) {
    const classes = useStyles();

    const itemMarkup = () => { 
       let markup =  menuItems.map ( (item, key) =>{
            return(
                <MenuItem key={key} value={item.itemValue}>{item.itemDescription}</MenuItem>
            )
        })
        return markup;
    }

    return (
        <div >
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id={labelId}>{label}</InputLabel>
                <Select
                labelId={labelId}
                id={selectId}
                value={selectValue}
                onChange={(e) => handleChange(e)}
                label={label}
                >{itemMarkup()}
                </Select>
            </FormControl>
        </div>
        
    )
}
