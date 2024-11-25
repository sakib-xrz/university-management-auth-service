import mongoose from 'mongoose';

const StudentsSchema = new mongoose.Schema({});

export const Students = mongoose.model('Students', StudentsSchema);
