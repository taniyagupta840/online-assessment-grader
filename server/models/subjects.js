import mongoose from 'mongoose';

/**
 * Students answers are stored in following format: id and name of student as
 * strings, answers as array of strings where index of each answer represents 
 * index of question in original 'assessments' collections, and then marks as
 * a number.
 */
const studentSchema = mongoose.Schema({
    studentID: String,
    studentName: String,
    answers: [String],
    marks: Number
});

/**
 * assessments under the subject are stored in the following format: id and name
 * of the assessment as strings, answer key as array of strings, and array of
 * students answers to the assessment.
 */
const assessmentSchema = mongoose.Schema({
    assessmentID: String,
    assessmentName: String,
    answerKey: [String],
    studentsAnswers: [studentSchema]
});

/**
 * Contains name of subject and array of assessments under the subject.
 */
const subjectSchema = mongoose.Schema({
    name: String,
    assessments: [assessmentSchema],
});

const SubjectModel = mongoose.model('Subject', subjectSchema);

export default SubjectModel;