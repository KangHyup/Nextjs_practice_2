/*서버로부터 데이터를 받고 DB갱신하기 */

import{connectDB} from "@/util/database"
import { ObjectId } from 'mongodb'

export default async function handler(요청, 응답){
    console.log(요청.body)

     if(요청.method == 'POST'){ //데이터 수정

        if(요청.body.title==''){
            return 응답.status(500).json("왜 글제목 안써")
        }
        if(요청.body.content==''){
            return 응답.status(500).json("왜 글내용 안써")
        }

        try{
            let 바꿀꺼 = {
                title : 요청.body.title, 
                content : 요청.body.content
            }
            //document 수정은 updateOne()
            //await db.collection('DB 컬렉션 이름').updateOne({어떤 document 수정할지},{$set : {수정할 내용}})
            //                                                                        {$inc : {수정할 내용}}) <- 값 증감만 해줌
            const db = (await connectDB).db("forum")
            await db.collection('post').updateOne(
                {_id: new ObjectId(요청.body._id)},
                {$set : 바꿀꺼}
            )
            return 응답.status(200).redirect('/list')
        }catch(error){
            return 응답.status(500).json('서버 에러')
        }
    }
    
}

/* *참고*
HTML표준에서 <form> method는 GET이랑 POST밖에 지원안함
그 외에 method를 사용하려면 method-override 라이브러리르 다운받고 문법에 맞게 사용하거나
AJAX를 사용해야함 ,DELETE사용할때 쓴 이거▽
                fetch('/api/post/delete', {
                                method : 'DELETE',
                                body : obj._id.toString()
                            })
                            .then(()=>{
                                console.log("요청완료후 돌아옴")
                            }))
 */