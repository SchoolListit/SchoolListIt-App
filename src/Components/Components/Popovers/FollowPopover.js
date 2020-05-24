import React from 'react';
import { Popover, Container, Button, Typography } from '@material-ui/core';



export default function FollowPopover( { anchorEl, open, profile, object, onClose }) {
    const students = JSON.parse(localStorage.getItem('scholistit-profileStudents'))
    

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
                        <Button key={profile.name+"-follow"}>{profile.name}</Button>
                    </p>
                    {students.map( student => {
                        return (
                            <p key={"student-"+student.name}>
                                <Button key={"student-"+student.name}>{student.name}</Button>
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
