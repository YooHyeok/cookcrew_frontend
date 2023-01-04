import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

export default function DietChallenge() {

    const mainDiv = {
        width: '1200px' //캘린더 width 조절을 위해 부모태그에 설정한다.
        , height: '100%'
        , textAlign: 'left'
        , margin: '100px auto'
        , marginBottom: '20px'
        // , border: '0.1px solid lightgray'
        , padding: '30px'
        , borderRadius: '20px'
        , top: '100'
      };
    const contentDiv1 = {
        width: '1150px' //캘린더 width 조절을 위해 부모태그에 설정한다.
        , height: '300px'
        , textAlign: 'left'
        , margin: '20px auto'
        , marginBottom: '50px'
        // , border: '0.1px solid lightgray'
        , padding: '30px'
        , borderRadius: '20px'
        , top: '100'
      };
    //   const [rankData, setRankData] = useState([]);
      const [rankAscData, setRankAscData] = useState([]);
      const [rankDescData, setRankDescData] = useState([]);

    useEffect(()=>{
        axios.get('/dietRankThree')
        .then((response)=>{
            // console.log(response.data);
            // console.log(response.data.ascList);
            // console.log(response.data.descList);
            if(response.data == null) {
                return;
            } 
            // setRankData(response.data);
            setRankAscData(response.data.ascList);
            setRankDescData(response.data.descList);
            // console.log(rankData);
            // console.log(rankAscData);
            // console.log(rankDescData);
        }).catch((error)=>{
            console.log(error);
        })
    },[])
    // useEffect(()=>{
    //     axios.get('/dietRankThreeDESC')
    //     .then((response)=>{
    //         // let element = <div><h5><b>지난주 식단 랭킹 3인</b></h5></div><br /> ;

    //         console.log(response.data);
    //         if(response.data == null) {
    //             return;
    //         } 
    //         // setReverseData(response.data);
    //     }).catch((error)=>{
    //         console.log(error);
    //     })
    // },[])

    return(
        <div style={mainDiv}>
            <div>
                <h1><b>챌린지 랭킹</b></h1>
                {/* <Button style={{float:"right"}} onClick={(e)=>{e.preventDefault(); document.location.href="/dietScheduler"}}>챌린지 참여</Button> */}
            </div>
            <br />
            <div style={contentDiv1}>
                <div><h5><b>지난주 식단 랭킹 3인</b></h5></div><br />
                
                {/* {rankAscData.map((dietRank, index, data)=>{
                    console.log(dietRank)
                    return(
                        <div style={{display:"inline-block", margin:"0px 100px 0px 100px", textAlign:"center" }}>
                            <span>{dietRank.achieveRank} 위</span><br/><br/>
                            <img style={{width:"160px", marginTop:"-20px", borderRadius:"70%"}} src={require('../../resources/img/강민경.png')} alt='' />
                            <span>{dietRank.userId} 님</span><br/>
                            <span>달성률 : {dietRank.achievePercentage}%</span>
                        </div>
                    )
                })} */}
                <div style={{display:"inline-block", margin:"0px 100px 0px 100px", textAlign:"center" }}>
                    <img style={{width:"160px", marginTop:"-20px", borderRadius:"70%"}} src={require('../../resources/img/남규리.png')} alt='' />
                    <span>남규리 님</span>
                </div>
                <div style={{display:"inline-block", margin:"0px 100px 0px 100px", textAlign:"center" }}>
                    <img style={{width:"160px", marginTop:"-20px", borderRadius:"70%"}} src={require('../../resources/img/강민경.png')} alt='' />
                    <span>강민경 님</span>
                </div>
                <div style={{display:"inline-block", margin:"0px 100px 0px 100px", textAlign:"center" }}>
                    <img style={{width:"160px", marginTop:"-20px", borderRadius:"70%"}} src={require('../../resources/img/이시우.png')} alt='' />
                    <span>이시우 님</span>
                </div>
            </div>
            
            <div style={contentDiv1}>
                <div><h5><b>꼴찌들...</b></h5></div><br />
                {/* {rankDescData.map((dietRank, index, data)=>{
                    console.log(dietRank.userId)
                    return(
                        <div style={{display:"inline-block", margin:"0px 100px 0px 100px", textAlign:"center" }}>
                            <span>{dietRank.achieveRank} 위</span><br/><br/>
                            <img style={{width:"160px", marginTop:"-20px", borderRadius:"70%"}} src={require('../../resources/img/강민경.png')} alt='' />
                            <span>{dietRank.userId} 님</span><br/>
                            <span>달성률 : {dietRank.achievePercentage}%</span>
                        </div>
                    )
                })} */}
                <div style={{display:"inline-block", margin:"0px 100px 0px 100px", textAlign:"center" }}>
                    <img style={{width:"160px", marginTop:"-20px", borderRadius:"70%"}} src={require('../../resources/img/이세진.png')} alt='' />
                    <span>인아웃세진 님</span>
                </div>
                <div style={{display:"inline-block", margin:"0px 100px 0px 100px", textAlign:"center" }}>
                    <img style={{width:"160px", marginTop:"-20px", borderRadius:"70%"}} src={require('../../resources/img/이세진.png')} alt='' />
                    <span>인아웃세진 님</span>
                </div>
                <div style={{display:"inline-block", margin:"0px 100px 0px 100px", textAlign:"center" }}>
                    <img style={{width:"160px", marginTop:"-20px", borderRadius:"70%"}} src={require('../../resources/img/이세진.png')} alt='' />
                    <span>인아웃세진 님</span>
                </div>
            </div>
        </div>
    )
}