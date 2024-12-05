import { Student } from './student.model';

const GetStudents = async () => {
  const students = await Student.find();
  return students;
};

const StudentService = { GetStudents };

export default StudentService;
