import { userModel } from "../models/user.model";

class UserNewService {
    static getAllUserByRole = async (role: string) => {
        return await userModel.find({ roles: role }).lean();
    };
}

export default UserNewService;