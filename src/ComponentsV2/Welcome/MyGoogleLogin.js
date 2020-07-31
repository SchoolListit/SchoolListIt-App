import React, { useContext, useState }  from 'react';
import {UserContext} from '../../Context/UserContext.js';
import { FormControl, Typography, Container } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import axios from 'axios';



export default function MyGoogleLogin( {userState, setUserState, setContentState} ) {
    const [authenticated, setAuthenticated] = useState('false');
    const [loginError, setLoginError] = useState('false');
    const [details, setDetails] = useState('');


    const googleFail = (response) => {
        console.log(response);
        setDetails(response.details);
        alert("Google cannot sign on because "+response.details);
        setLoginError(true);
        setAuthenticated(false);
      }
    
    const googleSuccess = (response) => {
        let userName = response.profileObj.givenName+'_'+response.profileObj.familyName;
        let newUserState = userState;
        newUserState.userEmail = response.profileObj.email;
        newUserState.userPhoto = response.profileObj.imageUrl;
        newUserState.userName = userName;
        newUserState.userLoginService = 'google';
        setUserState(newUserState);
        wpLogon(response.tokenObj.access_token);
     } 

    const wpLogon = (token) => {
        let wpCreds = {
            username: userState.userName,
            email: userState.userEmail,
            password: token,
            photo: userState.userPhoto
        };
        const url = 'https://schoolistit.com/wp-json/schoolistit-rest/v2/registration';
        //create user
        axios.get(url)
            .then( (res) => {
                const salt = res.data['salt'];
                const key = 'aVdG#D.KRFXw)dr!37}BrpkxdQM8N4';
                //const authHeader = btoa(salt+"_"+key);
                const authHeader = salt+"_"+key;
                let formdata = new FormData();
                const headers = {
                    "X-Scholistit-Auth": authHeader,
                    "Content-Type": "multipart/form-data"
                }
                for (const property in wpCreds) {
                    formdata.append(property, wpCreds[property]);
                }
                //make 2nd call
                axios.post(url, formdata, {headers: headers})
                .then( (res) => {
                    let newUserState = userState;
                    newUserState.wpUserObj = res.data;
                    newUserState.following = res.data.following;
                    newUserState.userID = res.data.user.ID;
                    setUserState(newUserState);
                    if(userState.firstTime === 'true'){
                        setContentState('AboutYou');
                    } else {
                        setContentState('home')
                    }
                });
            });
    }
    if(setAuthenticated === 'true'){
        return null;
    } else {
        return (
            <Container style={{padding: '30px', textAlign: 'center'}}>
                 <FormControl margin="none" >
                <GoogleLogin
                    clientId="488169268087-678v3m5p50kpfnu4sr83ip4usdr6s14g.apps.googleusercontent.com"
                    onSuccess={googleSuccess}
                    onFailure={googleFail}
                />
                {(loginError=== true) 
                ?       
                <React.Fragment>
                    <Typography variant="h6">Google cannot sign on</Typography>
                    <div style={{overflowWrap: 'break-word'}}>
                        <Typography variant="caption" >{details} 
                        </Typography>
                    </div>
                    
                </React.Fragment>
                : null}
            </FormControl>
            </Container>
        )
    }   
}
