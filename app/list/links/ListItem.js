
'use client'
import axios from 'axios';
import Link from 'next/link';
import {useRouter} from 'next/navigation' //next/router가 경로로 되어있으면 안됨!

/**
 * list에 게시글을 반복문으로 띄워주는 함수
 * @param {Object} result 게시글 DB 
 * @return 게시글제목 + 게시글 내용, 수정버튼, 삭제버튼
 */
export default async function ListItem({result}){ //이러면 props라는 변수명대신 result 사용

    let router = useRouter()
    let link;

    return(
        <div>
            { result.map((obj, i)=>{
                if(obj.title!=""){
                    link = "/detail/"+obj._id.toString();
                    return(
                        <div className='list-item'>
                            <Link prefetch={false} href={link}>{obj.title}</Link>
                            <p>{obj.content}</p>
                            <button onClick={ ()=>
                                {router.push('/edit/'+obj._id.toString())}} /*수정 페이지로 이동하는 버튼 */
                                className='button'>수정✏️</button>
                            <span onClick={ (e)=>{
                                axios({
                                    method: 'DELETE',
                                    url: '/api/post/delete', // 서버 API 엔드포인트 URL
                                    data: obj._id.toString()
                                    
                                })
                                .then(function (response) {// 응답 데이터 처리
                                    console.log(response.data);
                                    e.target.parentElement.style.opacity = 0 //버튼 눌린 div의 투명도를 0으로 변경
                                    setTimeout(()=>{ // 1초뒤에 눌린 div박스 사라지게
                                        e.target.parentElement.style.display = 'none'
                                    }, 1000)
                                })
                                .catch(function (error) {//axios에서 에러 처리

                                    if (error.response) { //status응답이 200외일때 즉, 응답이 비정상일때
                                        console.log(error.response.data);
                                        console.log(error.response.status);
                                        console.log(error.response.headers);
                                    } else if (error.request) { //요청을 보냈는데 응답이 없을떄
                                        console.log(error.request);
                                    } else {//요청중 오류가 발생했을 때
                                        console.log('Error', error.message);
                                    }
                                    console.log(error.config);
                                });
                            }}>🗑️</span>
                        </div>
                    )
                }

            })}
        </div>
    )
}

/*
AJAX를 사용해서 fetch하는 방법
1.
fetch('/api/post/delete', {
        method : 'DELETE',
        body : obj._id.toString()
    })
    .then((r)=>{
        if(r.status == 200){
            return r.json()
        }
        else{ //서버가 에러코드 전송시 실행할 코드 ex) status(500)
            
        }
    })
    .then((result)=>{ //성공시 실행할 코드
        
    }).catch((error) =>{ //인터넷 문제로 실패시 실행할 코드
        
        console.log(error);
    });
2.
fetch('/경로?데이터이름=데이터값&데이터이름2=데이터값2')
2번 장점) 간편함, GET요청에도 데이터 전송가능
단점) 데이터 많으면 더러움, URL이 노출되서 민감한 정보는 X
*/

/* 
    *TMI*
클라 컴포넌트에서 DB를 직접선언하면 위험하기 때문에
다음과 같은 방법 사용할 수도 있음
    useEffect(()=>{
        서버에 DB요청하는 코드
        result = DB게시물
    })
단점) 검색 노출이 어려움
해결책) props 쓰자
*/