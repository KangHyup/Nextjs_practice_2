//페이지 여는 명령어는 npm run dev
import Link from 'next/link';
import { connectDB } from "/util/database.js"



// 캐싱하는법 1
export const revalidate = 60; //누가 페이지 방문시 60초 동안 페이지가 캐싱

//캐싱하는 법2
/*
  let 어쩌구 =  await fetch('/api/어쩌구', {cache : "force-cache"})  //절차적으로 할
                await fetch('/URL', {cache : "no-store"})           //실시간 데이터가 중요할때 (캐시X)
                await fetch('/URL', {next:{revalidate:60}})         //캐싱한 데이터를 60초까지만 저장
*/

export default async function Home() { //async이라는 문법 추가해야함

  /*DB입출력 코드는 서버 컴포넌트에서만 쓸것!! */
  let client = await connectDB;                               // util파일의 database.js 파일을 가져옴
  const db = client.db('forum');                              // 몽고DB에서 forum에 있는 모든 데이터를 가져오는 코드
  let result = await db.collection('post').find().toArray();  // 이중 post에 있는 모든 데이터를 배열 형태로 만들어주는 코드

  return (
      <main>
        <div className='p-20'>
        <h1>메인 페이지</h1>
        <Link href={"/api/list"}>DB 봐보기</Link><br/>
        <Link href={"/api/date"}>날짜 확인</Link>
        <div style={{marginTop:"20px", display:"flex"}}>
          <form action='api/test' method='DELETE'>
            <input name='id' placeholder='ID'></input><br/>
            <input name='password' placeholder='PASSWORD'></input><br/>
            <button type='submit' style={{padding: "50px"}}>로그인</button>
          </form>
        </div>
        <br/>
        <Link href={"/register"}>회원가입</Link>
        </div>
      </main>
  )
}