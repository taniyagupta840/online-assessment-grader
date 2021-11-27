import mongoose from 'mongoose';

/**
 * Contains name, email and password of students
 */
const studentSchema = mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
});

export default mongoose.model('Student', studentSchema);