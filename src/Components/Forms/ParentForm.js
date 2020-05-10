import React, { useContext, useRef, useState }  from 'react';
import {Context} from '../../Context/Context.js';
import { FormControl, TextField, Portal, Button, List, ListItem, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function ParentForm( props ) {
    const [state, setState] = useContext(Context);
    const [show, setShow] = useState(true);

    const { profileUserType, profileStudents } = state; 
    const container = useRef(null);


    const addNewStudent = (e) => {
        let studentName = document.getElementById('add-student').value;
        if(studentName.length > 0 && (typeof studentName == 'string')) {

            let student = {
                name: studentName,
            }
            setState({
                profileStudents: state.profileStudents.push(student)
            })
            localStorage.setItem('scholistit_students', JSON.stringify(profileStudents));
        }
        document.getElementById('add-student').value = '';
    }
        return(
            <React.Fragment>
                <div >
                    {show ? (
                    <Portal container={container.current}>
                        <Typography variant="h5">My Students</Typography>
                        <List>
                            {
                                profileStudents.map( student => {
                                    return (
                                        <ListItem>student.name</ListItem>
                                    )
                                })
                            }
                        </List>
                    </Portal>
                    ) : null}
                </div>

                    <FormControl margin="normal" fullWidth={true}>
                    
                    <TextField 
                        fullWidth={true}
                        required 
                        id='add-student'
                        name='add-student'
                        label="New Student's Name"
                        helperText="Add a new Student to your profile"  
                    ></TextField> 
                    </FormControl> 
                    <Button color="primary"  onClick={addNewStudent}>
                        <FontAwesomeIcon icon="plus-square" > 
                    </FontAwesomeIcon> Add Student </Button>
                      
            </React.Fragment> 
            )
    
}
