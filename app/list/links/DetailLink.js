/*↓클라 컴포넌트 선언 안하면 onClink,useRouter  못씀*/
'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation' //next/router가 경로로 되어있으면 안됨!

export default function DetailLink(){
    let router = useRouter()
    let a = usePathname()               //현재 URL출력
    //let b = useSearchParams()           //Search parameter을 출력해줌
    return(
        <button onClick={ ()=>{router.back()}}>뒤로 가기</button>
    )
}

/*Router함수
    ~조건~
        클라 컴포넌트여야함, import경로가 next/navvigation
    ~기능~
        router.push('/경로')        : 경로로 이동 
        router.back()               : 뒤로가기
        router.forward()            : 앞으로 가기
        router.refresh()            : 새로고침
        router.prefetch('/경로')    : 페이지 미리로드, 페이지 방문시 매우 빨라짐
*/