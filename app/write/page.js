

export default function Write(){

    return(
        <div className='p-20'>
            <h1> 글작성 </h1>
            <form action="/api/post/new" method='POST'>
                <input name="title" placeholder='글제목'></input><br/>
                <input name="content" placeholder='글내용'></input><br/>
                <button type="submit">버튼</button>
            </form>
        </div>
    )
}
/*
    ~서버에 POST요청을 하고 싶을 때~
    1. <form>태그를 쓴다
    2. action="/경로"를 쓰면 해당 경로로 메세지를 보냄
    3. method='메세지 종류'를 써서 요청.method를 POST로 설정
    4. <input>태그를 쓰면 사용자가 입력할 수 있는 입력바 생성
    5. name="어쩌구"으로 body.어쩌구 형식으로 서버에 전송
    6. placeholder로 입력바에 가이드라인 제공
*/