import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import InternalServerError from "../../errors/internalServer.errors";
import { ErrorCode } from "../../errors/custom.errors";
import {getAllRole, findRoleById} from "../../services/role.services"

// Get all roles
export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await getAllRole();
        res.status(200).json({ roles, success: true });
    } catch (error) {
        throw new InternalServerError("Failed to fetch roles", ErrorCode.INTERNAL_SERVER);
    }
};

// Get role by ID
export const getRoleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const role = await findRoleById(id);
        if (!role) {
            throw new NotFoundError('Role not found', ErrorCode.NOT_FOUND);
        }
        res.status(200).json({ role, success: true });
    } catch (error) {
        throw new InternalServerError(`Failed to fetch role with ID: ${id}`, ErrorCode.INTERNAL_SERVER);
    }
};