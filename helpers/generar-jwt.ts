const jwt = require('jsonwebtoken');

export const generarJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {
        const payload = { uid };
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1m'
        },( err: string, token: string )=> {
            if ( err ){
                console.log( err );
                reject( 'No se pudo generar el token' );
            }else{
                resolve( token );
            }
        })
    });
}
