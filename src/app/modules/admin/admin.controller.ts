import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AdminService from './admin.services';

const GetAdmins = catchAsync(async (req, res) => {
  const result = await AdminService.GetAdmins(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const GetAdminById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminService.GetAdminById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin fetched successfully',
    data: result,
  });
});

const UpdateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedAdminData = req.body;
  const result = await AdminService.UpdateAdmin(id, updatedAdminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
});

const DeleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  await AdminService.DeleteAdmin(id);

  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: 'Admin deleted successfully',
  });
});

const AdminController = { GetAdmins, GetAdminById, UpdateAdmin, DeleteAdmin };

export default AdminController;
