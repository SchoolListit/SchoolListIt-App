import React, { useContext, useState, useEffect }  from 'react';
import { FormControl, Typography } from '@material-ui/core';
import { Context } from '../../../Context/Context.js';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import axios from 'axios';



export default function MyGoogleLogin() {
    const [state, setState] = useContext(Context);
    const [authenticated, setAuthenticated] = useState(false);
    const [loginError, setLoginError] = useState(false);


    const googleFail = (response) => {
        setLoginError(true);
        setAuthenticated(false);
      }
    
    const useEffect = ( () => {
        if(authenticated === true){
            //go out to WP; create or retrieve user object
            let password = localStorage.getItem('scholistit-wp-password');
            if(password){
                //do nothing
            } else {
                //create user
                axios.get('http://localhost:8888/parentchecklist/wp-json/parent-checklist-rest/v2/registration')
                    .then( (res) => {
                        const salt = res.data['salt'];
                        console.log(salt);
                        const key = 'aVdG#D.KRFXw)dr!37}BrpkxdQM8N4';
                        console.log(key);
                        //now we have to set up the formdata and send headers, etc

                        
                    });

                


            }
        }

    }, [authenticated, setAuthenticated])
    

    const googleSuccess = (response) => {
        console.log(response)
        let userName = response.profileObj.givenName+ ' '+response.profileObj.familyName;
        const profile = {
            name: userName,
            email: response.profileObj.email,
            photo: response.profileObj.imageUrl,
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
        state.profileIsSaved = true;
        state.loginVerified = true;
        setState(state);
        //localstorage
        localStorage.setItem('scholistit_userEmail', response.profileObj.email);
        localStorage.setItem('scholistit_userName', userName);
        localStorage.setItem('scholistit_userPhoto', response.profileObj.inmageUrl);
        localStorage.setItem('scholistit_loginService', 'google');
            //go out to WP; create or retrieve user object
            let password = localStorage.getItem('scholistit-wp-password');
            const url = 'http://localhost:8888/parentchecklist/wp-json/parent-checklist-rest/v2/registration';
            if(password){
                //do nothing
            } else {
                //create user
                axios.get(url)
                    .then( (res) => {
                        const salt = res.data['salt'];
                        console.log(salt);
                        const key = 'aVdG#D.KRFXw)dr!37}BrpkxdQM8N4';
                        //const authHeader = btoa(salt+"_"+key);
                        const authHeader = salt+"_"+key;
                        console.log(authHeader);
                        //now we have to set up the formdata and send headers, etc
                        //set up form data
                       
                        let formdata = new FormData();
                        let body = profile.wp_creds;
                        const headers = {
                            "X-Scholistit-Auth": authHeader,
                            "Content-Type": "multipart/form-data"
                        }
                        console.log(body);
                        for (const property in body) {
                            formdata.append(property, body[property]);
                        }
                        
                        //make 2nd call
                        axios.post(url, formdata, {headers: headers})
                        .then( (res) => {
                            console.log(res.data);
                        })
                        
                        
                    });
                }
        setAuthenticated(true);
     } 


    return (
        <FormControl margin="normal" fullWidth={true}>
            {/*(authenticated === true) ? <Redirect exact to="/" /> : null*/}
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
