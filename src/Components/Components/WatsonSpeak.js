import React, {useState} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';

export default function WatsonSpeak( {title, excerpt} ) {


    const speakToMe = (title, excerpt) =>{
        let url = 'https://schoolistit.com/wp-json/schoolistit/v2/text-to-speech';
        let formdata = new FormData();
        let body = {
            text: title+ ". " + excerpt
        }
        for (const property in body) {
            formdata.append(property, body[property]);
        }
        axios.post( url, formdata ).then( res => {
            let a = new Audio(res.data.filepath);
            a.play();
        })
     }

    return (
        <React.Fragment>
            <Typography variant="body2" style={{color: '#bdbdbd'}}>
                <FontAwesomeIcon icon="volume-up" onClick={(e) => speakToMe(title, excerpt)}>
                </FontAwesomeIcon>
            </Typography>
        </React.Fragment>
    )
}
