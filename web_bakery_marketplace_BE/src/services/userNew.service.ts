import { userModel } from "../models/user.model";
import moment from 'moment';


class UserNewService {
    static getAllUserByRole = async (role: string) => {
        return await userModel.find({ roles: role }).lean();
    };
    static getStatisUser = async () => {
        const now = moment();
        const startOfDay = now.startOf('day').toDate();
        const startOfWeek = now.startOf('week').toDate();
        const startOfMonth = now.startOf('month').toDate();

        const [totalUsers, newUsersToday, newUsersThisWeek, newUsersThisMonth, activeUsers, inactiveUsers] = await Promise.all([
            userModel.countDocuments(),
            userModel.countDocuments({ createdAt: { $gte: startOfDay } }),
            userModel.countDocuments({ createdAt: { $gte: startOfWeek } }),
            userModel.countDocuments({ createdAt: { $gte: startOfMonth } }),
            userModel.countDocuments({ status: 'active' }),
            userModel.countDocuments({ status: 'inactive' })
        ]);

        return {
            totalUsers,
            newUsersToday,
            newUsersThisWeek,
            newUsersThisMonth,
            activeUsers,
            inactiveUsers
        };
    };
}

export default UserNewService;