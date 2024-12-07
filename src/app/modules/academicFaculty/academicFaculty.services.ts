import { AcademicSemesterInterface } from '../academicSemester/academicSemester.interface';
import { AcademicFaculty } from './academicFaculty.model';

const CreateAcademicFaculty = async (payload: AcademicSemesterInterface) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const GetAcademicFaculties = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const GetAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const UpdateAcademicFaculty = async (
  id: string,
  payload: AcademicSemesterInterface,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const AcademicFacultyService = {
  CreateAcademicFaculty,
  GetAcademicFaculties,
  GetAcademicFaculty,
  UpdateAcademicFaculty,
};

export default AcademicFacultyService;
