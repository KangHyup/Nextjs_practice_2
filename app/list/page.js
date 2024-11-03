import { connectDB } from '@/util/database';

export default async function List(){

    let client = await connectDB
    const db = client.db('forum')
    let result  = await db.collection('post').find().toArray()

    return(
        <div className='list-bg'>
        {
            result.map((obj, i) => {
                if(obj.title !="") //제목이 공백이 아니라면
                    return(
                            <div className='list-item' key = {i}>
                                <h4>{obj.title}</h4>
                                <p>{obj.content}</p>
                            </div>
                            )
            })
        }
        </div>
    )
}