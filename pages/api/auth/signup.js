import { connectDB } from '@/util/database';
import bcrypt from 'bcrypt'

/*
    회원 가입 기능
    1. 유저에게 비번입력받아서 암호화한다음에 DB에 넣기
    2. 중복체크
    3. 너무긴 문자 or 공백 처리
*/


export default async function handler(요청, 응답){
    if(요청.method == 'POST') {
        if(요청.body.name == ''){
            응답.status(500).json('이름 써')
        }
        else if(요청.body.name.length > 10){
            응답.status(500).json('이름이 너무 긴데?')
        }
        if(요청.body.email == ''){
            응답.status(500).json('메일 써')
        }
        if(요청.body.password == ''){
            응답.status(500).json('비번 써')
        }

        let db = (await connectDB).db('forum');
        let isOverlap = await db.collection('user_cred').findOne({email: 요청.body.email})
        console.log(isOverlap)
        if(isOverlap){
            응답.status(500).json('중복 이메일이야')
        }

        let hash = await bcrypt.hash(요청.body.password, 10) //유저가 입력한 password를 암호화
        요청.body.password = hash
        
        await db.collection('user_cred').insertOne(요청.body);
        응답.status(200).json('가입 성공')
    }
}