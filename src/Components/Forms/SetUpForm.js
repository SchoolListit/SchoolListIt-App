import React, { useContext, useState }  from 'react';
import {Context} from '../../Context/Context.js';
import { FormControl, Dialog, DialogTitle, Button, TextField, Select, FormHelperText, MenuItem, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(() => ({
  dialogPaper: {
    padding: '10px',
    width: '100%'
  }
}));//make styles

export default function SetUpForm () {
    //contect
    const classes = useStyles();
    const [state, setState] = useContext(Context);
    const { profileUserType, profileStudents } = state; 
    //local state
    const [dialogOpen, setDialogOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [localStudents, setLocalStudents] = useState([]);




    const onSelectUserType = (event) => {
        setState({
          profileUserType: event.target.value
        })
        localStorage.setItem('scholistit_userType', event.target.value)
      }; 
     
     const openDialog = () => {
        setDialogOpen(true);        
     } 

     const grades = [
       'Pre-K', 'K', '1st', '2nd', '3rd', '4th', 
       '5th', '6th', '7th', '8th', '9th',
       '10th', '11th', '12th', 'Undergraduate', 'Graduate'
     ]

     const onEntered = () => {
       console.log(localStudents)
     }

     const onEntering = () => {
      console.log(profileStudents)
     }

     const saveStudent = () => {
      //save student
      let student = {
        name: document.getElementById('add-student').value,
        grade: document.getElementById('grade').value
      }
      console.log(localStudents);
      ////in state, in context, and local storage
     /* setState({
        profileStudents: state.profileStudents.push(student)
      })*/
      //localStorage.setItem('scholistit-profileStudents', JSON.stringify(profileStudents))
   }
    
    return (
        <React.Fragment>
          <FormControl margin="normal" fullWidth={true}>
            <Select
              labelId="userType"
              id="userType"
              value={profileUserType}
              onChange={onSelectUserType}
              >
              <MenuItem value="parent">Parent</MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </Select>
            <FormHelperText>parent, student, teacher</FormHelperText>
          </FormControl> 
          <Button color="primary"  onClick={openDialog}>
              <FontAwesomeIcon icon="plus-square" > 
          </FontAwesomeIcon> Add Student </Button>
          <Dialog open={dialogOpen} keepMounted={true} onEntered={onEntered} PaperProps={{className: classes.dialogPaper, grades: grades}}>
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
