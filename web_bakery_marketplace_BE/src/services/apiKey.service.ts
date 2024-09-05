import { apiKeyModel } from "../models/apiKey.model"
import crypto from 'crypto'
const findById = async (key: string) => {
    // const newKey = await apiKeyModel.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['customer'] })
    // console.log(newKey)

    const objKey = await apiKeyModel.findOne({ key, status: true }).lean()
    return objKey
}

export { findById }