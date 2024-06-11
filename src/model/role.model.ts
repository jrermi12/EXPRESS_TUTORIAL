import { Schema, model } from 'mongoose';
import { IRole } from '../interface/roles.interface';

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true, index: true }, // e.g., Cashier, Admin
  permissions: [{ type: String, required: true }], // List of permissions, e.g., ['VIEW_ORDERS', 'MANAGE_INVENTORY']
  grantAll: { type: Boolean, default: false },
}, { timestamps: true });

export default model<IRole>('Role', roleSchema);