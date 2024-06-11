import express from 'express';
import {
    createRole,
    getAllRoles,
    getRoleById,
} from '../controller/role/index.role.controller';


const router = express.Router();

// Create a new role
router.post('/',  createRole);

// Get all roles
router.get('/',  getAllRoles);

// Get role by ID
router.get('/:id',  getRoleById);


export default router;
