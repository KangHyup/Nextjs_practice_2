import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb';

export default async function Edit(props){ 

    let client = await connectDB
    const db = client.db('forum')
    let result = await db.collection('post').findOne({ _id : new ObjectId(props.params.id)})

    return(
        <div className='p-20'>
            <h1> 수정페이지 </h1>
            <form action="/api/post/edit" method="POST">
                <input name="title" defaultValue={result.title}/><br/>
                <input name="content" defaultValue={result.content}/><br/>
                <input name="_id" style={{display : 'none'}} defaultValue={result._id.toString()}/><br/>
                <button type="submit">수정 완료</button>
            </form>
        </div>
        
    )
}
/*
    input 태그의 defaultValue <- input안에 기본적으로 들어갈 값을 설정해줌 
    api로 보낼 데이터중 유저가 건드리지 말아야 할 정보는 display를 none으로 설정
*/