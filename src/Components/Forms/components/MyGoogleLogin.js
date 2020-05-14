import React, { useContext, useState, useEffect }  from 'react';
import { FormControl, Typography } from '@material-ui/core';
import { Context } from '../../../Context/Context.js';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import axios from 'axios';



export default function MyGoogleLogin() {
    const [state, setState, profileIsSaved, wpUserObj] = useContext(Context);
    const [authenticated, setAuthenticated] = useState(false);
    const [loginError, setLoginError] = useState(false);


    const googleFail = (response) => {
        setLoginError(true);
        setAuthenticated(false);
      }
    
    const googleSuccess = (response) => {
        let userName = response.profileObj.givenName+ ' '+response.profileObj.familyName;
        const profile = {
            name: userName,
            email: response.profileObj.email,
            photo: response.profileObj.imageUrl,
            loginService: 'google',
            wp_creds: {
                username: userName.replace(' ', '_'),
                email: response.profileObj.email,
                password: response.tokenObj.access_token
            }
        }
        //context
        state.profileUserName = profile.name;
        state.profileUserEmail = profile.email;
        state.profileUserPhoto = profile.photo;
        state.profile = profile;
        state.loginVerified = true;
        setState(state);
        //localstorage
    
        const url = 'http://localhost:8888/parentchecklist/wp-json/parent-checklist-rest/v2/registration';
        //create user
        axios.get(url)
            .then( (res) => {
                const salt = res.data['salt'];
                const key = 'aVdG#D.KRFXw)dr!37}BrpkxdQM8N4';
                //const authHeader = btoa(salt+"_"+key);
                const authHeader = salt+"_"+key;
                //now we have to set up the formdata and send headers, etc
                //set up form data
                let formdata = new FormData();
                let body = profile.wp_creds;
                const headers = {
                    "X-Scholistit-Auth": authHeader,
                    "Content-Type": "multipart/form-data"
                }
                for (const property in body) {
                    formdata.append(property, body[property]);
                }
                //make 2nd call
                axios.post(url, formdata, {headers: headers})
                .then( (res) => {
                    state.wpUserObj = res.data.user;
                    setState(state);
                    profile.wpUserObj = state.wpUserObj;
                })
            });
        //end the whole call to wp for user
        localStorage.setItem('scholistit_profile', JSON.stringify(profile));
        setAuthenticated(true);
     } 


    return (
        <FormControl margin="normal" fullWidth={true}>
            { (authenticated === true) ? <Redirect exact to="/" /> : null }
            <GoogleLogin
                clientId="988354227304-sejkrfpe009ppkkm8qpefdq7ldoude0g.apps.googleusercontent.com"
                onSuccess={googleSuccess}
                onFailure={googleFail}
            />
            {(loginError=== true) 
            ?  <div>
                    <Typography variant="h6">Oops! Google was unable to verify.</Typography>
                    <Typography>Please try again</Typography> 
                </div>
            : null}

        </FormControl>
    )
   
    
}
