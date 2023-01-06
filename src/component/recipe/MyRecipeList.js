import axios from "axios";
import { useState, useEffect, useRef, useMemo } from "react";
import { Table, Form, Label, Input, Button, Col, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../user/MyPage.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // redux state값을 읽어온다. 토큰값과 userId값을 가져온다.
import {BsFillSuitHeartFill} from "react-icons/bs"
import {RiStarSmileFill} from "react-icons/ri"

export default function MyRecipeList() {
    const divStyle = {
        width: '1200px'
        , height: '800px'
        , textAlign: 'center'
        , margin: '100px auto'
        , marginBottom: '35px'
        , padding: '30px'
        , top: '100'
    };
    const thm = {
        width:'120px'
    };
    const thsm = {
        width:'66px'
    };
    const userId = useSelector((state) => { return state.UserId });
    const [recipes , setRecipes] = useState([])
    useEffect(() => {
        axios.get('/myrecipelist', { params: { id: userId } })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setRecipes(res.data)
                console.log(recipes)
            }).catch((error) => {
                console.log(error)
            })
    }, [])
    return (
        <div style={divStyle} className="content-wrap">
            <div><h1><b>나의 레시피</b></h1></div><br />
            <div className="screen-wrap">
                <div className="screen-header">
                    <Link to={"/mypage"}><span> 내 정보 </span></Link>
                    <Link to={"/myrecipelist"}><span> 나의 레시피 </span></Link>
                    <Link to={"/mypagerecipelist"}><span> 나의 찜목록 </span></Link>
                    {/* <Link to={"/"}><span> 나의 랭킹 </span></Link> */}
                    <Link to={"/todolist"}><span> 나의 To Do List </span></Link>
                </div>
            </div>
            <hr />
            <div style={{
                width: '800px'
                , height: '600px'
                , margin: '0px auto'
                , padding: '30px 30px 30px 30px'

            }}>
               {/* 컨텐츠 영역 */}
               <Table striped >
                        <thead>
                            <tr>
                                <th>글번호</th>
                                <th>메뉴</th>
                                <th>등록일</th>
                                <th>조회수</th>
                                <th>
                                    <BsFillSuitHeartFill style={{width:"20px",height:"20px",margin:"0 auto"}}/>
                                </th>
                                <th>
                                    <RiStarSmileFill style={{width:"20px",height:"20px",margin:"0 auto"}}/>
                                </th>
                                
                            </tr>
                        </thead>
                        {/* {recipes} */}

                        <tbody style={{overflow:"auto"}}>
                            {/* {this.repeatTrTd()} */}
                            {recipes.map((acc) => {
                                console.log(acc);
                                return (
                                    <tr key={acc.rno}>
                                    <td>{acc.rno}</td>
                                    <td>{acc.title}</td>
                                    <td>{acc.reg_date}</td>
                                    <td>{acc.cnt}</td>
                                    <td>{acc.score}</td>
                                    <td>{acc.likeValue}</td>
                                </tr>
                                )
                            })}
                        </tbody>
                        {/* map은 각각의 요소마다 return한다. */}
                        
                    </Table>
            </div>
        </div>
    )
}