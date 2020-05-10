import React, { useContext }  from 'react';
import { FormControl } from '@material-ui/core';
import { Context } from '../../../Context/Context.js';
import GoogleLogin from 'react-google-login';


export default function MyGoogleLogin() {
    const [state, setState] = useContext(Context);
    const { profileIsSaved, loginVerified  } = state;

    const googleFail = (response) => {
        console.log(response);
      }
    

    const googleSuccess = (response) => {
        let userName = response.profileObj.givenName+ ' '+response.profileObj.familyName;
        setState( {
            profileUserEmail: response.profileObj.email,
            profileUserPhoto: response.profileObj.imageUrl,
            profileUserName: response.userName,
            loginVerified: true,
        });
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
