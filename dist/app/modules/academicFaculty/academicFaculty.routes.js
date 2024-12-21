"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicFaculty_validation_1 = __importDefault(require("./academicFaculty.validation"));
const academicFaculty_controller_1 = __importDefault(require("./academicFaculty.controller"));
const router = express_1.default.Router();
router
    .route('/')
    .post((0, validateRequest_1.default)(academicFaculty_validation_1.default.CreateAcademicFaculty), academicFaculty_controller_1.default.CreateAcademicFaculty)
    .get(academicFaculty_controller_1.default.GetAcademicFaculties);
router
    .route('/:id')
    .get(academicFaculty_controller_1.default.GetAcademicFaculty)
    .patch((0, validateRequest_1.default)(academicFaculty_validation_1.default.UpdateAcademicFaculty), academicFaculty_controller_1.default.UpdateAcademicFaculty);
exports.AcademicFacultyRoutes = router;
