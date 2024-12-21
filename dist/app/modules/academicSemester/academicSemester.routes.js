"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicSemester_validation_1 = __importDefault(require("./academicSemester.validation"));
const academicSemester_controller_1 = __importDefault(require("./academicSemester.controller"));
const router = express_1.default.Router();
router
    .route('/')
    .post((0, validateRequest_1.default)(academicSemester_validation_1.default.CreateAcademicSemester), academicSemester_controller_1.default.CreateAcademicSemester)
    .get(academicSemester_controller_1.default.GetAcademicSemesters);
router
    .route('/:id')
    .get(academicSemester_controller_1.default.GetAcademicSemesterById)
    .patch((0, validateRequest_1.default)(academicSemester_validation_1.default.UpdateAcademicSemester), academicSemester_controller_1.default.UpdateAcademicSemester);
exports.AcademicSemesterRoutes = router;
