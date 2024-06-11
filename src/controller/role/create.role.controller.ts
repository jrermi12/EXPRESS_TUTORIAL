import { Request, Response } from "express";
import { RoleInterface } from "../../interface/roles.interface";
import RoleModel from "../../model/role.model";
import InternalServerError from "../../errors/internalServer.errors"
import { ErrorCode } from "../../errors/custom.errors";
import { findRoleByName } from "../../services/role.services";
// Create a new role
export const createRole = async (req: Request, res: Response) => {
    try {
        const { name, permissions, grantAll }: { name: RoleInterface, permissions: string[], grantAll: boolean } = req.body;

        // Check if the role already exists
        const existingRole = await findRoleByName(name);
        if (existingRole) {
            return res.status(400).json({ message: "Role already exists", success: false });
        }

        // Create the role
        const newRole = new RoleModel({ name, permissions, grantAll });
        await newRole.save();

        res.status(201).json({ message: "Role created successfully", success: true });
    } catch (error) {
        throw new InternalServerError("Failed to create role", ErrorCode.INTERNAL_SERVER);
    }
};
