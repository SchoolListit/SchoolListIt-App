import React, { useState} from 'react';
import { Grid, Button, FormControlLabel, Checkbox } from '@material-ui/core';


export default function ChallengeCheckboxes( {setChallenges, challenges} ) {
    const [yourChallenges, setYourChallenges] = useState(challenges);

    const onCheck = (e, key, checked) => {
        //update local state
        let newYourChallenges = yourChallenges;
        newYourChallenges[key].checked =  !checked;  
        setYourChallenges(newYourChallenges); 
    }

    const saveUserState = (yourChallenges, setChallenges) => {
        setChallenges(yourChallenges);
    }

    const onAllDone = (e) => {
        console.log(yourChallenges);
    }

    const distinct = (value, index, self) => { 
        return self.indexOf(value) === index;
    }

    return (
        <React.Fragment>
             <Grid container  direction="column-reverse" justify="flex-end" alignContent="center"  style={{width: '100%', height: '220px', margin: '0 auto'}}>
                {yourChallenges.map( (challenge, key) => {
                    return (
                            <Grid item key={key}>
                                <FormControlLabel key={key}
                                    control={<Checkbox key={key} onChange={(e) => onCheck(e, key, challenge.chcked)} value={challenge.value} />}
                                    label={challenge.description}
                                />
                            </Grid>
                    )
                })}
            </Grid>
            <Button 
                style={{marginTop: '50px'}}
                variant="contained" 
                color="primary" 
                onClick={(e) => saveUserState(yourChallenges, setChallenges)}
                >Save Challenges</Button>
        </React.Fragment>
    )
}
