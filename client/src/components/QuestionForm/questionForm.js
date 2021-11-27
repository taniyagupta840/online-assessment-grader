import React , { useState } from "react";
import { 
    TextField, Button, Typography, Paper, 
    FormControl, InputLabel, Select, MenuItem 
} from '@material-ui/core'
import FileBase from 'react-file-base64';

import useStyles from './styles.js';

/**
* This component is used to add questions to the assessment, which is currently 
* being created by the teacher.
* @param {Object} assessmentData - Data of assessment currently being created.
* @param {Function} setAssessmentData - Function to change data of assessment
* currently being created.
*/
const QuestionForm = ({ assessmentData, setAssessmentData }) => {
    /**
     * @typedef {{question: string, options: Array<string>, 
     * answer: string, selectedFile: string}} 
     * questionData — Object for storing question data currently being filled.
     */
    /**
     * @typedef {Function} setQuestionData — Function for setting question data
     * in the state variable.
     */
    const [questionData, setQuestionData] = useState({
        question: '', options: [], answer: '', selectedFile: ''
    });
    
    const classes  = useStyles();

    /** 
    * Function for adding current question data to the assessment being created.
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        /** 
         * Checks whether assessment has questions added previously or is it 
         * first question being added.
         */ 
        if (!assessmentData.questions || !assessmentData.answerKey)
            setAssessmentData({ ...assessmentData, 
                questions: [ 
                    {
                    question: questionData.question,
                    options: questionData.options,
                    selectedFile: questionData.selectedFile
                    } 
                ],
                answerKey: [ questionData.answer ]
            });
        else setAssessmentData({ ...assessmentData, 
            questions: [ ...assessmentData.questions,
                {
                question: questionData.question,
                options: questionData.options,
                selectedFile: questionData.selectedFile
                } 
            ],
            answerKey: [ ...assessmentData.answerKey, questionData.answer ]
        });

        // Clears the form.
        setQuestionData({ question: '', options: [], answer: '', selectedFile: '' });
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" 
                className={`${classes.root} ${classes.form}`} 
                onSubmit={handleSubmit}>
                <Typography variant="h6">Add a Question</Typography>
                <TextField 
                    name="question"
                    required
                    variant="outlined" 
                    label="Question" 
                    fullWidth
                    value={questionData.question}
                    onChange={(e) => setQuestionData({ 
                        ...questionData, question: e.target.value})}
                />
                <TextField 
                    name="options" 
                    required
                    variant="outlined" 
                    label="Options (Comma Separated)" 
                    fullWidth
                    value={questionData.options}
                    onChange={(e) => setQuestionData({ 
                        ...questionData, options: e.target.value.split(',')})}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        id="selectedFile"
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setQuestionData({ 
                            ...questionData, selectedFile: base64})}
                    />
                </div>
                <FormControl fullWidth>
                    <InputLabel>Answer</InputLabel>
                    <Select
                        name="answer"
                        label="Answer"
                        value={questionData.answer}
                        required
                        onChange={(e) => setQuestionData({ 
                            ...questionData, answer: e.target.value })}>
                        {/* Question's options are mapped to make menu items */}
                        {questionData.options.map((option) => 
                        <MenuItem value={option}>{option}</MenuItem>)}
                    </Select>
                </FormControl>
                <Button className={classes.buttonSubmit} 
                    variant="contained" 
                    color="secondary" 
                    type="submit" 
                    fullWidth>
                    Add Question
                </Button>
            </form>
        </Paper>
    );
}

export default QuestionForm;