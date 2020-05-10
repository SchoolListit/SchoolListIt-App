import React, { useContext }  from 'react';
import FacebookLogin from 'react-facebook-login';
import { FormControl } from '@material-ui/core';
import { Context } from '../../../Context/Context.js';


export default function MyFacebookLogin() {
    const appid = 228797151743404;
    const [state, setState] = useContext(Context);
    const { loginVerified, profileIsSaved} = state;


    const responseFacebook = (response) => {
        
            console.log(response);
        
      }
    const componentClicked = () => {

    }

     
    
    return (
        <FormControl margin="normal" fullWidth={true}>
            <FacebookLogin
            appId={appid}
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
            onClick={componentClicked} />
        </FormControl>
    )
}
