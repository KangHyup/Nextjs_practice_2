import { connectDB } from '@/util/database';

export default async function handler(요청, 응답){
    if(요청.method =='POST'){ //회원가입

        if(요청.body.user_id ==''){
            return 응답.status(500).json('너 왜 아이디 안씀')
        }
        else if(요청.body.user_pwd ==''){
            return 응답.status(500).json('너 왜 비번 안씀')
        }

        const db = (await connectDB).db("forum")
        let userData = await db.collection('userInfo').find().toArray()

        for(let i = 0; i<userData.length; i++){ //아이디 중복방지
            if(요청.body.user_id == userData[i].user_id){
                return 응답.status(500).json("이미 있는 아이디야")
            }
        }

        try{
            await db.collection('userInfo').insertOne(요청.body)
            return 응답.status(200).json('회원가입 완료')
        }catch(error){
            return 응답.status(500).json('에러남 새로고침ㄱㄱ')
        }
    }

}