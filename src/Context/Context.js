import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const Context = React.createContext();

export function ContextController({children}){

    // Initial state
    let initialState = {
        profileIsSaved: false,
        loginVerified: false,
        wpUserObj: {},
        profileUserType: '',
        profileUserEmail: '',
        profileUserPhoto: '',
        profileUserName: '',
        profileStudents: [],
        profile: {},
        teachers: [],
        schools: [],
        grades: [],
        subjects: [],
        assignments: [],
        sections: [],
        currentAssignment: ''
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
        promises.push(axios.get('http://localhost:8888/parentchecklist/wp-json/wp/v2/assignments'));


        Promise.all(promises).then( res => {

            let teachers =  res[0].data
            let schools =  res[1].data
            let grades =  res[2].data
            let subjects =  res[3].data
            let sections = Object.values(res[4].data.sections);
            let assignments = res[5].data;
            let profileStudents = [];

            if (localStorage.getItem('scholistit_students')) {
              profileStudents =  JSON.parse(localStorage.getItem('scholistit_students'));
            } 
            let profile = {};
            if (localStorage.getItem('scholistit_profile')) {
              profile =  JSON.parse(localStorage.getItem('scholistit_profile'));
            } 

            setState( {
                schools: schools,
                teachers: teachers,
                grades: grades,
                subjects: subjects,
                sections: sections,
                assignments: assignments,
                currentAssignment: '',
                profileIsSaved: false,
                loginVerified: false,
                wpUserObj: {},
                profileUserType: '',
                profileUserEmail: '',
                profileUserPhoto: '',
                profileUserName: '',
                profileStudents: profileStudents,
                profile: profile
            })

            

        });

     }, []);


    return(
        <Context.Provider value={[state, setState]}>{children}</Context.Provider>
    )

}










