import { NextFunction, Request, Response } from "express"
import { findById } from "../services/apiKey.service"
import { BadRequestError } from "../core/error.response"

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}
const apiKey = async (req: any, res: Response, next: NextFunction) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        if (!key) {
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        //check obj key
        const objKey = await findById(key)
        if (!objKey) {
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }

        req.objectKey = objKey;
        return next()
    } catch (error) {

    }
}


const permission = (permission: any) => {
    return (req: any, res: any, next: any) => {
        if (!req.objectKey.permissions) {
            return res.status(403).json({
                message: 'permission denied'
            })
        }
        console.log('permission::', req.objectKey.permissions)
        const validPermission = req.objectKey.permissions.includes(permission)
        if (!validPermission) {
            return next(new BadRequestError());
            // return res.status(403).json({
            //     message: 'permission denied'
            // })
        }

        return next()
    }
}



export { apiKey, permission }