import { userModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import KeyTokenService from './keyToken.service';
import { createTokenPair } from '../auth/authUtils';
import { getInfoData } from '../utils';
const RoleUser = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  SHOP: 'SHOP',
};

class AccessService {
  static signup = async ({ name, email, password }: { name: string, email: string, password: string }) => {
    try {
      //step1: check email exist
      const holderUser = await userModel.findOne({ email }).lean();
      if (holderUser) {
        return {
          code: 'xxx',
          message: 'User already exist',
        };
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await userModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleUser.CUSTOMER],
      });

      if (newUser) {
        // create privatekey, publickey
        // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: 'pkcs1',
        //     format: 'pem',
        //   },
        //   privateKeyEncoding: {
        //     type: 'pkcs1',
        //     format: 'pem',
        //   },
        // });
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');
        console.log({ privateKey, publicKey }); //save collection KeyStore
        const keyStore = await KeyTokenService.createKeyToken(newUser._id, publicKey.toString(), privateKey.toString());
        if (!keyStore) {
          return {
            code: 'xxx',
            message: 'publicKeyString error'
          }
        }


        //create token pair
        const tokens = await createTokenPair({ userId: newUser._id, email }, publicKey.toString(), privateKey.toString());
        console.log('Create Token Success', tokens);
        return {
          code: 201,
          metadata: {
            user: getInfoData({ fields: ['_id', 'name', 'email', 'roles'], object: newUser }),
            tokens
          }
        }
      }
      return {
        code: 200,
        metadata: null
      }
    } catch (error: any) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error',
      };
    }
  };
}

export default AccessService;
