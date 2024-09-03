import mongoose from 'mongoose';
import { countConnect } from '../helpers/check.connect';
import config from '../configs/config.mongodb';
const { host, port, name } = config.db;
const connectString = `mongodb://${host}:${port}/${name}`;
console.log(connectString);
class Database {
  private static instance: Database;

  constructor() {
    this.connect();
  }
  //connect
  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose
      .connect(connectString)
      .then((_) => {
        countConnect();
        console.log('Connected to MongoDB');
      })
      .catch((err) => console.error('Error connecting to MongoDB!', err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
const instanceMongodb = Database.getInstance();

export default instanceMongodb;
