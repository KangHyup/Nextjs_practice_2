
export default async function handler(req, ans){

    if(req.method =='GET'){
        const now = new Date();
        ans.status(200).json(now)
    }
    
    else if(req.method =='POST')
        return ans.status(200).json("수정 완료")
}

/*

*/