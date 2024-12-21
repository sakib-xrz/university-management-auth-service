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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const course_model_1 = require("./course.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const course_constant_1 = __importDefault(require("./course.constant"));
const mongoose_1 = __importDefault(require("mongoose"));
const CreateCourse = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.prerequisiteCourses && payload.prerequisiteCourses.length) {
        for (let i = 0; i < payload.prerequisiteCourses.length; i++) {
            const course = yield course_model_1.Course.findById(payload.prerequisiteCourses[i].course);
            if (!course) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Prerequisite course with id "${payload.prerequisiteCourses[i].course}" not found`);
            }
        }
    }
    const existingCourse = yield course_model_1.Course.findOne({
        title: payload.title,
    });
    if (existingCourse) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Course with title '${payload.title}' already exists`);
    }
    const course = yield course_model_1.Course.create(payload);
    return course;
});
const GetCourses = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.Course.find().populate('prerequisiteCourses.course'), query)
        .search(course_constant_1.default.CourseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const courses = yield courseQuery.modelQuery.exec();
    const total = yield courseQuery.getCountQuery();
    const { page, limit } = courseQuery.getPaginationInfo();
    return {
        data: courses,
        meta: {
            total,
            page,
            limit,
        },
    };
});
const GetCourseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.Course.findById(id).populate('prerequisiteCourses.course');
    if (!course) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Course not found');
    }
    return course;
});
const UpdateCourse = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.Course.findById(id);
    if (!course) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Course not found');
    }
    const { prerequisiteCourses } = payload, restUpdatedFields = __rest(payload, ["prerequisiteCourses"]);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        yield course_model_1.Course.findByIdAndUpdate(id, Object.assign({}, restUpdatedFields), {
            new: true,
            runValidators: true,
            session,
        });
        if (prerequisiteCourses && prerequisiteCourses.length) {
            const deletablePrerequisiteCourses = prerequisiteCourses
                .filter((el) => el.course && el.isDeleted)
                .map((el) => el.course);
            const creatablePrerequisiteCourses = prerequisiteCourses
                .filter((el) => el.course && !el.isDeleted)
                .map((el) => el.course);
            if (deletablePrerequisiteCourses.length) {
                yield course_model_1.Course.findByIdAndUpdate(id, {
                    $pull: {
                        prerequisiteCourses: {
                            course: { $in: deletablePrerequisiteCourses },
                        },
                    },
                }, {
                    session,
                });
            }
            if (creatablePrerequisiteCourses.length) {
                for (let i = 0; i < creatablePrerequisiteCourses.length; i++) {
                    const course = yield course_model_1.Course.findById(creatablePrerequisiteCourses[i]);
                    if (!course) {
                        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Prerequisite course with id "${creatablePrerequisiteCourses[i]}" not found`);
                    }
                }
                yield course_model_1.Course.findByIdAndUpdate(id, {
                    $addToSet: {
                        prerequisiteCourses: {
                            $each: creatablePrerequisiteCourses.map((el) => ({
                                course: el,
                            })),
                        },
                    },
                }, {
                    session,
                });
            }
        }
        yield session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
    const updatedCourse = yield course_model_1.Course.findById(id).populate('prerequisiteCourses.course');
    return updatedCourse;
});
const DeleteCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.Course.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    if (!course) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Course not found');
    }
});
const AssignFacultyToCourse = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.Course.findById(id);
    if (!course) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Course not found');
    }
    const result = yield course_model_1.CourseFaculty.findByIdAndUpdate(id, {
        course: id,
        $addToSet: {
            faculties: {
                $each: payload,
            },
        },
    }, {
        upsert: true,
        new: true,
        runValidators: true,
    });
    return result;
});
const RemoveFacultyFromCourse = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.Course.findById(id);
    if (!course) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Course not found');
    }
    const result = yield course_model_1.CourseFaculty.findByIdAndUpdate(id, {
        $pull: {
            faculties: {
                $in: payload,
            },
        },
    }, {
        new: true,
        runValidators: true,
    });
    return result;
});
const CourseService = {
    CreateCourse,
    GetCourses,
    GetCourseById,
    UpdateCourse,
    DeleteCourse,
    AssignFacultyToCourse,
    RemoveFacultyFromCourse,
};
exports.default = CourseService;
