import { MongoClient } from 'mongodb';
const url = process.env.MONGODB_URL;
let connectDB;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect(); // 옵션 제거
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url).connect(); // 옵션 제거
}

export { connectDB };
