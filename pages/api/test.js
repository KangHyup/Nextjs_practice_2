/*
    서버 만드는법
    pages/api 폴더 생성후 원하는 js파일 생성
    요청에 따라 실행될 코드를 if문으로 작성
*/

export default function handler(요청, 응답){

    if(요청.method =='GET'){
        console.log(요청.body)
        응답.status(200).json("GET 처리완료")
    }
    
    else if(요청.method =='POST'){
        console.log(요청.body)
        응답.status(200).json("POST 처리완료")
    }

    else if(요청.method =='PUT'){ //GET으로 처리
        console.log(요청.body)
        응답.status(200).json("PUT 처리완료")
    }

    else if(요청.method =='DELETE'){ //GET으로 처리
        console.log(요청.body)
        응답.status(200).json("DELETE 처리완료")
    }

    return

    /*
        ~status()의 룰~
        서버기능 처리 성공시        : .status(200)
        서버기능 처리 실패시        : .status(500)
        유저 잘못으로 처리 실패시   : .status(400)
    */
}