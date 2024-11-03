

import { MongoClient } from 'mongodb'
const url = process.env.MONGODB_URL
const options = { useNewUrlParser: true }
let connectDB

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect() //여기가 핵심(나머지는 개발 단계를 수월하게 하기 위함)
}
export { connectDB }