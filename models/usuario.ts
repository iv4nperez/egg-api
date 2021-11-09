import mongoose, { Schema } from 'mongoose';
import { IUsuario } from '../interfaces'

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ]
    },
    apellido: {
        type: String,
        required: [ true, 'El apellido es obligatorio' ]
    },
    dni: {
        type: String,
        required: [ true, 'El dni es obligatorio' ]
    },
    correo: {
        type: String,
        required: [ true, 'El correo es obligatorio' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es obligatoria' ],
    },
    creadoPor: {
        type: String,
        required: [ true, 'El creadoPor es obligatorio' ]
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default:true,
    },
    google: {
        type: Boolean,
        default:false,
    }

});

export default mongoose.model<IUsuario>('Usuario', UsuarioSchema);