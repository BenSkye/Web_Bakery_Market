import { userModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { createTokenPair, verifyJWT } from '../auth/authUtils';
import { getInfoData } from '../utils';
import { AuthFailureError, BadRequestError, ForbiddenError, NotFoundError } from '../core/error.response';
import { keyModel } from "../models/keytoken.model"
import { JwtPayload } from 'jsonwebtoken';


//import service
import KeyTokenService from './keyToken.service';
import { findByEmail } from './user.service';
import { createKey, findByUserId } from './apiKey.service';
const RoleUser = {
  MEMBER: 'member',
  ADMIN: 'admin',
  SHOP: 'shop',
};

class AccessService {
  static handlerRefreshToken = async (user: any, keyStore: any, refreshToken: string) => {
    const { userId, email } = user;
    if (keyStore.refreshTokensUsed.includes(refreshToken)) {
      await KeyTokenService.deleteKeyByUserId(userId)
      throw new ForbiddenError(' Something wrong happend !! Pls relogin')
    }
    if (keyStore.refreshToken !== refreshToken) {
      throw new AuthFailureError(' User not registered')
    }
    const foundShop = await findByEmail(email)

    if (!foundShop) throw new AuthFailureError(' User not registeted')
    // create 1 cap moi
    const tokens = await createTokenPair({ userId, email }, keyStore.publicKey, keyStore.privateKey) as any
    //update token
    await KeyTokenService.updateRefreshTokensUsed(tokens.refreshToken, refreshToken)

    return {
      user,
      tokens
    }

  }


  static logout = async (keyStore: any) => {
    const delKey = await KeyTokenService.removeKeyById(keyStore._id);
    console.log('delKey', delKey);
    return delKey;
  }

  /*
   1 check email in dbs
   2- match password
   3- create AT vs RT and save
   4 generate tokens
   5 get data return login
   */
  static login = async (email: string, password: string, refreshToken = null) => {
    //1 check email in dbs
    const foundUser = await findByEmail(email);
    if (!foundUser) {
      throw new BadRequestError('User not Registered');
    }
    //2- match password
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      throw new AuthFailureError('Password not match');
    }
    //3- create AT vs RT and save
    const privateKey = crypto.randomBytes(64).toString('hex');
    const publicKey = crypto.randomBytes(64).toString('hex');
    //4 generate tokens
    const tokens = await createTokenPair({ userId: foundUser._id, email }, publicKey.toString(), privateKey.toString());

    if (!tokens) {
      throw new BadRequestError('Create Token Fail');
    }

    await KeyTokenService.createKeyToken(foundUser._id, publicKey.toString(), privateKey.toString(), (tokens as { refreshToken: string }).refreshToken);
    const apiKey = await findByUserId(foundUser._id);
    if (!apiKey) {
      throw new NotFoundError('API Key not found');
    }
    return {
      user: getInfoData({ fields: ['_id', 'name', 'email'], object: foundUser }),
      tokens,
      apiKey: apiKey.key
    }
  }

  static signup = async ({ name, email, password, role }: { name: string, email: string, password: string, role: string }) => {
    //step1: check email exist
    const holderUser = await userModel.findOne({ email }).lean();
    console.log('exist', holderUser)
    if (holderUser) {
      throw new BadRequestError('Email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: passwordHash,
      roles: [role] || [RoleUser.MEMBER],
    });

    if (newUser) {
      const privateKey = crypto.randomBytes(64).toString('hex');
      const publicKey = crypto.randomBytes(64).toString('hex');
      console.log({ privateKey, publicKey }); //save collection KeyStore
      const keyStore = await KeyTokenService.createKeyToken(newUser._id, publicKey.toString(), privateKey.toString(), '');
      if (!keyStore) {
        throw new BadRequestError('keyStore not found');
      }


      //create token pair
      const tokens = await createTokenPair({ userId: newUser._id, email }, publicKey.toString(), privateKey.toString());
      console.log('Create Token Success', tokens);
      const apiKey = await createKey(newUser.roles, newUser._id);
      if (!apiKey) {
        throw new BadRequestError('Create API Key Fail');
      }
      return {
        user: getInfoData({ fields: ['_id', 'name', 'email', 'roles'], object: newUser }),
        tokens,
        apiKey: apiKey.key
      }
    }
    return {
      code: 200,
      metadata: null
    }

  };
}

export default AccessService;
