import React, { useState } from 'react';
import axios from 'axios';


export const UserContext = React.createContext();

export function UserController({children}){

    /**
     * Generic function to check two objects and thier properties are fully equal
     * @param {*} a 
     * @param {*} b 
     */

    const objsEqual = (a, b) => {
        delete a.key;
        delete b.key;
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

    /**
     * we set the initial state which can be mutated through userProvider
     * for now, we will leave it empty...I will come back and add as I need
     */
    let initialUser = {
        lat: '',
        lng: '',
        userID: '',
        email: '',
        wpUserObj: {},
        userType: '',
        userEmail: '',
        userPhoto: '',
        userName: '',
        userLanguage: '',
        Students: [],
        nearbySchools: [],
        initialChecked: null,
        gp_key: '',
    };

    const [userState, setUserState] = useState(initialUser);

    /**
     * returns provider
     * the user data from DB and then a function by which to update the userdata state
     */
    return (
        <UserContext.Provider value={[userState, setUserState]}>{children}</UserContext.Provider>
    )

}