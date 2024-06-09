import { FilterQuery, QueryOptions, Schema, UpdateQuery } from "mongoose";
import { IUser } from "../interface/user.interface";
import UserModel from "../model/user.model";
import roleModel from "../model/role.model";

export async function findAllUsers() {
    return await UserModel.find();
}

export async function findUserById(id: string) {
    return await UserModel.findById(id);
}


export const findExtendedUsers = async (userId: string) => {
    return await UserModel.findById(userId)
        .populate('role')
        .exec();
};

export async function findUserByEmail(email: string) {
    return await UserModel.findOne({ email: email });
}


export async function findUserByPhone(phoneNumber: string) {
    return await UserModel.findOne({ phoneNumber: phoneNumber });
}

export async function findUser(
    query: FilterQuery<IUser>,
    options: QueryOptions = { lean: true }
): Promise<IUser | null> {
    return await UserModel.findOne(query, {}, options);
}


export async function createUser(userData: Partial<IUser>) {
    try {
        const result = await UserModel.create(userData);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}


export async function updateUserById(
    id: string,
    update: UpdateQuery<IUser>,
    options: QueryOptions = { new: true }
) {
    try {
        const result = await UserModel.findByIdAndUpdate(id, update, options);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}

export async function deleteUserById(id: string) {
    return await UserModel.deleteOne({ _id: id });
}


