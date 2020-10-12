import React, { useContext, useState, useEffect }  from 'react';
import { FormControl, Typography } from '@material-ui/core';
import { Context } from '../../../Context/Context.js';
import GoogleLogin from 'react-google-login';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';



export default function MyGoogleLogin() {
    const [state, setState] = useContext(Context);
    const [authenticated, setAuthenticated] = useState(false);
    const [loginError, setLoginError] = useState(false);
    let history = useHistory();


    const googleFail = (response) => {
        setLoginError(true);
        setAuthenticated(false);
      }
    
    const googleSuccess = (response) => {
        let userName = response.profileObj.givenName+'_'+response.profileObj.familyName;
        let students = JSON.parse(localStorage.getItem('scholistit-profileStudents'));
        let userType = localStorage.getItem('scholistit_userType');
        const profile = {
            name: userName,
            email: response.profileObj.email,
            photo: response.profileObj.imageUrl,
            loginService: 'google',
            wp_creds: {
                username: userName,
                email: response.profileObj.email,
                password: response.tokenObj.access_token,
                photo: response.profileObj.imageUrl,
                students: JSON.stringify(students),
                userType: userType
            },
            students: students
        }
        localStorage.setItem('scholistit_profile', JSON.stringify(profile));
    
        const url = 'https://schoolistit.com/wp-json/schoolistit-rest/v2/registration';
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
                    localStorage.setItem('scholistit_profile', JSON.stringify(res.data));
                    console.log(res.data)
                    state.profile = res.data;
                    setState(state);
                    //console.log('authenticated - should redirect and reinitialize');
                    history.push('/');
                })
            });
     } 

     const sendToLogin = () => {
         history.push('/sign-in/');
     }


    return (
        <FormControl margin="normal" fullWidth={true}>
            { (authenticated === true) ? <React.Fragment>{sendToLogin()}</React.Fragment> : null }
            <GoogleLogin
                clientId="488169268087-678v3m5p50kpfnu4sr83ip4usdr6s14g.apps.googleusercontent.com"
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
