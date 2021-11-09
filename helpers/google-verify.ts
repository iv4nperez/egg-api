import { IGoogle } from "../interfaces/IGoogle";

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );


export const googleVerify = async ( idToken = '' ): Promise<IGoogle> => {

  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { name : nombre , picture: img, email: correo } = ticket.getPayload();

  return { nombre, img, correo };

}

