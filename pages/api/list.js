/*서버 기능*/
import { connectDB } from "/util/database.js"

export default async function handler(req, ans){

    let client = await connectDB;
    const db = client.db('forum');
    let result = await db.collection('post').find().toArray();

    if(req.method =='GET')
        ans.status(200).json(result)
    
    else if(req.method =='POST')
        return ans.status(200).json("수정 완료")
}

/*

*/