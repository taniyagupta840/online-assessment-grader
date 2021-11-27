import mongoose from 'mongoose';

/**
 * Stores the format of the question in the database. Contains question statement
 * as a string, image file as base64 encoded string, and options to the question
 * as array of strings.
 */
const questionSchema = mongoose.Schema({
    question: String,
    selectedFile: String,
    options: [String]
});

/**
 * Format of the assessment in the database. Contains subject, name of assessment
 * as strings, timer (in minutes), marks per correct answer, negative marking 
 * as numbers, questions are stored in array of questionSchema defined above and 
 * answerKey is stored as array of strings, where each index represents the 
 * index of the question.
 */
const assessmentSchema = mongoose.Schema({
    subject: String,
    name: String,
    timer: Number,
    correctMark: Number,
    negativeMark: Number,
    questions: [questionSchema],
    answerKey: [String]
});

export default mongoose.model('assessments', assessmentSchema);