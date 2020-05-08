import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';


// Initial state
const initialState = {
  profileIsSaved: false,
  profileUserType: '',
  profileUserEmail: '',
  profileUserPhoto: '',
  profileUserName: '',
  profileStudents: [],
  showLessonForm: false,
  teachers: [],
  schools: [],
  grades: [],
  subjects: [],
  assignments: [],
  sections: [],
  uniqueClassrooms: [],
  lessonPlans: [],
}

const promises = [];
promises.push(axios.get('http://localhost:8888/parentchecklist/wp-json/wp/v2/teachers'));
promises.push(axios.get('http://localhost:8888/parentchecklist/wp-json/wp/v2/schools'));
promises.push(axios.get('http://localhost:8888/parentchecklist/wp-json/wp/v2/grades'));
promises.push(axios.get('http://localhost:8888/parentchecklist/wp-json/wp/v2/subjects'));
promises.push(axios.get('http://localhost:8888/parentchecklist/wp-json/wp/v2/assignments'));
promises.push(axios.get('http://localhost:8888/parentchecklist/wp-json/parent-checklist/v2/lesson-plans'));

Promise.all(promises).then( res => {

    initialState.teachers =  res[0].data
    initialState.schools =  res[1].data
    initialState.grades =  res[2].data
    initialState.subjects =  res[3].data
    initialState.assignments = res[4].data
    initialState.sections = Object.values(res[5].data.sections)

});


if (localStorage.getItem('parent-checklist_userName')) {
  initialState.profileUserName = localStorage.getItem('parent-checklist_userName');
} 
if (localStorage.getItem('parent-checklist_userEmail')) {
  initialState.profileUserEmail = localStorage.getItem('parent-checklist_userEmail');
}
if (localStorage.getItem('parent-checklist_userPhoto')) {
  initialState.profileUserPhoto = localStorage.getItem('parent-checklist_userPhoto');
}
if (localStorage.getItem('parent-checklist_userType')) {
  initialState.profileUserType = localStorage.getItem('parent-checklist_userType');
}
if (localStorage.getItem('parent-checklist_students')) {
  initialState.profileStudents =  JSON.parse(localStorage.getItem('parent-checklist_students'));
}



// Create context
export const GlobalContext = createContext(initialState);
// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function toggleLessonForm(bool) {
    dispatch({
      type: 'TOGGLE_LESSON_FORM',
      payload: bool
    })
  }

  function setProfileIsSaved(bool) {
    dispatch({
      type: 'SET_USER_TYPE',
      payload: bool
    })
  }

  function setUserType(userType) {
    dispatch({
      type: 'SET_USER_TYPE',
      payload: userType
    })
  }

  function setUserEmail(email) {
    dispatch({
      type: 'SET_USER_EMAIL',
      payload: email
    })
  }

  function setUserPhoto(photoUrl) {
    dispatch({
      type: 'SET_USER_PHOTO',
      payload: photoUrl
    })
  }

  function setUserName(name) {
    dispatch({
      type: 'SET_USER_NAME',
      payload: name
    })
  }

  function deleteStudent(name) {
    dispatch({
      type: 'DELETE_STUDENT',
      payload: name
    })
  }

  function addStudent(name) {
    dispatch({
      type: 'ADD_STUDENT',
      payload: name
    })
  }

  function saveLocalProfile() {
    dispatch({
      type: 'SAVE_LOCAL_PROFILE',
      payload: true
    })
  }

  function setSchools(schools){
    dispatch({
      type: 'SET_SCHOOLS',
      payload: schools
    })
  }

  return (<GlobalContext.Provider value={
    {
      profileIsSaved: state.profileIsSaved,
      profileUserName: state.profileUserName,
      profileUserType: state.profileUserType,
      profileUserEmail: state.profileUserEmail,
      profileUserPhoto: state.profileUserPhoto,
      profileStudents: state.profileStudents,
      schools: state.schools,
      teachers: state.teachers,
      grades: state.grades,
      subjects: state.subjects,
      assignments: state.assignments,
      sections: initialState.sections,
      showLessonForm: state.showLessonForm,
      deleteStudent,
      addStudent,
      setUserType,
      setUserEmail,
      setUserName,
      setUserPhoto,
      setProfileIsSaved,
      saveLocalProfile,
      setSchools,
      toggleLessonForm,
    }
  }>
    {children}
  </GlobalContext.Provider>);
}