import React, { useContext, useState, useEffect } from 'react';
import ContentCard from './ContentCard.js';
import { Container, Grid, Button, Typography, Card, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClassAssignments from './ClassAssignments.js';
import NewAssignments from './NewAssignments.js';
import AddLesson from '../Forms/AddLesson.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const useStyles = makeStyles(() => ({
    root: {
        height: '200vh',
        maxHeight: '200vh',
        width: '100%',
        padding: '30px'
    }
  }));

export default function SchoolClasses({sections, onClickAdd, onClickHideForm}) {
    const classes = useStyles();

    let theLink = ( theSection ) => {
        let link = encodeURI(theSection.schools+'-'+theSection.teachers+'-'+theSection.subjects+'-'+theSection.grades)
        return link;
    }


    if(sections.length > 0 && sections !== null && sections != 'undefined'){
        return (
            <Grid
            id="school-classes"
            container
            wrap="wrap"
            className={classes.root}
            spacing={3}
            justify="flex-start"
            alignItems="flex-start"
            alignContent="flex-start"
            >
            { sections.map( (section, index) => {
                return (
                    <Grid key={"grid-item-"+index} item xs={12} sm={6} md={4}>
                        <ContentCard
                        key={"content-card-"+index}
                        mainTitle={section.schools+" "+ section.teachers}
                        subTitle={section.grades+" "+ section.subjects}
                        icon={false}
                        iconTo={theLink(section)}
                        onClickAdd={onClickAdd}
                        section={section}
                        > 
                            <ClassAssignments 
                                section={section} link={theLink(section)} onClickAdd={onClickAdd} onClickHideForm={onClickHideForm}
                            />
                    </ContentCard>
                    </Grid>  
                )
            })
            } 
            <Grid 
                        item xs={10} 
                        container 
                        justify="center" 
                        alignItems="center" 
                        alignContent="center" 
                        spacing={2}
                        >
                            <Grid item xs={2}>
                                <Typography variant="h2" style={{textAlign: 'right'}}>
                                    <FontAwesomeIcon icon="home"></FontAwesomeIcon>
                                </Typography>
                            </Grid>
                            <Grid item xs={7} >
                                <Typography variant="h6">
                                    Now that you've followed some classes  
                                </Typography>
                                <Typography>
                                    You're in a set up page. Your home feed or a particular classeoom is where you will spend most of your time here. 
                                </Typography>
                                <Button variant="outlined" href="/" color="primary">Take Me Home</Button>
                            </Grid>
                    </Grid>
            </Grid>

            
        ) 
    } else {
        return null
    } 
}
