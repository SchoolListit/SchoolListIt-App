import React, { useContext }  from 'react';
import { FormControl } from '@material-ui/core';
import { Context } from '../../../Context/Context.js';
import GoogleLogin from 'react-google-login';


export default function MyGoogleLogin() {
    const [state, setState] = useContext(Context);
    const { profileIsSaved, loginVerified, profileUserEmail, profileUserName, profileUserPhoto  } = state;

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
     } 


    return (
        <FormControl margin="normal" fullWidth={true}>
            <GoogleLogin
                clientId="988354227304-sejkrfpe009ppkkm8qpefdq7ldoude0g.apps.googleusercontent.com"
                onSuccess={googleSuccess}
                onFailure={googleFail}
            />
        </FormControl>
    )
   
    
}
