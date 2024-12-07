import { AcademicDepartmentInterface } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const CreateAcademicDepartment = async (
  payload: AcademicDepartmentInterface,
) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const AcademicDepartmentService = { CreateAcademicDepartment };

export default AcademicDepartmentService;
