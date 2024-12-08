import { AcademicSemesterInterface } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const generateStudentId = async (
  academicSemester: AcademicSemesterInterface,
) => {
  const currentYear = new Date().getFullYear().toString();
  const semesterCode = academicSemester.code;

  let currentId = '0001';

  const lastStudent = await User.findOne({
    role: 'STUDENT',
  })
    .select({
      id: 1,
      _id: 0,
    })
    .sort({ createdAt: -1 })
    .limit(1)
    .lean();

  if (lastStudent) {
    const lastStudentId = lastStudent.id;
    const lastStudentYear = lastStudentId.slice(0, 4);
    const lastStudentSemesterCode = lastStudentId.slice(5, 7);
    const lastStudentIdNumber = lastStudentId.slice(8);

    if (
      lastStudentYear === currentYear &&
      lastStudentSemesterCode === semesterCode
    ) {
      const newIdNumber = parseInt(lastStudentIdNumber, 10) + 1;
      currentId = newIdNumber.toString().padStart(4, '0');
    } else {
      currentId = '0001';
    }
  }

  return `${currentYear}-${semesterCode}-${currentId}`;
};

const generateFacultyId = async () => {
  let currentId = '0001';

  const lastFaculty = await User.findOne({
    role: 'FACULTY',
  })
    .select({
      id: 1,
      _id: 0,
    })
    .sort({ createdAt: -1 })
    .limit(1)
    .lean();

  if (lastFaculty) {
    const lastFacultyId = lastFaculty.id;
    const lastFacultyIdNumber = lastFacultyId.slice(2);

    const newIdNumber = parseInt(lastFacultyIdNumber, 10) + 1;
    currentId = newIdNumber.toString().padStart(4, '0');
  }

  return `F-${currentId}`;
};

const UserUtils = { generateStudentId, generateFacultyId };

export default UserUtils;
