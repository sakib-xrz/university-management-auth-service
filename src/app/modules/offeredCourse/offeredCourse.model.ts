import mongoose from 'mongoose';

const OfferedCourseSchema = new mongoose.Schema({});

export const OfferedCourse = mongoose.model('OfferedCourse', OfferedCourseSchema);