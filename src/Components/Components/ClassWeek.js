import React, { useState, useContext } from 'react';
import moment from 'moment';
import { Grid, Typography, TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Context } from '../../Context/Context.js';
import DailyWork from './../Components/DailyWork.js';
import ListActions from '../Components/ListActions.js';






export default function ClassWeek( {section, week, changeTheDate, newPost} ) {
    const [changeDate, toggleChangeDate] = useState(false);
    const [state, setState] = useContext(Context);
    const { profile, following } = state;


    const changeTheWeek = (e) => {
        changeTheDate(e.target.value);
        toggleChangeDate(false);
    }

    let theLink = ( theSection ) => {
        let link = encodeURI(theSection.schools+'-'+theSection.teachers+'-'+theSection.subjects+'-'+theSection.grades)
        return link;
    }

    let noKeySection = (theSection) => {
        delete theSection.key;
        return theSection;
    }

    const weekTitle = (stringDate) => {
        const theMoment = moment(stringDate);
        const theDate = moment(stringDate).format("MM-DD-YYYY")
        const weekNumber = moment(stringDate).format('ww');
        const startDate = moment(stringDate).startOf('week').format('ddd MM-DD-YYYY');
        const endDate = moment(stringDate).endOf('week').format('ddd MM-DD-YYYY');
        return (
            <React.Fragment>
                {(changeDate === true)
                    ?  <TextField
                    style={{background: "#ffffff"}}
                    required
                    id="the_date"
                    label="Change Week"
                    type="Date"
                    onChange={(e) => changeTheWeek(e)}
                    InputLabelProps={{
                        shrink: true,
                        }}
                ></TextField>
                    : <Typography variant="h6">Week {weekNumber}: {theDate} <FontAwesomeIcon icon="arrows-alt-v" onClick={() =>toggleChangeDate(true)}></FontAwesomeIcon></Typography>
                }
                <Typography >{startDate+" - "+endDate}</Typography>
            </React.Fragment>
        )
    }

    const increments = [1, 2, 3, 4, 5];  
    
    
    return (
    
    <Grid container style={{border: "1px solid #bdbdbd"}}>
        <Grid key="section-header-row" item xs={12} container justify="space-around" className="entry-header">
            <Grid item xs={8} >
            <Typography variant="h6">{section.schools+" "+ section.teachers}</Typography>
            <Typography variant="h6">{section.grades+" "+ section.subjects}</Typography>
            </Grid>
            <Grid key="weektitle" item xs={4} style={{textAlign: 'right'}}>
                {weekTitle(week)}
            </Grid>
        </Grid>
        <Grid key="assignment-table" item container xs={12} spacing={1} justify="space-between" style={{paddingLeft: '5px'}}>
                {increments.map( increment => {
                    let theQueryDate = moment(week).startOf('week').add(increment, 'days').format('YYYY-MM-DD');
                    let colTitle = moment(week).startOf('week').add(increment, 'days').format("ddd MM-DD-YYYY");
                    return (
                        <Grid item xs={2} key={"dailyAssignments-"+colTitle}>
                            <Typography key={"theTitle-"+moment(week).format('ww')} variant="subtitle1">{colTitle}</Typography>                                       
                            <DailyWork key={"dailyWork-"+moment(week).add(increment, 'days').format('YYYY-MM-DD')}  userID={profile.userID} date={theQueryDate} section={section} newPost={newPost}></DailyWork>
                        </Grid> 
                    )
                })}
        </Grid>
        {(Array.isArray(following) && following.length == 0)
            ? null
            : <ListActions 
            following={following} 
            section={noKeySection(section)} 
            profile={profile} 
            shareLink={"/classrooms/:"+theLink(section)}
            classView={true}
            date={week}
            ></ListActions>
        }
        
    </Grid>
    
    )
             
}
