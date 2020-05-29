import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { Grid, Typography } from '@material-ui/core';
import DailyWork from './../Components/DailyWork.js';






export default function ClassWeek( {section, week} ) {

    const weekTitle = (stringDate) => {
        const theMoment = moment(stringDate);
        const theDate = moment(stringDate).format("MM-DD-YYYY")
        const weekNumber = moment(stringDate).format('ww');
        const startDate = moment(stringDate).startOf('week').format('dddd MM-DD-YYYY');
        const endDate = moment(stringDate).endOf('week').format('dddd MM-DD-YYYY');
        return (
            <React.Fragment>
                <Typography variant="h6">Week {weekNumber}: {theDate}</Typography>
                <Typography >{startDate+" - "+endDate}</Typography>
            </React.Fragment>
        )
    }
    
    const increments = [1, 2, 3, 4, 5];  

    
    return (
    
    <Grid container style={{border: "1px solid #bdbdbd"}}>
        <Grid key="section-header-row" item xs={12} container justify="space-between" className="entry-header">
            <Grid key="not sure but hole cow" item xs={8} >
            <Typography variant="h6">{section.schools+" "+ section.teachers}</Typography>
            <Typography variant="h6">{section.grades+" "+ section.subjects}</Typography>
            </Grid>
            <Grid key="weektitle" item xs={4} style={{textAlign: 'right'}}>
                {weekTitle('2020-05-15')}
            </Grid>
        </Grid>
        <Grid key="assignment-table" item container xs={12} spacing={1} justify="space-between" >
                {increments.map( increment => {
                    let theQueryDate = moment('2020-05-15').startOf('week').add(increment, 'days').format('YYYY-MM-DD');
                    let colTitle = moment('2020-05-15').startOf('week').add(increment, 'days').format("ddd MM-DD-YYYY");
                    return (
                        <Grid item xs={2} key={"dailyAssignments-"+colTitle}>
                            <Typography key={"theTitle-"+moment('2020-05-15').format('ww')} variant="subtitle1">{colTitle}</Typography>                                       
                            <DailyWork key={"dailyWork-"+moment('2020-05-15').add(increment, 'days').format('YYYY-MM-DD')}  userID={userID} date={theQueryDate} section={section}></DailyWork>
                        </Grid> 
                    )
                })}
        </Grid>
    </Grid>

    )
             
}
