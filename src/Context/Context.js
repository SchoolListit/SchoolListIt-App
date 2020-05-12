import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const Context = React.createContext();

export function ContextController({children}){

    // Initial state
    let initialState = {
        profileIsSaved: false,
        loginVerified: false,
        profileUserType: '',
        profileUserEmail: '',
        profileUserPhoto: '',
        profileUserName: '',
        profileStudents: [],
        teachers: [],
        schools: [],
        grades: [],
        subjects: [],
        assignments: [],
        sections: [],
     }

     if (localStorage.getItem('scholistit_userName')) {
        initialState.profileUserName = localStorage.getItem('scholistit_userName');
      } 
      if (localStorage.getItem('scholistit_userEmail')) {
        initialState.profileUserEmail = localStorage.getItem('scholistit_userEmail');
      }
      if (localStorage.getItem('scholistit_userPhoto')) {
        initialState.profileUserPhoto = localStorage.getItem('scholistit_userPhoto');
      }
      if (localStorage.getItem('scholistit_userType')) {
        initialState.profileUserType = localStorage.getItem('scholistit_userType');
      }
      if (localStorage.getItem('scholistit_students')) {
        initialState.profileStudents =  JSON.parse(localStorage.getItem('scholistit_students'));
      }

     //set the initial state into a use State
     const [state, setState] = useState(initialState);

     useEffect ( () => {

        //go out to the api
        const promises = [];
        promises.push(axios.get('http://localhost:8888/parentchecklist/wp-json/wp/v2/teachers'));
        promises.push(axios.get('http://localhost:8888/parentchecklist/wp-json/wp/v2/schools'));
        promises.push(axios.get('http://localhost:8888/parentchecklist/wp-json/wp/v2/grades'));
        promises.push(axios.get('http://localhost:8888/parentchecklist/wp-json/wp/v2/subjects'));
        promises.push(axios.get('http://localhost:8888/parentchecklist/wp-json/parent-checklist/v2/lesson-plans'));

        Promise.all(promises).then( res => {

            let teachers =  res[0].data
            let schools =  res[1].data
            let grades =  res[2].data
            let subjects =  res[3].data
            let sections = Object.values(res[4].data.sections);

            setState( {
                schools: schools,
                teachers: teachers,
                grades: grades,
                subjects: subjects,
                sections: sections,
                profileIsSaved: false,
                loginVerified: false,
                profileUserType: '',
                profileUserEmail: '',
                profileUserPhoto: '',
                profileUserName: '',
                profileStudents: [],
            })

            

        });

     }, []);


    return(
        <Context.Provider value={[state, setState]}>{children}</Context.Provider>
    )

}










