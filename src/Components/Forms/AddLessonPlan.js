import React, { useContext, useState }  from 'react';
import { FormControl, TextField, Button  } from '@material-ui/core';
import { Context } from '../../Context/Context.js';
import ContentCard from '../Components/ContentCard.js';
import ChooseWPTerm from './components/ChooseWPTerm.js';


export default function AddLessonPlan(props) {
    const [state, setState] = useContext(Context);
    const { schools, teachers, grades, subjects } = state;
    
    let initialLocalState = {
        dueDate: '',
        postDate: '',
        school: '',
        teacher: '',
        subject: '',
        grade: ''
    }
    const [localState, setLocalState] = useState(initialLocalState);

    const [LessonForm, toggleLessonForm] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
    }

    const clickShowForm = e => {
        toggleLessonForm()
    }
    return (
        <ContentCard
            double={true}
            mainTitle="Post Assignments"
            subTitle={state.teacher+' '+state.dueDate}
        >
                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                            fullWidth={true}
                            required
                            id="dueDate"
                            label="Due Date"
                            type="Date"
                            onChange={(e) => onSubmit(e)}
                            InputLabelProps={{
                                shrink: true,
                                }}
                        ></TextField>
                </FormControl>
                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                        fullWidth={true}
                        required
                        id="postDate"
                        label="Assignment Date"
                        type="Date"
                        onChange={(e) => setLocalState(e)}
                        InputLabelProps={{
                            shrink: true,
                            }}
                    ></TextField>
                </FormControl>
                <FormControl margin="normal" fullWidth={true}>
                    <TextField
                        id="description"
                        label="Description"
                        multiline
                        rows={5}
                        variant="outlined"
                        onChange={(e) => setLocalState(e)}
                    ></TextField>
                </FormControl>
                <ChooseWPTerm taxonomy="schools" data={schools}></ChooseWPTerm>
                <ChooseWPTerm taxonomy="teachers" data={teachers}></ChooseWPTerm>
                <ChooseWPTerm taxonomy="grades" data={grades}></ChooseWPTerm>
                <ChooseWPTerm taxonomy="subjects" data={subjects}></ChooseWPTerm>
                <FormControl>
                <Button 
                    variant="contained"
                    type="submit"
                    onSubmit={(e) => onSubmit(e)}
                >post</Button>

                </FormControl>
            </ContentCard>
    )
}
