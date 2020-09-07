import React, { useContext } from 'react';
import moment from 'moment';
import { Grid, Typography, TextField, Container,  } from '@material-ui/core';
import { Context } from '../../Context/Context.js';
import DailyWork from './../Components/DailyWork.js';
import ListActions from '../Components/ListActions.js';






export default function ClassWeek( {section, week, changeTheDate, newPost} ) {
    const [state] = useContext(Context);
    const { profile, following } = state;


    const changeTheWeek = (e) => {
        changeTheDate(e.target.value);
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
        const theDate = moment(stringDate).format("MM-DD-YYYY")
        const startDate = moment(stringDate).startOf('week').format('ddd MM-DD-YYYY');
        const endDate = moment(stringDate).endOf('week').format('ddd MM-DD-YYYY');
        return (
            <React.Fragment>
                <Typography variant="h6">{startDate+" - "+endDate}</Typography>

                <TextField
                    required
                    id="the_date"
                    label="Change Week"
                    type="Date"
                    onChange={(e) => changeTheWeek(e)}
                    defaultValue={theDate}
                    InputLabelProps={{
                        shrink: true,
                        }}
                    ></TextField>
            </React.Fragment>
        )
    }

    const increments = [1, 2, 3, 4, 5];  

    const sectionTitle = (theSection) => {
        return (
            <Typography variant="h6">{theSection.schools+" "+theSection.teachers+" "+theSection.grades+" "+theSection.subjects}</Typography>
        )
    }
    
    
    return (
    <Container maxWidth={false} style={{padding: '30px'}}>
    <Grid container style={{border: "1px solid #bdbdbd"}} wrap="wrap">
        <Grid key="section-header-row" item xs={12} container justify="space-around" className="entry-header">
            <Grid item xs={12} md={9} >
            {sectionTitle(section)}
            </Grid>
            <Grid key="weektitle" item md={3} xs={12} >
                {weekTitle(week)}
            </Grid>
        </Grid>
        <Grid key="assignment-table" item container xs={12} spacing={0} justify="space-between" style={{paddingLeft: '5px'}} >
                {increments.map( increment => {
                    let theQueryDate = moment(week).startOf('week').add(increment, 'days').format('YYYY-MM-DD');
                    let colTitle = moment(week).startOf('week').add(increment, 'days').format("ddd MM-DD-YYYY");
                    return (
                        <Grid item md={2} xs={12} key={"dailyAssignments-"+colTitle}>
                            <Typography key={"theTitle-"+moment(week).format('ww')} variant="h6" style={{background: '#eeeeee'}}>{colTitle}</Typography>                                       
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
    </Container>
    )
             
}
