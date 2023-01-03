import axios from "axios"
import { useEffect } from "react"
import { useSelector } from 'react-redux'; // redux state값을 읽어온다 토큰값과 userId값을 가져온다.

export default function MyLikelist(){

    const userId = useSelector((state) => { return state.UserId });


    useEffect(()=> {
        axios.get(`/mylikelist/${userId}`)
        .then((response)=> {
            console.log(response);
        })
        .catch((error)=> {
            console.log(error);
        })
    },[]);
    
}