import { connectDB } from '@/util/database';
import DetailLink from './links/DetailLink';
import ListItem from './links/ListItem';
import WriteLink from './links/WriteLink';


/*
npm run build 시 페이지를 dynamic으로 설정할지 static으로 할지 결정 가능

dynamic 페이지: 페이지를 불러올때 마다 새로 만들어줌, useSearchParams(), cookies(), headers()쓰면 사용
                단) DB랑 서버 부담 커짐
                해결책) 캐싱을 사용하자
static 페이지: 페이지를 미리 만들어서 불러올떄 만들어 논걸 보여줌
ex)글보여주는 페이지를 static으로 만들면 글 1억개 만들어도 build때 만들어논 페이지로 보여줌
*/
export const dynamic ='force-dynamic'
//export const dynamic ='force-static'

export default async function List(){

    let client = await connectDB
    const db = client.db('forum')
    let result = await db.collection('post').find().toArray()

    return (
        <div className='list-bg'>
            <ListItem result={result}/>
            <DetailLink/>
            <WriteLink/>
        </div>
    )
}

/*  
    <Link>에는 perfetch(페이지 미리로드)하는 기능이 미리 탑재되어 있음
    근데 이게 링크 보일때 작동하는 거라 링크많은 페이지 쓱 스크롤하면 과부하오짐
    상황에 따라 끄고 켜고 해야함
*/