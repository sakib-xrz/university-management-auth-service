"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const course_validation_1 = __importDefault(require("./course.validation"));
const course_controller_1 = __importDefault(require("./course.controller"));
const router = express_1.default.Router();
router
    .route('/')
    .post((0, validateRequest_1.default)(course_validation_1.default.CreateCourse), course_controller_1.default.CreateCourse)
    .get(course_controller_1.default.GetCourses);
router
    .route('/:id')
    .get(course_controller_1.default.GetCourseById)
    .patch((0, validateRequest_1.default)(course_validation_1.default.UpdateCourse), course_controller_1.default.UpdateCourse)
    .delete(course_controller_1.default.DeleteCourse);
router.put('/:id/assign-faculty', (0, validateRequest_1.default)(course_validation_1.default.FacultyWithCourse), course_controller_1.default.AssignFacultyToCourse);
router.patch('/:id/remove-faculty', (0, validateRequest_1.default)(course_validation_1.default.FacultyWithCourse), course_controller_1.default.RemoveFacultyFromCourse);
exports.CourseRoutes = router;
