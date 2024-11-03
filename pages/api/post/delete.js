import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, ans){

    if(req.method =='DELETE'){
        const db = (await connectDB).db("forum")
        let result = await db.collection('post').deleteOne(
                    { _id: new ObjectId(req.body) })

        console.log(result)
        try{
            if(result.deletedCount == 1){ //삭제가 정상적으로 처리되면
                ans.status(200).redirect('/list')
            }
            
        }catch(error){
            return ans.status(500).json("서버 에러")
        }
        
    }
}

/*
만약 AJAX로 JSON.stringify({number : 123}) 과 같이 객체형 변수를 서버로 줄때
서버페이지에서는 JSON.parse(요청.body).number 식으로 받아야함
 */