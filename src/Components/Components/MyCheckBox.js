import React, { useState } from 'react';
import {  Checkbox, ListItemIcon} from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles(() => ({
    root: {
        minWidth: '0',
    }
  }));

export default function MyCheckBox( {userID, postID, initialChecked} ) {
    const classes = useStyles();
    const initialCheck = (initialChecked.indexOf(userID.toString()) !== -1) ? true : false ;
    const [isChecked, setIsChecked] = useState(initialCheck);

    const handleCheck = (value) => {
        let url = 'https://schoolistit.com/wp-json/schoolistit-rest/v2/mark_complete';
        setIsChecked(!value);
        //make 2nd call
        axios.post(url)
        .then( (res) => {
            const salt = res.data['salt'];
            const key = 'aVdG#D.KRFXw)dr!37}BrpkxdQM8N4';
            const authHeader = salt+"_"+key;
            const headers = {
                "X-Scholistit-Auth": authHeader,
                "Content-Type": "multipart/form-data"
                }
            const body = {
                post_id: postID,
                user_id: userID,
                action: (!value === true) ? 'insert':'delete' 
            }
            let formdata = new FormData();
            for (const property in body) {
                formdata.append(property, body[property]);
            }    
            axios.post(url, formdata, {headers: headers})
            .then( res => {
                //setIsChecked(!value);
                console.log('check-success');
            })

        })
    }

    if(Array.isArray(initialChecked) === false || userID === 'undefined'){
        return null
    } else {
        return (
                <React.Fragment>
                    <ListItemIcon className={classes.root} key={postID} onClick={() => handleCheck(isChecked)}>
                        <Checkbox
                        checked={isChecked}
                        inputProps={{ 'aria-labelledby': postID }}
                        />
                    </ListItemIcon>
                    
                </React.Fragment>
                )
    }
}
