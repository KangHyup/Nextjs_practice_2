/*서버로부터 데이터를 받고 DB갱신하기 */
import{connectDB} from "@/util/database"
import { ObjectId } from 'mongodb'


export default async function handler(요청, 응답){

    if(요청.method == 'POST'){ //글작성

        if(요청.body.title ==''){ // 입력이 공백일 시
            return 응답.status(500).json('너 왜 제목 안씀')
        }
        else if(요청.body.content ==''){
            return 응답.status(500).json('너 왜 내용 안씀')
        }

        try{ //시도하고
            const db = (await connectDB).db("forum")
            await db.collection('post').insertOne(요청.body) //DB에 새로운 도큐먼트 생성
            return 응답.status(200).redirect('/list')
        } catch(error) { //에러가 나면 밑에 코드 실행
            return 응답.status(500).json('서버 에러')
        }
        
    }
}