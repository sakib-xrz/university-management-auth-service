"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user.model");
const generateStudentId = (academicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    const currentYear = new Date().getFullYear().toString();
    const semesterCode = academicSemester.code;
    let currentId = '0001';
    const lastStudent = yield user_model_1.User.findOne({
        role: 'STUDENT',
    })
        .select({
        id: 1,
        _id: 0,
    })
        .sort({ createdAt: -1 })
        .limit(1)
        .lean();
    if (lastStudent) {
        const lastStudentId = lastStudent.id;
        const lastStudentYear = lastStudentId.slice(0, 4);
        const lastStudentSemesterCode = lastStudentId.slice(5, 7);
        const lastStudentIdNumber = lastStudentId.slice(8);
        if (lastStudentYear === currentYear &&
            lastStudentSemesterCode === semesterCode) {
            const newIdNumber = parseInt(lastStudentIdNumber, 10) + 1;
            currentId = newIdNumber.toString().padStart(4, '0');
        }
        else {
            currentId = '0001';
        }
    }
    return `${currentYear}-${semesterCode}-${currentId}`;
});
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = '0001';
    const lastFaculty = yield user_model_1.User.findOne({
        role: 'FACULTY',
    })
        .select({
        id: 1,
        _id: 0,
    })
        .sort({ createdAt: -1 })
        .limit(1)
        .lean();
    if (lastFaculty) {
        const lastFacultyId = lastFaculty.id;
        const lastFacultyIdNumber = lastFacultyId.slice(2);
        const newIdNumber = parseInt(lastFacultyIdNumber, 10) + 1;
        currentId = newIdNumber.toString().padStart(4, '0');
    }
    return `F-${currentId}`;
});
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = '0001';
    const lastAdmin = yield user_model_1.User.findOne({
        role: 'ADMIN',
    })
        .select({
        id: 1,
        _id: 0,
    })
        .sort({ createdAt: -1 })
        .limit(1)
        .lean();
    if (lastAdmin) {
        const lastAdminId = lastAdmin.id;
        const lastAdminIdNumber = lastAdminId.slice(2);
        const newIdNumber = parseInt(lastAdminIdNumber, 10) + 1;
        currentId = newIdNumber.toString().padStart(4, '0');
    }
    return `A-${currentId}`;
});
const UserUtils = { generateStudentId, generateFacultyId, generateAdminId };
exports.default = UserUtils;
