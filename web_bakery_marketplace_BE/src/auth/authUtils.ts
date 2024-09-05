
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const createTokenPair = async (payload: Object, publicKey: string, privateKey: string) => {
    try {
        const accessToken = await jwt.sign(payload, publicKey,
            { expiresIn: '2 days' });
        const RefreshToken = await jwt.sign(payload, privateKey,
            { expiresIn: '7 days' });

        //
        jwt.verify(accessToken, publicKey, (err: any, decoded: any) => {
            if (err) {
                console.error('error::', err)
            } else {
                console.log('decoded::', decoded)
            }
        })

        return { accessToken, RefreshToken }


    } catch (error) {
        return error
    }
}

export { createTokenPair }