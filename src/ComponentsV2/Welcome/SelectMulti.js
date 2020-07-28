import React from 'react';
import { makeStyles, useTheme, Input, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import Challenges from './Challenges';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
      },
    noLabel: {
    marginTop: theme.spacing(3),
    }, 
  }));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

  function getStyles(challenge, challenges, theme) {
    return {
      fontWeight:
        challenges.indexOf(challenge) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  


export default function SelectMulti( {handleChange, setUserState, menuItems, labelId, label, selectId, selectValue} ) {
    const classes = useStyles();
    const theme = useTheme();

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
            <FormControl className={classes.formControl+" "+classes.noLabel}>
            <Select
            multiple
            displayEmpty
            value={selectValue}
            onChange={handleChange}
            input={<Input />}
            renderValue={(selected) => {
                if (selected.length === 0) {
                return <em>Placeholder</em>;
                }

                return selected.join(', ');
            }}
            MenuProps={MenuProps}
            inputProps={{ 'aria-label': 'Without label' }}
            >
            <MenuItem disabled value="">
                <em></em>
            </MenuItem>
            {menuItems.map((item, key) => (
                <MenuItem key={key} value={item.itemValue} style={getStyles(item, menuItems, theme)}>
                {item.itemDescription}
                </MenuItem>
            ))}
            </Select>
      </FormControl>




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
