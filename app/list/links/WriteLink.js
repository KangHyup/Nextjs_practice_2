'use client'

import { useRouter} from 'next/navigation' //next/router가 경로로 되어있으면 안됨!

export default function WriteLink(){
    let router = useRouter()

    return(
        <button onClick={ ()=>{router.push('/write')}} className='button'>글쓰기✒️</button>
    )
}