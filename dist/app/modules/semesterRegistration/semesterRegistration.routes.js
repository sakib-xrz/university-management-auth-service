"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistrationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const semesterRegistration_validation_1 = __importDefault(require("./semesterRegistration.validation"));
const semesterRegistration_controller_1 = __importDefault(require("./semesterRegistration.controller"));
const router = express_1.default.Router();
router
    .route('/')
    .post((0, validateRequest_1.default)(semesterRegistration_validation_1.default.CreateSchema), semesterRegistration_controller_1.default.CreateSemesterRegistration)
    .get(semesterRegistration_controller_1.default.GetAllSemesterRegistrations);
router
    .route('/:id')
    .get(semesterRegistration_controller_1.default.GetSemesterRegistration)
    .patch((0, validateRequest_1.default)(semesterRegistration_validation_1.default.UpdateSchema), semesterRegistration_controller_1.default.UpdateSemesterRegistration);
exports.SemesterRegistrationRoutes = router;
