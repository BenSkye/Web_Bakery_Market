import redis, { createClient } from 'redis';
import { promisify } from 'util';
import inventoryRepo from '../repositories/inventory.repo';

const redisClient = createClient({
    url: 'redis://127.0.0.1:6380'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await redisClient.connect();
})();

const pexpire = promisify(redisClient.pExpire).bind(redisClient);
const setnxAsync = promisify(redisClient.setNX).bind(redisClient);

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
