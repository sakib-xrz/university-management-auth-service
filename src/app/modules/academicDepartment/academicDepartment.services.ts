import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicDepartmentInterface } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const CreateAcademicDepartment = async (
  payload: AcademicDepartmentInterface,
) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const GetAcademicDepartments = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

const GetAcademicDepartment = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No academic department found');
  }
  return result;
};

const UpdateAcademicDepartment = async (
  id: string,
  payload: Partial<AcademicDepartmentInterface>,
) => {
  if (payload.name) {
    const isAcademicDepartmentExistsWithPayloadName =
      await AcademicDepartment.findOne({
        _id: { $ne: id },
        name: payload.name,
      });

    if (isAcademicDepartmentExistsWithPayloadName) {
      throw new AppError(
        httpStatus.CONFLICT,
        'This academic department is already exist!',
      );
    }
  }

  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No academic department found');
  }

  return result;
};

const AcademicDepartmentService = {
  CreateAcademicDepartment,
  GetAcademicDepartments,
  GetAcademicDepartment,
  UpdateAcademicDepartment,
};

export default AcademicDepartmentService;
