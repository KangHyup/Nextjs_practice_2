import { connectDB } from "/util/database.js"
import { ObjectId } from 'mongodb';

export default async function Detail(props){ //prorps: 유저가 폴더명/[]안에 입력한 값을 받을 수 있음

    console.log(props)

    let client = await connectDB;
    const db = client.db('forum');
    let result = await db.collection('post').findOne({ _id : new ObjectId(props.params.id)}) //params주의!

    return(
        <div>
            <h4>{result.title}</h4>
            <p>{result.content}</p>
        </div>
    )
}

/*
    dyanmaic route ~페이지를 유동적으로 만들고 싶을때~
        1. 만드는 이유: 게시글 페이지를 100개 1000개 만들때 페이지를 일일히 폴더에 넣지 않기 위해서
        2. 만드는법: 임의의 폴더안에 [어쩌구]폴더를 생성
        3. 작동 과정: 폴더명/[어쩌구]에서 어쩌구 부분이 뭐가오든 폴더명 안의 페이지를 보여줌   
        ex)경로가 detail/1 이던 detial/12345 이던 현재 페이지가 나옴 
*/