import mongoose from 'mongoose';

const AcademicFacultySchema = new mongoose.Schema({});

export const AcademicFaculty = mongoose.model('AcademicFaculty', AcademicFacultySchema);