"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = __importDefault(require("./faculty.controller"));
const router = express_1.default.Router();
router.get('/', faculty_controller_1.default.GetFaculties);
router
    .route('/:id')
    .get(faculty_controller_1.default.GetFacultyById)
    .patch(faculty_controller_1.default.UpdateFaculty)
    .delete(faculty_controller_1.default.DeleteFaculty);
exports.FacultyRoutes = router;
