"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = __importDefault(require("./student.controller"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const student_validation_1 = __importDefault(require("./student.validation"));
const router = express_1.default.Router();
router.get('/', student_controller_1.default.GetStudents);
router
    .route('/:id')
    .get(student_controller_1.default.GetStudentById)
    .patch((0, validateRequest_1.default)(student_validation_1.default.UpdateStudent), student_controller_1.default.UpdateStudent)
    .delete(student_controller_1.default.DeleteStudent);
exports.StudentRoutes = router;
