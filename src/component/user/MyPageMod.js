import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Label, Input, Button, Col, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DaumPostcode from 'react-daum-postcode';
import './MyPage.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // redux state값을 읽어온다 토큰값과 userId값을 가져온다.

export default function MyPageMod() {
    const divStyle = {
        width: '1200px'
        , height: '900px'
        , textAlign: 'center'
        , margin: '100px auto'
        , marginBottom: '20px'
        , padding: '30px'
        , top: '100'
    };

    const [src, setSrc] = useState('/img/profile.jpg');
    const userId = useSelector((state) => { return state.UserId });

    const [userin, setUserIn] = useState({
        nickname: '', id: '', password: '', postcode: '', address: '', addrDetail: '', email: '', thumbnail: null
    });

    useEffect(() => {
        // params는 json 형태로 넘길 때 쓴다. map 형식이나
        axios.get('/mypage', { params: { id: userId } })
            .then((res) => {
                // console.log(res);
                // console.log(res.data);
                setUserIn(res.data);
                if (res.data.thumbnail != null) {
                    setSrc(userin.thumbnail);
                }
            }).catch((error) => {
                console.log(error)
            })
    }, [])


    const setChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserIn({ ...userin, [name]: value });
    }


    const addressHandle = {
        selectAddress: (data) => {
            setUserIn({ ...userin, address: data.address, postcode: data.zonecode });
            setModalShow(false)
        }
    }
    //정규식
    const [validNN, setValidNN] = useState(true);
    //중복확인
    const [useableNn, setUseableNn] = useState(true);

    // 주소 모달
    const [modalShow, setModalShow] = useState(false);
    const modalToggle = () => {
        setModalShow(!modalShow)
    }

    const ID_REG = /^[a-zA-Z][a-zA-Z0-9-_]{3,15}$/;

    // 닉네임 정규표현식 일치하는지 검사
    const setNnInfo = (e) => {
        let nickname = e.target.value;
        setUserIn({ ...userin, 'nickname': nickname });
        const reg = new RegExp(ID_REG);
        let checkReg = reg.test(nickname) ? true : false;
        if (checkReg) {
            console.log("닉네임 정규표현식 일치")
            document.getElementById("regnnTrue").setAttribute("style", "display:show; color: blue;")
            document.getElementById("regnnFalse").setAttribute("style", "display:none; color: red;")
        }
        if (!checkReg) {
            console.log("닉네임 정규표현식 불일치")
            document.getElementById("regnnFalse").setAttribute("style", "display:show; color: red;")
            document.getElementById("regnnTrue").setAttribute("style", "display:none; color: blue;")
        }
    }

    useEffect(() => {
        const result = ID_REG.test(userin.nickname);
        setValidNN(result);
    }, [userin.nickname])


    const CheckNN = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nickname', userin.nickname)
        axios.post('/existByNn', formData)
            .then((res) => {
                if (res.data === false) {
                    alert("사용 가능합니다.");
                    setUseableNn(true)
                }
                else if (res.data === true) {
                    alert("중복되는 닉네임입니다.")
                    setUseableNn(false)
                }
            }).catch((error) => {
                // alert("중복되는 아이디 입니다.")
                console.log("Error")
            })

    };

    // 파일 기능들
    const fileChange = (e) => {
        setUserIn({...userin, file: e.target.files[0] })
    }

    const readImage = (input) => {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = e => {
                setSrc(e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }



    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        // console.log(userin.file)

        if (validNN && useableNn) {
            console.log(userin)
            formData.append('id', userin.id);
            formData.append('file', userin.thumbnail);
            formData.append('nickname', userin.nickname);
            formData.append('postcode', userin.postcode);
            formData.append('address', userin.address);
            formData.append('addrDetail', userin.addrDetail);
            formData.append('email', userin.email);
            console.log(formData);
            axios.post('/mypagemod', formData)
                .then((res) => {
                    alert("수정이 완료되었습니다.")
                    document.location.href = "/mypage"
                }).catch((error) => {
                    console.log("error")
                })
        } else {
            alert("입력한 정보가 올바르지 않습니다.");
        }
    }



    return (
        <div style={divStyle}>
            <div><h1><b> My Page 수정</b></h1></div><br />
            <div className="screen-wrap">
                <div className="screen-header">
                    <Link to={"/mypage"}><span> 내 정보 </span></Link>
                    <Link to={"/"}><span> 나의 레시피 </span></Link>
                    <Link to={"/"}><span> 나의 찜목록 </span></Link>
                    <Link to={"/"}><span> 나의 랭킹 </span></Link>
                    <Link to={"/todolist"}><span> 나의 To Do List </span></Link>
                </div>
            </div>
            <hr />
            <div>
                <div style={{
                    width: '500px'
                    , height: '475px'
                    , margin: '0px auto'
                    // , border: '0.5px solid gray'
                    , padding: '30px'
                    // , borderRadius: '20px'
                }}>

                    <Form style={{ width: "400px", margin: '0px auto' }}>
                        {/* 프로필 */}
                        <div className="profile-wrap">
                            <img className="profile" src={src} alt="profile" />
                        </div>
                        <FormGroup row>
                            <Input type="file" name="file" id="file" onChange={fileChange} accept='image/*' ></Input>
                        </FormGroup>
                        {/* 닉네임 */}
                        <FormGroup row>
                            <Label htmlFor='nickname' sm={4}>닉&nbsp;&nbsp;네&nbsp;&nbsp;임</Label>
                            <Col sm={5}>
                                <Input type='text' name='nickname' id='nickname' value={userin.nickname} onChange={setNnInfo} required />
                            </Col>
                            <Col sm={3} >
                                <Button outline color='primary' style={{ width: '100%' }} onClick={CheckNN}>중복</Button>
                            </Col>
                            <p>
                                <span id="regnnTrue" style={{ display: "none" }}><b>알맞은 형식입니다. 중복 확인을 해주세요.</b></span>
                                <span id="regnnFalse" style={{ display: "none" }}><b>첫 글자는 영문자와 4~16자의 영문 대소문자, <br />숫자와 특수기호(_),(-)만 사용가능합니다.</b></span>
                            </p>
                        </FormGroup>
                        {/* 아이디 */}
                        <FormGroup row>
                            <Label htmlFor="id" sm={4}>아&nbsp;&nbsp;이&nbsp;&nbsp;디</Label>
                            <Col sm={8}>
                                <Input type="text" name="id" id="id" value={userin.id} readOnly />
                            </Col>

                        </FormGroup>
                        {/* 패스워드 */}
                        <FormGroup row>
                            <Label htmlFor='grade' sm={4}>패스워드</Label>
                            <Col>
                                <Button outline color='primary' style={{ width: '100%' }} onClick>재발급</Button>
                            </Col>
                        </FormGroup>
                        {/* 이메일 */}
                        <FormGroup row>
                            <Label htmlFor='email' sm={4}>이&nbsp;&nbsp;메&nbsp;&nbsp;일</Label>
                            <Col sm={8}>
                                <Input type='email' name='email' id='email' value={userin.email} onChange={setChange} required />
                            </Col>
                        </FormGroup>
                        {/* 우편번호 */}
                        <FormGroup row>
                            <Label htmlFor="id" sm={4}>우편&nbsp;번호</Label>
                            <Col sm={4}>
                                <Input type="text" name="id" id="id" value={userin.postcode} onClick={modalToggle} required />
                            </Col>
                            <Col sm={4}>
                                <Button outline color='primary' style={{ width: '100%' }} onClick={modalToggle}>검색</Button>
                            </Col>
                        </FormGroup>
                        {/* 주소 */}
                        <FormGroup row>
                            <Label htmlFor='grade' sm={4}>주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</Label>
                            <Col>
                                <Input type="text" name="grade" id="grade" sm={8} value={userin.address} />
                            </Col>
                        </FormGroup>
                        {/* 상세주소 */}
                        <FormGroup row>
                            <Label htmlFor='grade' sm={4}>상세&nbsp;주소</Label>
                            <Col>
                                <Input type="text" name="grade" id="grade" sm={8} value={userin.addrDetail} required placeholder="해당하지 않을경우 없음 입력" />
                            </Col>
                        </FormGroup>
                        {/* 수정 완료 버튼 */}
                        <FormGroup row>
                            <Col sm={4} >
                                <Link to={'/mypage'}><Button color='primary' style={{ width: '400px' }} onClick={submit}>수정 완료</Button></Link>
                            </Col>
                        </FormGroup>
                    </Form>

                    {/* 우편번호 검색 모달 */}
                    <Modal isOpen={modalShow} fade={true} toggle={modalToggle} style={{ witop: "100px", left: "28%" }}>
                        <ModalHeader toggle={modalToggle}>주소 검색</ModalHeader>
                        <ModalBody>
                            <DaumPostcode onComplete={addressHandle.selectAddress} autoClose={false} />
                        </ModalBody>

                        <ModalFooter color="secondary" onClick={modalToggle}>
                            {/* <Button color='secondary'>닫기</Button> */}
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        </div >
    )
}