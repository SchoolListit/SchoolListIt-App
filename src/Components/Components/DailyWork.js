import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { emptyArray } from '../../Context/functions.js';
import TheAssignment from './TheAssignment';

export default function DailyWork( {date, section, userID, newPost} ) {
    const [count, setCount] = useState(10);
    const [lessons, setLessonPlans] = useState([]);


     /* Make API Call */
     useEffect(() => {
        let ignore = false;
        async function fetchData() {
            let url = 'http://localhost:8888/parentchecklist/wp-json/parent-checklist/v2/lesson-plans';
            let body = {
                show_assignments: true,
                teachers: section.teachers,
                grades: section.grades,
                subjects: section.subjects,
                date: date,
                number: '-1'
            }
            let formdata = new FormData();
            for (const property in body) {
                formdata.append(property, body[property]);
            }
            const result = await axios.post(url, formdata, )
            if (!ignore) setLessonPlans(result.data.assignments);
        }

        fetchData();
        return () => { ignore = true; }
    }, [section.teachers, section.grades, section.subjects, newPost]);

    if(lessons === 'undefined' || lessons.length === 0 ){
        return null;
    } else {
        const { posts } = lessons.assignments;
        return (posts.map( post => {
            return (
                <TheAssignment key={"assignment"+post.ID} post={post} userID={userID} section={section} classView={true}></TheAssignment>
            )
        }) )
    } 
    
}
