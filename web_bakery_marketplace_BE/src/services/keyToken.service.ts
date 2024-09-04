import { Hash } from "crypto"
import { keyModel } from "../models/keytoken.model"
import { ObjectId, Types } from "mongoose"
import crypto from 'crypto';


class KeyTokenService {
    static createKeyToken = async (userId: Types.ObjectId, publicKey: string, privateKey: string) => {
        try {
            const tokens = await keyModel.create({
                user: userId,
                publicKey,
                privateKey
            })
            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }
}

export default KeyTokenService