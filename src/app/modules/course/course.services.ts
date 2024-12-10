import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Course } from './course.model';
import { CourseInterface } from './course.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import CourseConstants from './course.constant';

const CreateCourse = async (payload: CourseInterface) => {
  if (payload.prerequisiteCourses && payload.prerequisiteCourses.length) {
    for (let i = 0; i < payload.prerequisiteCourses.length; i++) {
      const course = await Course.findById(
        payload.prerequisiteCourses[i].course,
      );
      if (!course) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Prerequisite course with id "${payload.prerequisiteCourses[i].course}" not found`,
        );
      }
    }
  }

  const existingCourse = await Course.findOne({
    title: payload.title,
  });

  if (existingCourse) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Course with title '${payload.title}' already exists`,
    );
  }

  const course = await Course.create(payload);
  return course;
};

const GetCourses = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('prerequisiteCourses.course'),
    query,
  )
    .search(CourseConstants.CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const courses = await courseQuery.modelQuery.exec();
  const total = await courseQuery.getCountQuery();
  const { page, limit } = courseQuery.getPaginationInfo();

  return {
    data: courses,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const GetCourseById = async (id: string) => {
  const course = await Course.findById(id).populate(
    'prerequisiteCourses.course',
  );

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  return course;
};

const UpdateCourse = async (id: string, payload: Partial<CourseInterface>) => {
  const course = await Course.findById(id);

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  const { prerequisiteCourses, ...restUpdatedFields } = payload;

  await Course.findByIdAndUpdate(
    id,
    {
      ...restUpdatedFields,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (prerequisiteCourses && prerequisiteCourses.length) {
    const deletablePrerequisiteCourses = prerequisiteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);

    const creatablePrerequisiteCourses = prerequisiteCourses
      .filter((el) => el.course && !el.isDeleted)
      .map((el) => el.course);

    if (deletablePrerequisiteCourses.length) {
      await Course.findByIdAndUpdate(id, {
        $pull: {
          prerequisiteCourses: {
            course: { $in: deletablePrerequisiteCourses },
          },
        },
      });
    }

    if (creatablePrerequisiteCourses.length) {
      for (let i = 0; i < creatablePrerequisiteCourses.length; i++) {
        const course = await Course.findById(creatablePrerequisiteCourses[i]);
        if (!course) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            `Prerequisite course with id "${creatablePrerequisiteCourses[i]}" not found`,
          );
        }
      }

      await Course.findByIdAndUpdate(id, {
        $addToSet: {
          prerequisiteCourses: {
            $each: creatablePrerequisiteCourses.map((el) => ({
              course: el,
            })),
          },
        },
      });
    }

    const updatedCourse = await Course.findById(id).populate(
      'prerequisiteCourses.course',
    );

    return updatedCourse;
  }
};

const DeleteCourse = async (id: string) => {
  const course = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }
};

const CourseService = {
  CreateCourse,
  GetCourses,
  GetCourseById,
  UpdateCourse,
  DeleteCourse,
};

export default CourseService;
