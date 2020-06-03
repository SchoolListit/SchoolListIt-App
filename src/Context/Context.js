import React, { useState, useEffect } from 'react';
import {emptyArray} from './functions.js';
import axios from 'axios';


export const Context = React.createContext();

export function ContextController({children}){

    const objsEqual = (a, b) => {
        delete a.key;
        delete b.key;
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
        if (aProps.length != bProps.length) {
            return false;
        }
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
    }
    
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
        following: [],
        profile: [],
        teachers: [],
        schools: [],
        grades: [],
        subjects: [],
        assignments: [],
        sections: [],
        currentAssignment: '',
        objsEqual
     }

     //set the initial state into a use State
     const [state, setState] = useState(initialState);

     useEffect ( () => {
        
        
        //go out to the api
        const promises = [];
        let params = {
            per_page: 100,
            orderby: 'count',
            order: 'desc'
        }
        //MEGDO: need to loop through paginated results as this thing grows...here we are only getting the first page. which is BAD
        promises.push(axios.get('http://schoolistit.com/wp-json/wp/v2/teachers', {params: params}));
        promises.push(axios.get('http://schoolistit.com/wp-json/wp/v2/schools', {params: params}));
        promises.push(axios.get('http://schoolistit.com/wp-json/wp/v2/grades', {params: params}));
        promises.push(axios.get('http://schoolistit.com/wp-json/wp/v2/subjects', {params: params}));
        promises.push(axios.get('http://schoolistit.com/wp-json/schoolistit/v2/lesson-plans'));
        let localProfile;
        if(localStorage.getItem('scholistit_profile')){
            localProfile = JSON.parse(localStorage.getItem('scholistit_profile'));
            const {userID} = localProfile;
            if(userID !== 'undefined'){
                promises.push(axios.get('http://schoolistit.com/wp-json/schoolistit/v2/follows?userID='+userID));
            }
        }
        //promises.push(axios.get('http://schoolistit.com/wp-json/schoolistit/v2/follows?userID='+userID));

        //promises.push(axios.get('http://schoolistit.com/wp-json/wp/v2/assignments'));
        /*if(formdata !== 'undefined') {
            promises.push(axios.post('http://schoolistit.com/wp-json/schoolistit-rest/v2/user_data', formdata))
        }*/
    
        Promise.all(promises).then( res => {
            let dbfollowing = [];
            if(typeof res[5] !== 'undefined'){
                dbfollowing = res[5].data;
            } 
            let teachers =  res[0].data
            let schools =  res[1].data
            let grades =  res[2].data
            let subjects =  res[3].data
            let sections = Object.values(res[4].data.sections);
            let profile = localProfile;
            let following = dbfollowing;
             
            
            //let assignments = res[5].data;
            //let initialChecked = res[6].data; 
            
            setState( {
                schools: schools,
                teachers: teachers,
                grades: grades,
                subjects: subjects,
                sections: sections,
                initialChecked: null,
                profileIsSaved: false,
                loginVerified: false,
                profile: profile,
                following: following
            })

        });

     }, []);


    return(
        <Context.Provider value={[state, setState]}>{children}</Context.Provider>
    )

}










