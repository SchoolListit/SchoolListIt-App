import React, {useContext, useState} from 'react';
import {UserContext} from '../../Context/UserContext.js';
import { Container, Typography, Grid,  } from '@material-ui/core';
import SelectSimple from './SelectSimple.js';


export default function AboutYou( {setProfileStep}) {
    const [userState, setUserState] = useContext(UserContext);
    const [userType, setUserType] = useState('');

    /**
     * Passed down to the composite SelectSimple
     * select simple passes back up the new value and we update context
     */
    const handleChange = (e) =>{
        setUserType(e.target.value);
        let newUserState = userState;
        newUserState.userType = e.target.value;
        setUserState(newUserState);
    }

    /**
     * @param MenuItems array of objects
     * each object to have itemValue and itemDescription which create the select option value and label
     */
    const menuItems = [
        {
            itemValue: 'learner',
            itemDescription: 'Learner'
        },
        {
            itemValue: 'teacher',
            itemDescription: 'Teacher'
        },
        {
            itemValue: 'helper',
            itemDescription: 'Helper'
        },
        {
            itemValue: 'student',
            itemDescription: 'Student'
        },

    ];

   
        return (
            <Container 
                fixed={true} 
                maxWidth={false}
                style={{height: '100vh', padding: '80px 0'}}
                >
                <Grid container  justify="center" alignContent="center" alignItems="center" style={{height: '100%'}}>
                    <Grid item  >
                            <Typography variant="h2" style={{fontWeight: '700', textAlign: 'center'}}>About You</Typography>
                            <Typography variant="h3" style={{textAlign: 'center'}}>we are all learners</Typography>
                            <Typography variant="h5" style={{marginTop: '20px', textAlign: 'center'}}>Are you a teacher or </Typography>
                            <Typography variant="h5" style={{textAlign: 'center'}}>helping a student stay on track?</Typography> 
                            <SelectSimple
                            handleChange={handleChange}
                            selectID="user-type"
                            selectValue={userType}
                            label="Your Role"
                            labelID="user-type"
                            menuItems={menuItems}
                        ></SelectSimple>
                    </Grid>
                </Grid>
            </Container>
        )
    } 