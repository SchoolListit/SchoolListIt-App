import React from 'react';
import { Popover, Container, Button, Typography } from '@material-ui/core';
import axios from 'axios';



export default function FollowPopover( { anchorEl, open, profile, object, onClose }) {
    const students = JSON.parse(localStorage.getItem('scholistit-profileStudents'))
    
    const followSection = (profile, studentName) => {
        let body = {
            type: 'section',
            object: object,
            user_id: profile.wpUserObj.user.ID,
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
               console.log(res.data);
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
                        <Button key={profile.name+"-follow"} section={object} onClick={() => followSection(profile, 'no')}>{profile.name}</Button>
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
