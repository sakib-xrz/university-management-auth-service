import { AcademicSemesterInterface } from '../academicSemester/academicSemester.interface';
import { AcademicFaculty } from './academicFaculty.model';

const CreateAcademicFaculty = async (payload: AcademicSemesterInterface) => {
  const result = await AcademicFaculty.create(payload);

  return result;
};

const AcademicFacultyService = { CreateAcademicFaculty };

export default AcademicFacultyService;
