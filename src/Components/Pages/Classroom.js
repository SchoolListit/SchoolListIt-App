import React, { useContext, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Grid, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../../Context/Context.js';
import Header from '../Components/Header.js';
import ContentCard from '../Components/ContentCard';
import ClassPosts from '../Components/ClassPosts.js';
import NewAssignments from '../Components/NewAssignments.js';
import PostLesson from '../Forms/PostLesson.js';
import SingleAssignment from '../Components/SingleAssignment.js';
import { Redirect } from 'react-router-dom';


function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const useStyles = makeStyles(() => ({
    root: {
        margin: '0',
        padding: '0',
        display: 'flex',
        overflow: 'auto'
    },
  })); 

  const initialShowForm = {
    teachers: '',
    grades: '',
    schools: '',
    subjects: ''
}   

export default function Classroom() {
    const classes = useStyles();
    const { classArgs } = useParams();
    const [state, setState] = useContext(Context);
    const { assignments, currentAssignment, loggedIn } = state; 
    const [singlePostID, setSinglePostID] = useState('');
    const [newPost, setNewPost] = useState('');
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const [showForm, setShowForm] = useState(initialShowForm);

    
    
    let query = useQuery();
    //console.log(query.get("pageID"));
    
    let theClass = decodeURIComponent(classArgs).replace(":", "").split("-");
    
    const section = {
        schools: theClass[0],
        teachers: theClass[1],
        subjects: theClass[2],
        grades: theClass[3],
        key: theClass,
    }

    const showNewSection = (newPost) => {
        //do nothing
    }

    const showNewPost = (newPost) => {
        setNewPost(newPost);
    }

    const onClickAdd = (section) => {
        console.log(section)
        setShowForm(section);
    }


    const onClickAssignment = (postID) => {
        console.log(postID);
        //setSinglePostID(postID);
    }

    const onAddNew = (postBody) => {
        console.log(postBody);
    }

    
        
    return (
        <React.Fragment>
            <Header></Header>
            <Container 
            maxWidth={false}
            style={{padding: '30px 20px'}}
            >
            {(!profile)
                ?   <Redirect to="/sign-in" exact />
                : null }    
            <Grid container >
                <Grid item xs={12} md={4}>
                    <ContentCard
                        key={classArgs}
                        mainTitle={section.schools+" "+ section.teachers}
                        subTitle={section.grades+" "+ section.subjects}
                        onClickAdd={onClickAdd}
                        section={section}
                        >
                        <NewAssignments style={{listStyle: 'none'}} post={newPost} onClickAssignment={onClickAssignment} profile={profile}></NewAssignments>
                        <ClassPosts
                            section={section} 
                            onClickAssignment={onClickAssignment} 
                            profile={profile}
                            showForm={showForm}
                            onClickAdd = {onClickAdd}
                        />
                    </ContentCard>
                </Grid>    
            </Grid>
        </Container> 
        </React.Fragment>
        
    );
    
}
    
    
