import { Request } from 'express'

export interface IResquest extends Request {
    usuario: any
}