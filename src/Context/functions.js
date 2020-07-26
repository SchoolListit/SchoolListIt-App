import React from 'react';
import axios from 'axios';

export const objsEqual = (a, b) => {

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

export const isFollowed = ((followingSections, thisSection) => {
    let fewer = followingSections.some( theFollowedSection => 
        objsEqual(theFollowedSection, thisSection) );
    return fewer;
})


export const searchSections = ((sections, search) => {
    
    let fewer = sections.filter( section => 
            section.teachers === search ||
            section.schools === search ||
            section.subjects === search
        )
        return fewer;   
    
})

/**
 * checks empty array for null, undefined, length >0
 */
export const emptyArray = ((theArray) => {

    if(typeof theArray === 'undefined' ){
        console.log('undefined');
        return true;
    } else {
        if(theArray.isArray && theArray.length > 0){
            console.log('is an array');
            return false;
        }
    }
})

/**
 * Send content to WP, get back response
 */

 export const postContent = (postID, JSON_blocks) => {
    let  url = "https://schoolistit.com/wp-json/schoolistit-rest/v2/post-content";
    let body = {
        post_id: postID,
        blocks: JSON_blocks
    }
    console.log(body);
    /*
     //create post
     axios.get(url, body)
     .then( (res) => {
         const salt = res.data['salt'];
         const key = 'aVdG#D.KRFXw)dr!37}BrpkxdQM8N4';
         //const authHeader = btoa(salt+"_"+key);
         const authHeader = salt+"_"+key;
         //now we have to set up the formdata and send headers, etc
         //set up form data
         let formdata = new FormData();                     
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
            console.log(res.data);
         })
     });
    */
 }

 export const translateGutenBlocks = (postID) => {
    
 }




