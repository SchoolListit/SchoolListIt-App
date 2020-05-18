import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const Context = React.createContext();

export function ContextController({children}){

    
    let profile;
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
        initialChecked: null,
        profile: profile,
        teachers: [],
        schools: [],
        grades: [],
        subjects: [],
        assignments: [],
        sections: [],
        currentAssignment: '',
     }

     //set the initial state into a use State
     const [state, setState] = useState(initialState);

     useEffect ( () => {
        let profile = initialState.profile;
            if (localStorage.getItem('scholistit_profile')) {
              profile =  JSON.parse(localStorage.getItem('scholistit_profile'));
            }
        let body = {
            user_id: profile.wpUserObj.user.ID,
        } 
        let formdata = new FormData();   
        for (const property in body) {
            formdata.append(property, body[property]);
        }
        //go out to the api
        const promises = [];
        promises.push(axios.get('http://localhost:8888/parentchecklist/wp-json/wp/v2/teachers'));
        promises.push(axios.get('http://localhost:8888/parentchecklist/wp-json/wp/v2/schools'));
        promises.push(axios.get('http://localhost:8888/parentchecklist/wp-json/wp/v2/grades'));
        promises.push(axios.get('http://localhost:8888/parentchecklist/wp-json/wp/v2/subjects'));
        promises.push(axios.get('http://localhost:8888/parentchecklist/wp-json/parent-checklist/v2/lesson-plans'));
        promises.push(axios.get('http://localhost:8888/parentchecklist/wp-json/wp/v2/assignments'));
        promises.push(axios.post('http://localhost:8888/parentchecklist/wp-json/parent-checklist-rest/v2/user_data', formdata));
    
        Promise.all(promises).then( res => {

            let teachers =  res[0].data
            let schools =  res[1].data
            let grades =  res[2].data
            let subjects =  res[3].data
            let sections = Object.values(res[4].data.sections);
            let assignments = res[5].data;
            let initialChecked = res[6].data;

            let profileStudents = initialState.profileStudents;
            if (localStorage.getItem('scholistit_students')) {
               profileStudents =  JSON.parse(localStorage.getItem('scholistit_students'));
            } 
            
            setState( {
                schools: schools,
                teachers: teachers,
                grades: grades,
                subjects: subjects,
                sections: sections,
                assignments: assignments,
                initialChecked: initialChecked,
                currentAssignment: '',
                profileIsSaved: false,
                loginVerified: false,
                wpUserObj: {},
                profileUserType: '',
                profileUserEmail: '',
                profileUserPhoto: '',
                profileUserName: '',
                profileStudents: profileStudents,
                profile: profile,
            })

        });

     }, [initialState.profile]);


    return(
        <Context.Provider value={[state, setState]}>{children}</Context.Provider>
    )

}










