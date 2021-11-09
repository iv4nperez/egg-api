import mongoose, { Schema } from 'mongoose';
import { IRole } from '../interfaces'

const RoleSchema = new Schema({
    rol:{
        type:String,
        required: [true, 'El rol es obligatorio']
    }
});

export default mongoose.model<IRole>('Role', RoleSchema);