"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const offeredCourse_validation_1 = __importDefault(require("./offeredCourse.validation"));
const offeredCourse_controller_1 = __importDefault(require("./offeredCourse.controller"));
const router = express_1.default.Router();
router
    .route('/')
    .post((0, validateRequest_1.default)(offeredCourse_validation_1.default.CreateSchema), offeredCourse_controller_1.default.CreateOfferedCourse);
exports.OfferedCourseRoutes = router;
