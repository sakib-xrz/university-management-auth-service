import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({});

export const Admin = mongoose.model('Admin', AdminSchema);