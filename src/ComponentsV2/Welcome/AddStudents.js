import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Grid, TextField, Button } from '@material-ui/core';


export default function AddStudents( { userState, setUserState, setContentState}) {
    let student = {
        name: '',
        grade: ''
    }
    const [localStudents, setLocalStudents] = useState([student])

    const grades = [
        'Pre-K', 'K', '1st', '2nd', '3rd', '4th', 
        '5th', '6th', '7th', '8th', '9th',
        '10th', '11th', '12th', 'Undergraduate', 'Graduate'
      ]

    const addStudent = () => {
        
        let newStudents = [];
        newStudents = localStudents.map( (student, key) => {
            newStudents.push({
                name: document.getElementById('student-name'+key).value,
                grade: document.getElementById('student-grade'+key).value
            })
        })
        localStudents.push({name: "", grade: ""})
        setLocalStudents(localStudents);
        setLocalStudents(newStudents);
    }


    return (
        <Container style={{marginTop: '20px', textAlign: 'center'}}>
            <Grid container justify="space-between" style={{backgroundColor: '#eeeeee', padding: '10px', margin: '20px 0'}}>
               { localStudents.map( (student, key) => {
                    return (
                        <React.Fragment key={"frag="+key}>
                             <Grid item key={"name-"+key}>
                             <TextField id={"student-name-"+key} label="Name" defaultValue={student.name} />
                        </Grid>
                        <Grid item key={"grade-"+key}>            
                            <TextField id={"student-grade-"+key} label="Grade" defaultValue={student.grade}/>
                        </Grid>
                        </React.Fragment>
                        )
                    })
               }
            </Grid>
          
            <Button onClick={(e) => addStudent(e)} variant="contained" color="primary">
                <FontAwesomeIcon icon="plus-square" style={{marginRight: '15px'}}></FontAwesomeIcon>
                Add Student
            </Button>
        </Container>
    )
}
