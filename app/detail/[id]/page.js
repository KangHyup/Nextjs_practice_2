import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function Detial(props){

    let client = await connectDB
    const db = client.db('forum')
    let result = await db.collection('post').findOne({ _id : new ObjectId(props.params.id)})
    console.log("@@@@@@@@params: "+result._id)
    return(
        <div>
            <h1>글제목: {result ? result.title : '데이터 없음'}</h1>
            <p>내용: {result ? result.content : '내용이 없습니다.'}</p>
        </div>
    )
}