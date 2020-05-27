import React, {useContext} from 'react';
import { Popover, Container, Button, Typography } from '@material-ui/core';
import axios from 'axios';
import {Context} from '../../../Context/Context.js';



export default function FollowPopover( { following, setFollowing, anchorEl, open, profile, object, onClose }) {
    const { userID, students }= profile;
    const [state, setState] = useContext(Context);
    
    
    
    const followSection = (profile, studentName) => {
        let body = {
            type: 'section',
            object: JSON.stringify(object),
            user_id: userID,
            student: studentName
        }
        
        let url = "http://localhost:8888/parentchecklist/wp-json/parent-checklist-rest/v2/follow"
        //create post
        axios.get(url, body)
        .then( (res) => {
            const salt = res.data['salt'];
            const key = 'aVdG#D.KRFXw)dr!37}BrpkxdQM8N4';
            //const authHeader = btoa(salt+"_"+key);
            const authHeader = salt+"_"+key;
            let formdata = new FormData();                     
            const headers = {
                "X-Scholistit-Auth": authHeader,
                "Content-Type": "multipart/form-data"
            }
            for (const property in body) {
                formdata.append(property, body[property]);
            }
            //make 2nd call
            axios.post(url, formdata, {headers: headers})
            .then( (res) => {
                state.following = res.data;
                //setState(state);
            })
        });
    }

    if(students !== 'undefined' && students.length > 0){
        return (
            <Popover
                id={object}
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >
                <Container>
                    <p key={profile.name+"-follows"}>
                        <Button key={profile.name+"-follow"} section={object} onClick={() => followSection(profile, 'no')}>{profile.user.display_name}</Button>
                    </p>
                    {students.map( student => {
                        return (
                            <p key={"student-"+student.name}>
                                <Button key={"student-"+student.name} onClick={() => followSection(profile, student.name)}>{student.name}</Button>
                            </p>
                        )
                    })}
                </Container>
            
            </Popover>
        )
    } else {
        return (
            <Popover
                id={object}
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >Done</Popover>

        )
    }
    
}
