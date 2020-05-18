import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Link, ListItemIcon} from '@material-ui/core';
import axios from 'axios'

export default function MyCheckBox( {userID, postID, initialChecked} ) {
    const initialCheck = (initialChecked.indexOf(userID.toString()) !== -1) ? true : false ;
    const [isChecked, setIsChecked] = useState(initialCheck);

    const handleCheck = (value) => {
        let url = 'http://localhost:8888/parentchecklist/wp-json/parent-checklist-rest/v2/mark_complete';
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
                setIsChecked(!value);
            })

        })
    }

    if(initialChecked === 'undefined' ){
        return null
    } else {
        return (
                <React.Fragment>
                    <ListItemIcon key={postID} onClick={() => handleCheck(isChecked)}>
                        <Checkbox
                        edge="end"
                        checked={isChecked}
                        inputProps={{ 'aria-labelledby': postID }}
                        />
                    </ListItemIcon>
                    
                </React.Fragment>
                )
    }
}
