import React, { useContext, useState }  from 'react';
import { FormControl } from '@material-ui/core';
import { Context } from '../../../Context/Context.js';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';



export default function MyGoogleLogin() {
    const [state, setState] = useContext(Context);
    const [authenticated, setAuthenticated] = useState(false);

    const googleFail = (response) => {
        console.log(response);
      }
    

    const googleSuccess = (response) => {
        console.log(response)
        let userName = response.profileObj.givenName+ ' '+response.profileObj.familyName;
        const profile = {
            name: userName,
            email: response.profileObj.email,
            photo: response.profileObj.imageUrl
        }
        //context
        state.profileUserName = profile.name;
        state.profileUserEmail = profile.email;
        state.profileUserPhoto = profile.photo;
        state.profile = profile;
        state.profileIsSaved = true;
        setState(state);
        //localstorage
        localStorage.setItem('scholistit_userEmail', response.profileObj.email);
        localStorage.setItem('scholistit_userName', userName);
        localStorage.setItem('scholistit_userPhoto', response.profileObj.inmageUrl);
        localStorage.setItem('scholistit_loginService', 'google');
        setAuthenticated(true);
     } 


    return (
        <FormControl margin="normal" fullWidth={true}>
            <GoogleLogin
                clientId="988354227304-sejkrfpe009ppkkm8qpefdq7ldoude0g.apps.googleusercontent.com"
                onSuccess={googleSuccess}
                onFailure={googleFail}
            />
            {(authenticated === true) ? <Redirect exact to="/" /> : null}
        </FormControl>
    )
   
    
}
