import Role  from '../models/role'
import Usuario  from '../models/usuario'

export const esRoleValido = async ( rol = '' ) => {

    const existeRol = await Role.findOne({ rol })
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la DB.`)
    }
}

export const existeEmail = async ( correo = '' ) => {
    console.log(correo)
    const existe = await Usuario.findOne({ correo });

    if(existe){
        throw new Error(`El correo ${ correo }, ya esta registrado .`)
    }
}   

export const existeUsuarioPorId = async ( id: string ) => {

    const existeUsuario = await Usuario.findById({ _id : id });
    
    if( !existeUsuario ){
        throw new Error(`El id ${ id }, no existe.`)
    }
}   
    
