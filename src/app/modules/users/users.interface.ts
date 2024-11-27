export interface UsersInterface {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'FACULTY' | 'STUDENT';
  status: 'ACTIVE' | 'BLOCKED';
  isDeleted: boolean;
}
