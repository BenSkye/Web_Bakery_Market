import { userModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
const RoleUser = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  SHOP: 'SHOP',
};

class AccessService {
  static sigup = async (name: string, email: string, password: string) => {
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
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 4096,
          //   publicKeyEncoding: {
          //     type: 'spki',
          //     format: 'pem',
          //   },
          //   privateKeyEncoding: {
          //     type: 'pkcs8',
          //     format: 'pem',
          //   },
        });
        console.log({ privateKey, publicKey }); //save collection KeyStore
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
