"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicDepartment_validation_1 = __importDefault(require("./academicDepartment.validation"));
const academicDepartment_controller_1 = __importDefault(require("./academicDepartment.controller"));
const router = express_1.default.Router();
router
    .route('/')
    .post((0, validateRequest_1.default)(academicDepartment_validation_1.default.CreateAcademicDepartment), academicDepartment_controller_1.default.CreateAcademicDepartment)
    .get(academicDepartment_controller_1.default.GetAcademicDepartments);
router
    .route('/:id')
    .get(academicDepartment_controller_1.default.GetAcademicDepartment)
    .patch((0, validateRequest_1.default)(academicDepartment_validation_1.default.UpdateAcademicDepartment), academicDepartment_controller_1.default.UpdateAcademicDepartment);
exports.AcademicDepartmentRoutes = router;
