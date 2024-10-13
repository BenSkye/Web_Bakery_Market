import dotenv from 'dotenv';
dotenv.config();
import { createClient } from 'redis';
import inventoryRepo from '../repositories/inventory.repo';

console.log('REDIS_URL:', process.env.REDIS_URL);
const redisClient = createClient({
    url: process.env.REDIS_URL,
    socket: {
        tls: true,
        rejectUnauthorized: false
    }
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await redisClient.connect();
})();


const acquireLock = async (productId: string, quantity: number) => {
    const key = `lock_v2024:${productId}`;
    const retryTimes = 10;
    const expireTime = 30000;

    for (let i = 0; i < retryTimes; i++) {
        //create 1 key, which user has can go to checkout
        console.log('key:::', key);
        const result = await redisClient.setNX(key, expireTime.toString());
        console.log(`result:::`, result);
        if (result === true) {
            //work with inventory
            const isReservation = await inventoryRepo.reserveProductInventory(productId, quantity);
            console.log('isReservation:::', isReservation);
            if (isReservation.modifiedCount === 1) {
                const result = await redisClient.pExpire(key, expireTime);
                console.log('result:::', result);
                return key
            }
            return null;
        } else {
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
}

const releaseLock = async (key: string) => {
    return await redisClient.del(key);
}

export { acquireLock, releaseLock };
