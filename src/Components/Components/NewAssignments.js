import React from 'react';
import TheAssignment from '../Components/TheAssignment.js';


export default function NewAssignments( props ) {

    const { post, onClickAssignment, section } = props;
    const { userID } = JSON.parse(localStorage.getItem('scholistit_profile'));


    const objsEqual = (a, b) => {
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

    const show = (post, section) => {
        if(post === ""){
            return false;
        }
        if(post.complete === 'undefined'){
            return false;
        }
        if(post.section !== 'undefined' && objsEqual(section, post.section) === false){
            return false;
        }
        return true;
    }
    
    
    if(show(post, section) === false){
        return null
    } else {
        return (
            <React.Fragment key={"fragment"+post.ID}>
                <TheAssignment key={post.ID} section={section} post={post} userID={userID} onClickAssignment={onClickAssignment}></TheAssignment>
            </React.Fragment>
        )
    }
    
}
