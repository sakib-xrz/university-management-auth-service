"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const admin_model_1 = require("./admin.model");
const admin_constant_1 = __importDefault(require("./admin.constant"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../user/user.model");
const GetAdmins = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const adminQuery = new QueryBuilder_1.default(admin_model_1.Admin.find(), query)
        .search(admin_constant_1.default.AdminSearchableFields)
        .sort()
        .paginate()
        .fields();
    const admins = yield adminQuery.modelQuery.exec();
    const total = yield adminQuery.getCountQuery();
    const { page, limit } = adminQuery.getPaginationInfo();
    return {
        data: admins,
        meta: {
            total,
            page,
            limit,
        },
    };
});
const GetAdminById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.Admin.findOne({
        id,
    });
    if (!admin) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found');
    }
    return admin;
});
const UpdateAdmin = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const faculty = yield admin_model_1.Admin.findOne({ id });
    if (!faculty) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found');
    }
    const { name } = payload, reamingFields = __rest(payload, ["name"]);
    const modifiedPayload = Object.assign({}, reamingFields);
    if (name && Object.keys(name).length > 0) {
        for (const [key, value] of Object.entries(name)) {
            modifiedPayload[`name.${key}`] = value;
        }
    }
    const updatedAdmin = yield admin_model_1.Admin.findOneAndUpdate({ id }, modifiedPayload, {
        new: true,
        runValidators: true,
    });
    return updatedAdmin;
});
const DeleteAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.Admin.findOne({ id });
    if (!admin) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedAdmin = yield admin_model_1.Admin.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, runValidators: true, session });
        if (!deletedAdmin) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete admin');
        }
        const user = yield user_model_1.User.findOneAndUpdate({ id: admin.id }, { isDeleted: true }, { new: true, runValidators: true, session });
        if (!user) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete user');
        }
        yield session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const AdminService = { GetAdmins, GetAdminById, UpdateAdmin, DeleteAdmin };
exports.default = AdminService;
