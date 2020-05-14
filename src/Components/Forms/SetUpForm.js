import React, { useContext, useState }  from 'react';
import {Context} from '../../Context/Context.js';
import { FormControl, Dialog, DialogTitle, Button, TextField, Select, FormHelperText, MenuItem, DialogActions, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MyGoogleLogin from './components/MyGoogleLogin.js';

const useStyles = makeStyles(() => ({
  dialogPaper: {
    padding: '10px',
    width: '100%'
  }
}));//make styles

export default function SetUpForm () {
    //context
    const classes = useStyles();
    const [state, setState] = useContext(Context);
    const { profileUserType } = state; 
    //local state
    const [dialogOpen, setDialogOpen] = useState(false);
    const [localStudents, setLocalStudents] = useState([]);
    


    const onSelectUserType = (event) => {
        let usertype = event.target.value
        setState({
          ...state,
          profileUserType: usertype
        })
        localStudents.push({name: "", grade: ""})
        setLocalStudents(localStudents)
        localStorage.setItem('scholistit_userType', event.target.value)
        localStorage.setItem('scholistit_students', JSON.stringify(localStudents))

      }; 

     const grades = [
       'Pre-K', 'K', '1st', '2nd', '3rd', '4th', 
       '5th', '6th', '7th', '8th', '9th',
       '10th', '11th', '12th', 'Undergraduate', 'Graduate'
     ]

    const openDialog = () => {
        state.profileStudents = localStudents;
        setState(state)
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
      //localStorage.setItem('scholistit-profileStudents', JSON.stringify(profileStudents))
    }

    const studentContent = () => {
      if(profileUserType !== 'parent'){
        return null
      } else {
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
    }
    
    return (
        <React.Fragment>
          <FormControl margin="normal" fullWidth={true}>
            <Select
              labelId="userType"
              id="userType"
              value={profileUserType || ''}
              onChange={onSelectUserType}
              >
              <MenuItem value="parent">Parent</MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </Select>
            <FormHelperText>parent, student, teacher</FormHelperText>
          </FormControl> 
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {studentContent()}
            { (profileUserType === 'parent') 
              ? <Button color="primary"  onClick={openDialog}> 
                    <FontAwesomeIcon icon="plus-square" style={{marginRight: '15px'}}> 
                </FontAwesomeIcon></Button>
              : null 
            } 
          </div>
           
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
          {(profileUserType !== '') ? <MyGoogleLogin></MyGoogleLogin>: null}
         
        </React.Fragment>
    )
}
