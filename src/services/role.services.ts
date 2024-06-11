import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import {IRole} from "../interface/roles.interface";
import RoleModel from "../model/role.model";

export async function getAllRole() {
    return await RoleModel.find();
}

export async function findRoleById(id: string) {
    return await RoleModel.findById(id);
}
export async function findRoleByName(name: string) {
    return await RoleModel.findOne({ name: name });
}

export async function findRole(
    query: FilterQuery<IRole>,
    options: QueryOptions = { lean: true }
): Promise<IRole | null> {
    return await RoleModel.findOne(query, {}, options);
}

export async function createRoles(roleData: Partial<IRole>) {
    try {
        const result = await RoleModel.create(roleData);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}

export async function deleteRoleById(id: string) {
    return await RoleModel.deleteOne({ _id: id });
}

export async function updateRoleById(
    id: string,
    update: UpdateQuery<IRole>,
    options: QueryOptions = { new: true }
) {
    try {
        const result = await RoleModel.findByIdAndUpdate(id, update, options);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}
