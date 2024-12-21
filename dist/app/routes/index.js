"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const student_routes_1 = require("../modules/student/student.routes");
const faculty_routes_1 = require("../modules/faculty/faculty.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const academicSemester_routes_1 = require("../modules/academicSemester/academicSemester.routes");
const academicFaculty_routes_1 = require("../modules/academicFaculty/academicFaculty.routes");
const academicDepartment_routes_1 = require("../modules/academicDepartment/academicDepartment.routes");
const course_routes_1 = require("../modules/course/course.routes");
const semesterRegistration_routes_1 = require("../modules/semesterRegistration/semesterRegistration.routes");
const offeredCourse_routes_1 = require("../modules/offeredCourse/offeredCourse.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/students',
        route: student_routes_1.StudentRoutes,
    },
    {
        path: '/faculties',
        route: faculty_routes_1.FacultyRoutes,
    },
    {
        path: '/admins',
        route: admin_routes_1.AdminRoutes,
    },
    {
        path: '/academic-semesters',
        route: academicSemester_routes_1.AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculties',
        route: academicFaculty_routes_1.AcademicFacultyRoutes,
    },
    {
        path: '/academic-departments',
        route: academicDepartment_routes_1.AcademicDepartmentRoutes,
    },
    {
        path: '/courses',
        route: course_routes_1.CourseRoutes,
    },
    {
        path: '/semeter-registration',
        route: semesterRegistration_routes_1.SemesterRegistrationRoutes,
    },
    {
        path: '/offerd-courses',
        route: offeredCourse_routes_1.OfferedCourseRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
