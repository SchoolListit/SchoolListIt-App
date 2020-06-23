import React, { useContext, useState }  from 'react';
import { Dialog, Grid, FormControl, TextField, Button, Typography, MenuItem, Select, Container  } from '@material-ui/core';
import { Context } from '../../Context/Context.js';
import { postContent } from '../../Context/functions.js';
import MyDialogTitle from '../Components/MyDialogTitle.js';
import SectionSubForm from './components/SectionSubForm.js';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BlockEditor from './BlockEditor.js';



//here is  the component
export default function EditListItem( props ) {
    
    const [userLat, setUserLat] = useState('');
    const [userLng, setUserLng] = useState('');
    const url = 'http://schoolistit.com/wp-json/schoolistit-rest/v2/assignments';
    const profile = JSON.parse(localStorage.getItem('scholistit_profile'));
    const [state] = useContext(Context);
    const [newPost, setNewPost] = useState("");
    const [changedFields, setChangedFields] = useState([]);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [draftJSContent, setdraftJSContent] = useState('');

    const { post, section, onChanged, closeEditItem } = props;
    const [mandatory, setMandatory] = useState(post.mandatory);
    let initialLinkExternal = (post.linkExternal === "") ? false : post.linkExternal ;
    const [linkExternal, setLinkExternal] = useState(initialLinkExternal);


    

    const openDelete = () => {
        setDeleteOpen(!deleteOpen);
    }

    const openCreate = () => {
        const url = 'http://schoolistit.com/wp-json/wp/v2/assignments/'+post.ID;
        axios.get(url)
        .then( res => {
            setdraftJSContent(res.data);
            setCreateOpen(!createOpen);
        })
    }

    //submit the form
    const onSubmit = (e) =>{
       if(typeof(e.preventDefault) === 'function'){
        e.preventDefault()
       } 
        const body = {
            post_id: props.post.ID,
            changed_fields: changedFields,
            due_date: document.getElementById('due_date').value,
            assigned_date: document.getElementById('assigned_date').value,
            post_title: document.getElementById('post_title').value,
            post_link: document.getElementById('post_link').value,
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
        document.getElementById("EditLessonForm").reset();

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
                post.author_avatar = profile.photo;
                post.author_name = profile.name;
                post.section = section;
                post.assigned_date = body.post_date;
                post.mandatory = mandatory;
                post.mandatory = linkExternal;
                post.post_link = body.post_link;
                post.post_title = body.post_title;
                post.post_excerpt = body.post_excerpt;
                res.data.post = post;
                onChanged(res.data);
                closeEditItem();
             })
         });
    }

    const changeMandatory = (e) => {
        setMandatory(e.target.value);
    }

    const changeLinkExternal = (e) => {
        setMandatory(e.target.value);
    }

    const setFormValues = (e) => {
        changedFields.push(e.target.id);
        changedFields.filter( onlyUnique );
        setChangedFields(changedFields);
    }

    const handleDelete = (e) => {
        changedFields.push('delete_post');
        changedFields.filter( onlyUnique );
        setChangedFields(changedFields);
        onSubmit(e);
    }

    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

        return (

            <React.Fragment >
                <Container style={{padding: '30px'}}>
                <form id="EditLessonForm" onSubmit={(e) => onSubmit(e)} >
                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                        fullWidth={true}
                        required
                        id="assigned_date"
                        label="Assignment Date"
                        type="Date"
                        defaultValue={post.assigned_date}
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
                            id="due_date"
                            label="Due Date"
                            type="Date"
                            defaultValue={post.due_date}
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
                                defaultValue={mandatory}
                                >
                                <MenuItem value={true}>Mandatory</MenuItem>
                                <MenuItem value={false}>Optional</MenuItem> 
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl margin="normal" fullWidth={true}>
                            <Select
                                label="Link To"
                                id="external-link"
                                onChange={(e) => changeLinkExternal(e)}
                                defaultValue={linkExternal}
                                >
                                <MenuItem value={true}>Link to external page</MenuItem>
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
                        defaultValue={post.post_title}
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
                            required
                            id="post_link"
                            label="Link"
                            defaultValue={post.post_link}
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
                        defaultValue={post.post_excerpt}
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
                        defaultValue={post.post_title}
                        variant="outlined"
                        onChange={(e) => setFormValues(e)}
                    ></TextField>
                </FormControl>
                <SectionSubForm section={section} sections={false}></SectionSubForm>
                <Button type="submit" variant="contained" style={{marginRight: '15px'}}>
                    <FontAwesomeIcon icon="save" style={{marginRight: '10px'}}></FontAwesomeIcon>
                    {" Submit"}
                </Button>
                <Button onClick={() => openCreate(post.ID)} variant="contained" style={{marginRight: '15px'}}>
                    <FontAwesomeIcon icon="magic" style={{marginRight: '10px'}}></FontAwesomeIcon> Create
                </Button>
                <Dialog fullScreen open={createOpen} onClose={openCreate}>
                    <MyDialogTitle onClose={openCreate} icon={false} title={post.post_title} subtitle={post.post_excerpt}></MyDialogTitle>
                    <BlockEditor postID={post.ID} postContent={draftJSContent} ></BlockEditor>
                </Dialog>    
                <Button onClick={() => openDelete(post.ID)} variant="contained">
                    <FontAwesomeIcon icon="trash-alt" style={{marginRight: '10px'}}></FontAwesomeIcon> Delete?
                </Button>
                <Dialog open={deleteOpen} onClose={openDelete}>
                    <MyDialogTitle onClose={openDelete} icon="exclamation-triangle" title="Proceed with Caution"></MyDialogTitle>
                    <Container style={{margin: '30px 0'}}>
                        <Typography gutterBottom variant="h5">Are you really really sure?</Typography>
                        <Typography paragraph>If you confirm delete, the assignment and all its comments, submissions, follows, etc will also be lost and cannot be recovered. </Typography>
                        <Button onClick={() => handleDelete(post.ID)} variant="contained">
                            Go Ahead and Delete
                        </Button>
                    </Container>
                </Dialog>
                </form>
                </Container>
            </React.Fragment>
        )
    
    
}