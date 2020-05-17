import React, { useContext, useState }  from 'react';
import { FormControl, TextField, Card, Button, InputLabel, MenuItem, Select  } from '@material-ui/core';
import { Context } from '../../Context/Context.js';
import ContentCard from '../Components/ContentCard.js';
import axios from 'axios';

//here is  the component
export default function PostLesson( props ) {
    
    const [userLat, setUserLat] = useState('');
    const [userLng, setUserLng] = useState('');
    const [mandatory, setMandatory] = useState(true);
    const url = 'http://localhost:8888/parentchecklist/wp-json/parent-checklist-rest/v2/assignments';
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));

    console.log(profile);

    const onFocusInput = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                setUserLat(position.coords.latitude)
                setUserLng(position.coords.longitude)
              });   
    }
    

    //submit the form
    const onSubmit = (e) =>{
        e.preventDefault();

         //create post
         axios.get(url)
         .then( (res) => {
             const salt = res.data['salt'];
             const key = 'aVdG#D.KRFXw)dr!37}BrpkxdQM8N4';
             //const authHeader = btoa(salt+"_"+key);
             const authHeader = salt+"_"+key;
             //now we have to set up the formdata and send headers, etc
             //set up form data
             let formdata = new FormData();                     
             let body = {
                due_date: document.getElementById('due_date').value,
                post_date: document.getElementById('post_date').value,
                post_title: document.getElementById('post_title').value,
                post_excerpt: document.getElementById('post_excerpt').value,
                grades: document.getElementById('grades').value,
                schools: document.getElementById('schools').value,
                teachers: document.getElementById('teachers').value,
                subjects: document.getElementById('subjects').value,
                keywords: document.getElementById('keywords').value,
                mandatory: mandatory,
                post_author: profile.email,
                author_avatar: profile.photo
            }
            console.log(body);
             const headers = {
                 "X-Scholistit-Auth": authHeader,
                 "Content-Type": "multipart/form-data"
             }
             for (const property in body) {
                 formdata.append(property, body[property]);
             }
             //make 2nd call
             axios.post(url, formdata, {headers: headers})
             .then( (res) => {
                 //lets do some business
                 console.log(res.data);
             })
         });
    }

    const changeMandatory = (e) => {
        setMandatory(e.target.value);
    }

    const setFormValues = (e) => {
        //do nothing
    }

    
    
        return (
            <Card style={{margin: '0 10px 20px 10px'}}>
            <div className="entry-header" style={{display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h2 className="entry-title">Post New Lesson</h2>
                    <h3 className="entry-subtitle">{props.section.schools+" "+props.section.teachers}</h3>
                    <h3 className="entry-subtitle">{props.section.grades+" "+props.section.subjects}</h3>
                </div>    
                    
            </div> 
            <div className="entry-content" style={{overflow: 'auto', paddingRight: '20px'}}>
                <form onSubmit={(e) => onSubmit(e)} >
                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                            onFocus={onFocusInput}
                            fullWidth={true}
                            required
                            id="due_date"
                            label="Due Date"
                            type="Date"
                            onChange={(e) => setFormValues(e)}
                            InputLabelProps={{
                                shrink: true,
                                }}
                        ></TextField>
                </FormControl>

                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                        fullWidth={true}
                        required
                        id="post_date"
                        label="Assignment Date"
                        type="Date"
                        onChange={(e) => setFormValues(e)}
                        InputLabelProps={{
                            shrink: true,
                            }}
                    ></TextField>
                </FormControl>
                <TextField type="hidden" value={userLat} id="userLat"></TextField>
                <TextField type="hidden" value={userLng} id="userLng"></TextField>

                <FormControl margin="normal" fullWidth={true}>
                    <Select
                        label="Mandatory"
                        id="mandatory"
                        onChange={(e) => changeMandatory(e)}
                        value={mandatory}
                        >
                        <MenuItem selected value={true}>Mandatory</MenuItem>
                        <MenuItem value={false}>Optional</MenuItem>
                    </Select>
                </FormControl>
                

                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                        fullWidth={true}
                        required
                        id="post_title"
                        label="Title"
                        onChange={(e) => setFormValues(e)}
                        InputLabelProps={{
                            shrink: true,
                            }}
                    ></TextField>
                </FormControl>
                
                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                        id="post_excerpt"
                        label="Subtitle"
                        multiline
                        rows={5}
                        variant="outlined"
                        onChange={(e) => setFormValues(e)}
                    ></TextField>
                </FormControl>

                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                        id="keywords"
                        label="Keywords"
                        helperText="seperate with commas (ex: fractions, multiplication)"
                        multiline
                        rows={2}
                        variant="outlined"
                        onChange={(e) => setFormValues(e)}
                    ></TextField>
                </FormControl>
                {(props.section.schools) 
                    ? <TextField type="hidden" value={props.section.schools} id="schools"></TextField>

                    : null
                }
                {(props.section.teachers) 
                    ? <TextField type="hidden" value={props.section.schools} id="teachers"></TextField>

                    : null
                }
                {(props.section.grades) 
                    ? <TextField type="hidden" value={props.section.schools} id="grades"></TextField>

                    : null
                }
                {(props.section.subjects) 
                    ? <TextField type="hidden" value={props.section.schools} id="subjects"></TextField>

                    : null
                }
                <Button type="submit" variant="contained">Submit</Button>
                </form>
                </div>
            </Card>
        )
    
    
}
