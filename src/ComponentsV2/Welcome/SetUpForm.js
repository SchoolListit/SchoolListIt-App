import React, { useState }  from 'react';
import { Grid, Dialog, DialogTitle, Button, TextField, DialogActions, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(() => ({
  dialogPaper: {
    padding: '10px',
    width: '100%'
  }
}));//make styles

export default function SetUpForm ( {userState, setUserState, setContentState}) {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [localStudents, setLocalStudents] = useState([]);
    

     const grades = [
       'Pre-K', 'K', '1st', '2nd', '3rd', '4th', 
       '5th', '6th', '7th', '8th', '9th',
       '10th', '11th', '12th', 'Undergraduate', 'Graduate'
     ]

    const openDialog = () => {
        setDialogOpen(true);        
      } 

    const closeDialog = () => {
          setDialogOpen(false);        
      }

    const saveStudent = () => {
      //save student
      let student = {
        name: document.getElementById('add-student').value,
        grade: document.getElementById('grade').value
      }
      localStudents.push(student);
      let students = localStudents.filter( student => student.name !== '');
      setLocalStudents(students)
      //clear form
      document.getElementById('add-student').value = ''
      document.getElementById('grade').value = ''
      closeDialog();
      localStorage.setItem('scholistit-profileStudents', JSON.stringify(localStudents))
    }

    const saveStudents = () => {
       let newlocalState =  userState;
       newlocalState.students = localStudents;
       setUserState(newlocalState);
       setContentState('FindingSchools');
    }

    const studentContent = () => {
          return (
          <div>
            <Typography variant="h6" >Students</Typography>
            {localStudents.map( (student, index) => {
                  return (
                  <Typography key={"student-"+index}>{student.name+" "+student.grade}</Typography>
                  ) 
              })}
         </div>
         )
    }
    
    return (
        <React.Fragment>
            <Grid 
            container
            alignItems="center" 
            alignContent="center"
            justify="center"
            >
                <Grid 
                    item
                    container 
                    alignItems="center" 
                    alignContent="center"
                    justify="center"
                    style={{backgroundColor: '#ffffff', marginTop: '20px'}}
                    >
                    <Grid item>
                        {studentContent()}
                    </Grid>
                    <Grid item >
                        <Button color="primary"  onClick={openDialog}> 
                            <FontAwesomeIcon icon="plus-square" style={{marginRight: '15px'}}></FontAwesomeIcon>
                        </Button>
                    </Grid>
                </Grid>
            
            <Grid item>
                 {/**
                 * This button does two things
                 * -- updates the usercontext up the tree
                 * -- sets the state to make this component move forward to the next step.
                 */}
                <Button 
                color="primary" 
                variant="contained" 
                onClick={(e) => saveStudents(e)}
                style={{marginTop: '20px'}}
                >Save Students
                </Button>
            </Grid>
               
            </Grid>
            {/**
             * Below here is what opens in the dialog box to add the students. 
             * TODO: pull this into a standalone component. It is a little too much here.
             */}
          <Dialog open={dialogOpen} onClose={closeDialog} keepMounted={true} PaperProps={{className: classes.dialogPaper, grades: grades}}>
            <DialogTitle>Add Student</DialogTitle>
            <TextField 
                fullWidth={true}
                required 
                id='add-student'
                name='add-student'
                label="Student's Name"
                helperText="Add Student to your profile"  
            ></TextField> 
            <React.Fragment>
              <Autocomplete
                  fullWidth={true}
                  id="grade"
                  freeSolo
                  options={grades.map((option) => option)}
                  renderInput={(params) => (
                  <TextField {...params} label="grade" margin="normal" />
                  )}
              /> 
            </React.Fragment>
            <DialogActions>
              <Button onClick={saveStudent} color="primary">
                Save to profile
              </Button>
            </DialogActions>
          </Dialog>
         
        </React.Fragment>
    )
}
