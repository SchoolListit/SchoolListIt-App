import React, { useContext, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Grid, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../../Context/Context.js'
import ContentCard from '../Components/ContentCard';
import ClassPosts from '../Components/ClassPosts.js';
import AddLessonPlan from '../Forms/AddLessonPlan.js';
import SingleAssignment from '../Components/SingleAssignment.js';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        height: '100vh',
        width: '100vw',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        background: "url('https://msp-media.org/wp-content/images/robert-collins-tvc5imO5pXk-unsplash.jpg')",
        maxWidth: 'none !important',
        overflow: 'auto'
    },
  }));

export default function Classroom() {
    const classes = useStyles();
    const { classArgs } = useParams();
    const [state, setState] = useContext(Context);
    const { assignments, currentAssignment } = state; 
    const [singlePostID, setSinglePostID] = useState('');
    
    
    let query = useQuery();
    
    let theClass = decodeURIComponent(classArgs).replace(":", "").split("-");
    const section = {
        schools: theClass[0],
        teachers: theClass[1],
        subjects: theClass[2],
        grades: theClass[3],
        key: theClass
    }

   const post = assignments.map( post => {
        if(currentAssignment === post.id){
            return post;
        }
    })

    const onClickAssignment = (postID) => {
        console.log(postID);
        setSinglePostID(postID);
    }
        
    return (<Container 
        fixed={true} 
        maxWidth={false}
        className={classes.root}
        >
        <Grid 
            container 
            >
            <Grid item xs={12} md={4}>
               
                <ContentCard
                    key={classArgs}
                    mainTitle={section.schools+" "+ section.teachers}
                    subTitle={section.grades+" "+ section.subjects}
                    >
                    <ClassPosts
                    section={section} onClickAssignment={onClickAssignment}
                    />
                </ContentCard>
                <AddLessonPlan></AddLessonPlan>
            </Grid>
            { (post !== 'undefined')
                ?
                <Grid item xs={12} md={8} >    
                    <SingleAssignment postID={singlePostID} ></SingleAssignment>
                </Grid>    
                : null
            }
        </Grid>
    </Container> );
    
}
    
    
