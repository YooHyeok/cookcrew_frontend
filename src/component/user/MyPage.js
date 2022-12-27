import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Label, Input, Button, Col, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DaumPostcode from 'react-daum-postcode';
import './MyPage.css';


export default function MyPage() {
    const divStyle = {
        width: '1200px'
        , height: '780px'
        , textAlign: 'center'
        , margin: '100px auto'
        , marginBottom: '20px'
        , padding: '30px'
        , top: '100'
    };


    const [user, setUser] = useState({});
    useEffect(() => {
        axios.get('/mypage', { params: { id: "mdmdr8" } })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setUser(res.data);
            }).catch((error) => {
                console.log(error)
            })
    }, [])



    return (

        <div style={divStyle}>
            <div><h1><b> My Page</b></h1></div><br />
            <div className="screen-wrap">
                <div className="screen-header">
                    <span> 내 정보 </span>
                    <span> 다이어트 캘린더 </span>
                    <span> 나의 레시피 </span>
                    <span> 나의 구독 </span>
                </div>
            </div>
            <hr />
            <div style={{
                width: '500px'
                , height: '475px'
                , margin: '0px auto'
                , padding: '30px'

            }}>
                {/* 프로필 사진 영역 */}

                {/* 압룍폼 영역 */}
                <Form style={{ width: "400px", margin: '0px auto' }}>
                    <FormGroup row>
                        <Label htmlFor='nickname' sm={4}>닉&nbsp;&nbsp;네&nbsp;&nbsp;임</Label>
                        <Col sm={8}>
                            <Input value={user.nickname} type='text' name='nickname' id='nickname' readOnly />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="id" sm={4}>아&nbsp;&nbsp;이&nbsp;&nbsp;디</Label>
                        <Col sm={8}>
                            <Input type="text" name="id" id="id" value={user.id} readOnly />
                        </Col>
                    </FormGroup>

                    {/* 이메일 */}
                    <FormGroup row>
                        <Label htmlFor='email' sm={4}>이&nbsp;&nbsp;메&nbsp;&nbsp;일</Label>
                        <Col sm={8}>
                            <Input type='email' name='email' id='email' value={user.email} readOnly />
                        </Col>
                    </FormGroup>
                    {/* 우편번호 */}
                    <FormGroup row>
                        <Label htmlFor="id" sm={4}>우편&nbsp;번호</Label>
                        <Col sm={8}>
                            <Input type="text" name="id" id="id" value={user.postcode} readOnly />
                        </Col>

                    </FormGroup>
                    {/* 주소 */}
                    <FormGroup row>
                        <Label htmlFor='grade' sm={4}>주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</Label>
                        <Col>
                            <Input type="text" name="grade" id="grade" sm={8} value={user.address} />
                        </Col>
                    </FormGroup>
                    {/* 상세주소 */}
                    <FormGroup row>
                        <Label htmlFor='grade' sm={4}>상세&nbsp;주소</Label>
                        <Col>
                            <Input type="text" name="grade" id="grade" sm={8} value={user.addrDetail} readOnly placeholder="해당하지 않을경우 없음 입력" />
                        </Col>
                    </FormGroup>

                    <FormGroup row className="mypage_btn">
                        <Col sm={2} >
                            <Button color='success' style={{ width: '100px' }}>수정</Button>
                        </Col>
                        <Col sm={2} >
                            <Button color='secondary' style={{ width: '100px' }}>회원 탈퇴</Button>
                        </Col>
                    </FormGroup>

                </Form>
            </div>
        </div>
    )
}