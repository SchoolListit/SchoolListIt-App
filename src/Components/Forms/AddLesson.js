import React, { useContext, useState }  from 'react';
import { Grid, FormControl, TextField, Button, Typography, MenuItem, Select  } from '@material-ui/core';
import { Context } from '../../Context/Context.js';
import SectionSubForm from './components/SectionSubForm.js'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


//here is  the component
export default function AddLesson( props ) {
    
    const [userLat, setUserLat] = useState('');
    const [userLng, setUserLng] = useState('');
    const [mandatory, setMandatory] = useState(true);
    const url = 'http://schoolistit.com/wp-json/schoolistit-rest/v2/assignments';
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const [state] = useContext(Context);
    const [newPost, setNewPost] = useState("");
    const [linkExternal, setLinkExternal] = useState(false);

    const { showNewPost, showNewSection, section, onClickHideForm } = props;

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
        const body = {
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
            linkExternal: linkExternal,
            post_author: profile.email,
            author_avatar: profile.photo,
            newSection: {
                grades: document.getElementById('grades').value,
                schools: document.getElementById('schools').value,
                teachers: document.getElementById('teachers').value,
                subjects: document.getElementById('subjects').value
            }
        }
        if(linkExternal === true){
            body.post_link =  document.getElementById('post_link').value
        }
        document.getElementById("AddLessonForm").reset();
        onClickHideForm();

         //create post
         axios.get(url, body)
         .then( (res) => {
             const salt = res.data['salt'];
             const key = 'aVdG#D.KRFXw)dr!37}BrpkxdQM8N4';
             //const authHeader = btoa(salt+"_"+key);
             const authHeader = salt+"_"+key;
             //now we have to set up the formdata and send headers, etc
             //set up form data
             let formdata = new FormData();                     
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
                let post = res.data.post;
                post.complete = [];
                post.author_avatar = profile.photo;
                post.author_name = profile.name;
                post.section = section;
                post.assigned_date = body.post_date;
                post.mandatory = mandatory;
                post.post_link = body.post_link;
                post.post_excerpt = body.post_excerpt;
                showNewPost(post);
                if(showNewSection !== false){
                    showNewSection(body.newSection);
                }
             })
             .catch( error => {
                console.log(error)
            })
         });
    }

    const changeMandatory = (e) => {
        setMandatory(e.target.value);
    }

    const setFormValues = (e) => {
        //do nothing
    }

    const changeLinkExternal = (e) => {
        setLinkExternal(!linkExternal);
    }

    
    
        return (

            <div style={{padding: '20px 20px 30px 20px'}} >
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography variant="h6" style={{fontWeight: '700'}}>Add a lesson</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => onClickHideForm()}><FontAwesomeIcon icon="window-close"></FontAwesomeIcon></Button>
                    </Grid>
                </Grid>
                <form id="AddLessonForm" onSubmit={(e) => onSubmit(e)} >
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

                
                <TextField type="hidden" value={userLat} id="userLat"></TextField>
                <TextField type="hidden" value={userLng} id="userLng"></TextField>
                    <Grid container spacing={3}>
                        <Grid item>
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
                        </Grid>
                        <Grid item>
                        <FormControl margin="normal" fullWidth={true}>
                            <Select
                                label="Link To"
                                id="external-link"
                                onChange={(e) => setLinkExternal(e.target.value)}
                                value={linkExternal}
                                >
                                <MenuItem selected value={true}>Link to external page</MenuItem>
                                <MenuItem value={false}>Link opens assignment</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>
                    </Grid>
                
                

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
                {(linkExternal === true)
                    ? <FormControl margin="normal" fullWidth={true}>
                        <TextField
                            fullWidth={true}
                            type="url"
                            id="post_link"
                            label="Link"
                            onChange={(e) => setFormValues(e)}
                            InputLabelProps={{
                                shrink: true,
                                }}
                        ></TextField>
                </FormControl>
                    : null
                
                }
                
                
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
                <SectionSubForm section={props.section} sections={props.sections}></SectionSubForm>
                <Button type="submit" variant="contained">Submit</Button>
                </form>
            </div>
        )
    
    
}