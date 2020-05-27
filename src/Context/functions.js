import React from 'react'

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
