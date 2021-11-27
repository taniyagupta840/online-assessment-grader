import mongoose from 'mongoose';

/**
 * Contains name, email and password of teachers.
 */
const teacherSchema = mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
});

export default mongoose.model('Teacher', teacherSchema);